import { mkdir, readFile, readdir, rm, copyFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "dist", "client");
const OUT = join(ROOT, "static-export");

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const src = join(from, entry.name);
      const dest = join(to, entry.name);
      if (entry.isDirectory()) return copyDir(src, dest);
      return copyFile(src, dest);
    }),
  );
}

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

async function main() {
  console.log("Starting static HTML export...");
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  // 1. Copy all client assets (JS, CSS, Images)
  await copyDir(SOURCE, OUT);

  // 2. The project uses TanStack Start which is SSR-first.
  // To get a pure static HTML, we can fetch the local dev/preview server
  // But the user wants a simple structure. 
  // I will check if I can just rename the prerendered files from the netlify-dist
  const netlifyDist = join(ROOT, "netlify-dist");
  
  if (await stat(netlifyDist).catch(() => null)) {
     console.log("Using pre-rendered files from netlify-dist...");
     // The netlify-dist already has index.html and servicos/index.html
     // We just need to make sure the paths are correct.
     await copyDir(netlifyDist, OUT);
  }

  const files = await walk(OUT);
  console.log(`Export complete: ${OUT} (${files.length} files)`);
}

main().catch(console.error);
