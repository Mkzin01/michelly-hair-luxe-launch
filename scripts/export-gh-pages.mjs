/**
 * Exporta o site como HTML estático para o GitHub Pages.
 *
 * O GitHub Pages só serve ficheiros estáticos, por isso as páginas são
 * pré-renderizadas a partir do build SSR (via wrangler) — assim o HTML já vem
 * com o conteúdo, as meta tags e o JSON-LD, o que é essencial para o Google e
 * para as pré-visualizações de links no WhatsApp e no Instagram.
 *
 * As imagens vivem no CDN do Lovable; aqui são descarregadas para dentro do
 * próprio site, para o GitHub Pages não depender desse CDN.
 *
 * Uso: VITE_BASE_PATH=/nome-do-repo/ bun run export:gh-pages
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { createWriteStream } from "node:fs";
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLIENT = join(ROOT, ".output", "public");
const WRANGLER_CONFIG = join(ROOT, ".output", "server", "wrangler.json");
const OUT = join(ROOT, "gh-pages-dist");
const PORT = Number(process.env.EXPORT_PORT ?? 8789);
const ROUTES = ["/", "/servicos"];

/** Origem do CDN de onde as imagens são descarregadas. */
const ASSET_ORIGIN =
  process.env.ASSET_BASE_URL ??
  "https://id-preview--01f3ee2d-8a71-4c99-b13f-2234d9ab55e3.lovable.app";

/** Caminho base do site. "/" para domínio próprio, "/repo/" para GitHub Pages. */
const BASE = normalizeBase(process.env.VITE_BASE_PATH || "/");

function normalizeBase(value) {
  let base = value.startsWith("/") ? value : `/${value}`;
  if (!base.endsWith("/")) base += "/";
  return base;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dest = join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(src, dest);
    } else {
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(src, dest);
    }
  }
}

/**
 * Lê os ponteiros *.asset.json e devolve o mapa URL-do-CDN → caminho local.
 * Cada URL aparece também nas formas escapadas em que surge dentro do JS gerado.
 */
async function collectAssetMap() {
  const pointers = (await walk(join(ROOT, "src", "assets"))).filter((file) =>
    file.endsWith(".asset.json"),
  );

  const map = new Map();
  for (const file of pointers) {
    const asset = JSON.parse(await readFile(file, "utf8"));
    if (!asset.url || !asset.original_filename) continue;
    const target = `${BASE}assets/media/${asset.original_filename}`;
    map.set(asset.url, target);
    map.set(asset.url.replaceAll("/", "\\/"), target.replaceAll("/", "\\/"));
    map.set(asset.url.replaceAll("/", "\\u002F"), target.replaceAll("/", "\\u002F"));
  }
  return map;
}

async function downloadAssets(map) {
  const remote = [...map.entries()].filter(([from]) => from.startsWith("/__l5e/"));
  await mkdir(join(OUT, "assets", "media"), { recursive: true });

  for (const [from, to] of remote) {
    const url = `${ASSET_ORIGIN}${from}`;
    const output = join(OUT, to.slice(BASE.length));
    await mkdir(dirname(output), { recursive: true });
    const response = await fetch(url);
    if (!response.ok || !response.body) {
      throw new Error(`Falha ao descarregar ${url}: ${response.status}`);
    }
    await pipeline(response.body, createWriteStream(output));
  }
  console.log(`  ${remote.length} imagens descarregadas do CDN`);
}

async function rewriteAssetUrls(map) {
  const textExt = new Set([".html", ".js", ".css", ".json", ".txt", ".xml"]);
  const files = (await walk(OUT)).filter(
    (file) => textExt.has(file.slice(file.lastIndexOf("."))) || basename(file) === "_headers",
  );

  for (const file of files) {
    const before = await readFile(file, "utf8");
    let after = before;
    for (const [from, to] of map) after = after.split(from).join(to);
    if (after !== before) await writeFile(file, after);
  }
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const probe = createServer();
    probe.once("error", () => resolve(false));
    probe.once("listening", () => probe.close(() => resolve(true)));
    probe.listen(port, "127.0.0.1");
  });
}

/**
 * Procura uma porta livre a partir da porta pedida.
 *
 * Reutilizar uma porta ocupada era a origem de um erro silencioso: um wrangler
 * de uma exportacao anterior continuava a responder, a pre-renderizacao apanhava
 * o build antigo e o HTML final apontava para ficheiros que ja nao existiam.
 */
async function findFreePort(from) {
  for (let port = from; port < from + 20; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`Nenhuma porta livre entre ${from} e ${from + 19}`);
}

