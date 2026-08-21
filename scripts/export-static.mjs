/**
 * Exporta o site como HTML estático, pronto para qualquer alojamento de
 * ficheiros (Netlify, GitHub Pages, Cloudflare Pages, etc.).
 *
 * Porquê pré-renderizar em vez de servir só o JavaScript: o Google e os robôs
 * de pré-visualização do WhatsApp e do Instagram não executam JavaScript. Sem
 * isto, o site apareceria vazio nas pesquisas e a partilha do link não mostraria
 * imagem nenhuma.
 *
 * As imagens vivem no CDN do Lovable; aqui são descarregadas para dentro do
 * próprio site, para o alojamento não depender desse CDN.
 *
 * Variáveis de ambiente:
 *   VITE_BASE_PATH  subdiretório onde o site é servido (omissão: "/")
 *   OUT_DIR         pasta de saída (omissão: "dist-static")
 *   SITE_URL        origem pública, ex. https://michellyhair.netlify.app
 *                   necessária para as pré-visualizações de links funcionarem
 *   ASSET_BASE_URL  origem de onde as imagens são descarregadas
 */
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { createServer } from "node:net";
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLIENT = join(ROOT, ".output", "public");
const SERVER_ENTRY = join(ROOT, ".output", "server", "index.mjs");
const OUT = join(ROOT, process.env.OUT_DIR || "dist-static");
const PORT = Number(process.env.EXPORT_PORT ?? 8790);

/** Rotas pré-renderizadas. Acrescentar aqui ao criar uma página nova. */
const ROUTES = ["/", "/servicos"];

const ASSET_ORIGIN =
  process.env.ASSET_BASE_URL ??
  "https://id-preview--01f3ee2d-8a71-4c99-b13f-2234d9ab55e3.lovable.app";

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

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, ...env },
      shell: process.platform === "win32",
    });
    proc.on("error", reject);
    proc.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} terminou com o código ${code}`)),
    );
  });
}

/**
 * Compila a app com o preset "node-server" do Nitro.
 *
 * O preset por omissão gera um worker da Cloudflare, que precisaria do wrangler
 * e do workerd para correr — dependências pesadas e frágeis nas máquinas de
 * build. O node-server produz um servidor que arranca com o Node de sistema.
 */
async function buildApp() {
  await run("bun", ["run", "build"], {
    NITRO_PRESET: "node-server",
    VITE_BASE_PATH: BASE,
  });
}

/**
 * Lê os ponteiros *.asset.json e devolve o mapa URL-do-CDN → caminho local,
 * incluindo as formas escapadas em que as URLs surgem dentro do JavaScript.
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
  console.log(`  ${remote.length} imagens descarregadas`);
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
 * Reutilizar uma porta ocupada é uma falha silenciosa: um servidor de uma
 * exportação anterior continua a responder, a pré-renderização apanha o build
 * antigo e o HTML final fica a apontar para ficheiros que já não existem.
 */
async function findFreePort(from) {
  for (let port = from; port < from + 20; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`Nenhuma porta livre entre ${from} e ${from + 19}`);
}

async function waitForServer(url, proc) {
  const started = Date.now();
  while (Date.now() - started < 60_000) {
    if (proc.exitCode !== null)
      throw new Error(`O servidor terminou com o código ${proc.exitCode}`);
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // continua a tentar
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error("Tempo esgotado à espera do servidor local");
}

async function prerenderRoutes() {
  const port = await findFreePort(PORT);
  const proc = spawn(process.execPath, [SERVER_ENTRY], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", NODE_ENV: "production" },
  });

  let logs = "";
  proc.stdout.on("data", (chunk) => (logs += chunk));
  proc.stderr.on("data", (chunk) => (logs += chunk));

  try {
    const origin = `http://127.0.0.1:${port}`;
    const prefix = BASE.replace(/\/$/, "");
    await waitForServer(`${origin}${prefix || "/"}`, proc);

    for (const route of ROUTES) {
      const response = await fetch(`${origin}${prefix}${route}`);
      if (!response.ok) throw new Error(`Pré-renderização de ${route} falhou: ${response.status}`);
      const html = await response.text();
      const output =
        route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, html);
      console.log(`  ${route} → ${relative(ROOT, output)}`);
    }
  } catch (error) {
    throw new Error(`${error.message}\n\nRegisto do servidor:\n${logs.slice(-3000)}`);
  } finally {
    proc.kill();
  }
}

