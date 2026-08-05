import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "netlify-dist");
const ASSET_DIR = join(OUT, "assets", "media");
const PORT = Number(process.env.EXPORT_PORT ?? 8787);
const ROUTES = ["/", "/servicos"];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    }),
  );
  return files.flat();
}

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const src = join(from, entry.name);
      const dest = join(to, entry.name);
      if (entry.isDirectory()) return copyDir(src, dest);
      await mkdir(dirname(dest), { recursive: true });
      return copyFile(src, dest);
    }),
  );
}

async function collectAssetMap() {
  const files = await walk(join(ROOT, "src", "assets"));
  const pointers = files.filter((file) => file.endsWith(".asset.json"));
  const map = new Map();

  for (const file of pointers) {
    const asset = JSON.parse(await readFile(file, "utf8"));
    if (!asset.url || !asset.original_filename) continue;
    const filename = asset.original_filename;
    map.set(asset.url, `/assets/media/${filename}`);
    map.set(asset.url.replaceAll("/", "\\/"), `/assets\/media\/${filename}`);
    map.set(asset.url.replaceAll("/", "\\u002F"), `/assets\\u002Fmedia\\u002F${filename}`);
  }

  return map;
}

function assetOriginFromMap(map) {
  const first = [...map.keys()].find((key) => key.startsWith("/__l5e/"));
  const match = first?.match(/\/assets-v1\/([^/]+)\//);
  const projectId = match ? undefined : undefined;
  return process.env.ASSET_BASE_URL ?? "https://id-preview--01f3ee2d-8a71-4c99-b13f-2234d9ab55e3.lovable.app";
}

async function downloadAssets(map) {
  await mkdir(ASSET_DIR, { recursive: true });
  const origin = assetOriginFromMap(map);
  const unique = [...new Set([...map.entries()].filter(([from]) => from.startsWith("/__l5e/")).map(([from, to]) => [from, to]))];

  for (const [from, to] of unique) {
    const url = `${origin}${from}`;
    const output = join(OUT, to.replace(/^\//, ""));
    await mkdir(dirname(output), { recursive: true });
    const response = await fetch(url);
    if (!response.ok || !response.body) {
      throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    await pipeline(response.body, createWriteStream(output));
  }
}

function replaceExactAssets(text, map) {
  let output = text;
  for (const [from, to] of map.entries()) {
    output = output.split(from).join(to);
  }
  return output;
}

async function rewriteFiles(map) {
  const files = await walk(OUT);
  const textExt = new Set([".html", ".js", ".css", ".json", ".txt"]);
  await Promise.all(
    files.map(async (file) => {
      const ext = file.slice(file.lastIndexOf("."));
      if (!textExt.has(ext) && basename(file) !== "_redirects" && basename(file) !== "_headers") return;
      const before = await readFile(file, "utf8");
      const after = replaceExactAssets(before, map);
      if (after !== before) await writeFile(file, after);
    }),
  );
}

async function waitForServer(baseUrl, proc) {
  const started = Date.now();
  while (Date.now() - started < 30_000) {
    if (proc.exitCode !== null) throw new Error(`Wrangler exited with code ${proc.exitCode}`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // keep polling
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Timed out waiting for local production server");
}

async function prerenderRoutes() {
  const proc = spawn("bunx", ["wrangler", "dev", "--config", "dist/server/wrangler.json", "--local", "--port", String(PORT), "--compatibility-date", "2026-07-28"], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NO_COLOR: "1" },
  });

  let logs = "";
  proc.stdout.on("data", (chunk) => { logs += chunk.toString(); });
  proc.stderr.on("data", (chunk) => { logs += chunk.toString(); });

  try {
    const base = `http://127.0.0.1:${PORT}`;
    await waitForServer(base, proc);
    for (const route of ROUTES) {
      const response = await fetch(`${base}${route}`);
      if (!response.ok) throw new Error(`Prerender ${route} failed: ${response.status}`);
      const html = await response.text();
      const output = route === "/" ? join(OUT, "index.html") : join(OUT, route.slice(1), "index.html");
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, html);
    }
  } catch (error) {
    throw new Error(`${error.message}\n\nWrangler logs:\n${logs.slice(-4000)}`);
  } finally {
    proc.kill();
  }
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await copyDir(join(ROOT, "dist", "client"), OUT);
  const map = await collectAssetMap();
  await downloadAssets(map);
  await prerenderRoutes();
  await rewriteFiles(map);
  await writeFile(join(OUT, "_redirects"), "/servicos /servicos/index.html 200\n/* /index.html 200\n");

  const files = await walk(OUT);
  for (const file of files.filter((item) => item.endsWith(".js"))) {
    const content = await readFile(file, "utf8");
    if (/export\s*\{[^}]*\b[a-zA-Z_$][\w$]*\s+as\s+/.test(content)) {
      await import(`file://${file}?v=${Date.now()}`).catch((error) => {
        throw new Error(`Generated module failed to parse: ${relative(OUT, file)}\n${error.message}`);
      });
    }
  }

  const size = (await stat(OUT)).isDirectory() ? files.length : 0;
  console.log(`Netlify export ready: ${relative(ROOT, OUT)} (${size} files)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});