async function waitForServer(baseUrl, proc) {
  const started = Date.now();
  while (Date.now() - started < 60_000) {
    if (proc.exitCode !== null) throw new Error(`wrangler terminou com o código ${proc.exitCode}`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // continua a tentar
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error("Tempo esgotado à espera do servidor local");
}

async function prerenderRoutes() {
  const port = await findFreePort(PORT);

  const proc = spawn(
    "npx",
    [
      "wrangler",
      "dev",
      "--config",
      WRANGLER_CONFIG,
      "--local",
      "--port",
      String(port),
      "--compatibility-flags",
      "nodejs_compat",
    ],
    // detached para o kill abaixo levar tambem os processos filhos (workerd,
    // esbuild); de outro modo ficavam a segurar a porta depois da exportacao.
    {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      env: { ...process.env, NO_COLOR: "1" },
    },
  );

  let logs = "";
  proc.stdout.on("data", (chunk) => (logs += chunk));
  proc.stderr.on("data", (chunk) => (logs += chunk));

  try {
    const origin = `http://127.0.0.1:${port}`;
    // O worker serve o site já sob o caminho base, tal como em produção.
    const prefix = BASE.replace(/\/$/, "");
    await waitForServer(`${origin}${prefix || "/"}`, proc);

    for (const route of ROUTES) {
      const url = `${origin}${prefix}${route}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Pré-renderização de ${route} falhou: ${response.status}`);
      const html = await response.text();
      const output =
        route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, html);
      console.log(`  ${route} → ${relative(ROOT, output)}`);
    }
  } catch (error) {
    throw new Error(`${error.message}\n\nRegisto do wrangler:\n${logs.slice(-3000)}`);
  } finally {
    try {
      process.kill(-proc.pid);
    } catch {
      proc.kill();
    }
  }
}

/**
 * Torna absolutas as URLs que os robôs sociais exigem.
 *
 * O WhatsApp, o Instagram e o Facebook ignoram og:image em caminho relativo —
 * a miniatura simplesmente não aparece quando o link é partilhado. Como o
 * caminho canónico só é conhecido na exportação, a correção é feita aqui.
 * Aproveita-se para acrescentar o <link rel="canonical"> de cada página.
 */
async function absolutizeSocialUrls(origin) {
  for (const route of ROUTES) {
    const file = route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
    let html = await readFile(file, "utf8");

    // og:image e twitter:image
    html = html.replace(
      /(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")(\/[^"]*)"/g,
      (_match, prefix, path) => `${prefix}${origin}${path}"`,
    );

    // campo "image" dos dados estruturados JSON-LD
    html = html.replace(
      /("image":")(\/[^"]*)"/g,
      (_match, prefix, path) => `${prefix}${origin}${path}"`,
    );

    const canonical = `${origin}${BASE.replace(/\/$/, "")}${route}`;
    if (!html.includes('rel="canonical"')) {
      html = html.replace("</head>", `<link rel="canonical" href="${canonical}"/></head>`);
    }
    if (!html.includes('property="og:url"')) {
      html = html.replace("</head>", `<meta property="og:url" content="${canonical}"/></head>`);
    }

    await writeFile(file, html);
  }
}

async function main() {
  console.log(`A exportar para GitHub Pages (base: ${BASE})`);

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await copyDir(CLIENT, OUT);

  const map = await collectAssetMap();
  await downloadAssets(map);
  await prerenderRoutes();
  await rewriteAssetUrls(map);

  // Sem este ficheiro o GitHub Pages passa tudo pelo Jekyll, que ignora as
  // pastas começadas por underscore e pode partir o build.
  await writeFile(join(OUT, ".nojekyll"), "");

  // O GitHub Pages devolve 404.html para caminhos desconhecidos; ao servir a
  // página inicial, o router assume o controlo e mostra a rota correta.
  await copyFile(join(OUT, "index.html"), join(OUT, "404.html"));

  const canonical = process.env.SITE_URL;
  if (canonical) {
    const origin = canonical.replace(/\/$/, "");
    await absolutizeSocialUrls(origin);
    await writeFile(
      join(OUT, "robots.txt"),
      `User-agent: *\nAllow: /\n\nSitemap: ${origin}${BASE}sitemap.xml\n`,
    );
    const urls = ROUTES.map((route) => {
      const loc = `${origin}${BASE.replace(/\/$/, "")}${route}`;
      return `  <url><loc>${loc}</loc></url>`;
    }).join("\n");
    await writeFile(
      join(OUT, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
  }

  const files = await walk(OUT);
  console.log(`\nPronto: ${relative(ROOT, OUT)} (${files.length} ficheiros)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