/**
 * Torna absolutas as URLs que os robôs sociais exigem.
 *
 * O WhatsApp, o Instagram e o Facebook ignoram og:image em caminho relativo —
 * a miniatura simplesmente não aparece quando o link é partilhado.
 */
async function absolutizeSocialUrls(origin) {
  for (const route of ROUTES) {
    const file = route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
    let html = await readFile(file, "utf8");

    html = html.replace(
      /(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")(\/[^"]*)"/g,
      (_match, prefix, path) => `${prefix}${origin}${path}"`,
    );
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

/**
 * Confirma que cada ficheiro referenciado pelas páginas existe mesmo.
 *
 * Apanha a classe de erro mais perigosa desta exportação: HTML pré-renderizado
 * a partir de um build diferente do que foi copiado. O site abriria em branco,
 * sem qualquer erro durante a exportação.
 */
async function verifyReferences() {
  const missing = new Set();
  for (const route of ROUTES) {
    const file = route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
    const html = await readFile(file, "utf8");
    const referenced = html.match(/(?:src|href)="([^"]+)"/g) ?? [];

    for (const raw of referenced) {
      const url = raw.slice(raw.indexOf('"') + 1, -1);
      if (!url.startsWith(BASE) || url.startsWith("//")) continue;

      // Só interessam ficheiros. Os restantes são rotas e âncoras, que são
      // resolvidas pelo router e não correspondem a nada em disco.
      const path = url.slice(BASE.length).split(/[?#]/)[0];
      if (!path || !basename(path).includes(".")) continue;

      try {
        await readFile(join(OUT, path));
      } catch {
        missing.add(url);
      }
    }
  }

  if (missing.size > 0) {
    throw new Error(
      `As páginas referenciam ficheiros que não existem na exportação:\n  ${[...missing].join("\n  ")}`,
    );
  }
  console.log("  todas as referências apontam para ficheiros existentes");
}

async function main() {
  console.log(`A exportar (base: ${BASE}, saída: ${relative(ROOT, OUT) || "."})\n`);
  await buildApp();

  console.log("\nA montar o site estático");
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await copyDir(CLIENT, OUT);

  const map = await collectAssetMap();
  await downloadAssets(map);
  await prerenderRoutes();
  await rewriteAssetUrls(map);

  const siteUrl = process.env.SITE_URL;
  if (siteUrl) {
    const origin = siteUrl.replace(/\/$/, "");
    await absolutizeSocialUrls(origin);
    await writeFile(
      join(OUT, "robots.txt"),
      `User-agent: *\nAllow: /\n\nSitemap: ${origin}${BASE}sitemap.xml\n`,
    );
    const urls = ROUTES.map(
      (route) => `  <url><loc>${origin}${BASE.replace(/\/$/, "")}${route}</loc></url>`,
    ).join("\n");
    await writeFile(
      join(OUT, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
  } else {
    console.log("  aviso: SITE_URL não definida — as pré-visualizações de links ficam sem imagem");
  }

  // Sem isto o GitHub Pages passa tudo pelo Jekyll, que ignora as pastas
  // começadas por underscore.
  await writeFile(join(OUT, ".nojekyll"), "");

  // Caminhos desconhecidos: o GitHub Pages serve 404.html, o Netlify segue o
  // _redirects. Em ambos os casos o router assume e mostra a página de erro.
  // Todas as rotas reais são pré-renderizadas, por isso o estado 404 é correto.
  await copyFile(join(OUT, "index.html"), join(OUT, "404.html"));
  await writeFile(join(OUT, "_redirects"), "/*  /index.html  404\n");

  await verifyReferences();

  const files = await walk(OUT);
  console.log(`\nPronto: ${relative(ROOT, OUT)} (${files.length} ficheiros)`);
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
