import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "netlify-static-dist");
const ASSET_DIR = join(OUT, "assets", "media");
const PORT = 8888;
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
  const assetsDir = join(ROOT, "src", "assets");
  try {
    const files = await walk(assetsDir);
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
  } catch (e) {
    return new Map();
  }
}

async function downloadAssets(map) {
  if (map.size === 0) return;
  await mkdir(ASSET_DIR, { recursive: true });
  const origin = "https://id-preview--01f3ee2d-8a71-4c99-b13f-2234d9ab55e3.lovable.app";
  const unique = [...new Set([...map.entries()].filter(([from]) => from.startsWith("/__l5e/")).map(([from, to]) => [from, to]))];

  for (const [from, to] of unique) {
    const url = `${origin}${from}`;
    const output = join(OUT, to.replace(/^\//, ""));
    await mkdir(dirname(output), { recursive: true });
    try {
        const response = await fetch(url);
        if (response.ok && response.body) {
            await pipeline(response.body, createWriteStream(output));
        }
    } catch (e) {
        console.warn(`Failed to download asset ${url}: ${e.message}`);
    }
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
      if (!textExt.has(ext)) return;
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
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Timed out waiting for production server");
}

async function main() {
  console.log("Cleaning and building...");
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  
  // Build the app first
  const buildProc = spawn("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
  await new Promise((resolve, reject) => {
    buildProc.on("close", (code) => code === 0 ? resolve() : reject(new Error("Build failed")));
  });

  await copyDir(join(ROOT, "dist", "client"), OUT);
  
  const map = await collectAssetMap();
  await downloadAssets(map);
  
  console.log("Prerendering routes...");
  const proc = spawn("bunx", ["wrangler", "dev", "--config", "dist/server/wrangler.json", "--local", "--port", String(PORT), "--compatibility-date", "2026-07-28", "--compatibility-flags", "nodejs_compat"], {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, NO_COLOR: "1" },
  });

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
  } finally {
    proc.kill();
  }

  await rewriteFiles(map);
  await writeFile(join(OUT, "_redirects"), "/servicos /servicos/index.html 200\n/* /index.html 200\n");
  
  console.log("Netlify static export ready in netlify-static-dist");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
