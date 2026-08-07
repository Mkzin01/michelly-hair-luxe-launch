import { mkdir, readFile, readdir, rm, copyFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
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

  // 1. Copy all client assets
  await copyDir(SOURCE, OUT);

  // 2. The project uses Nitro to generate the final deployment.
  // When running locally, TanStack Start/Nitro prerenders routes if configured,
  // but here we are using the cloudflare-module preset.
  
  // We need the ACTUAL index.html that would be served.
  // Let's check where Nitro put the prerendered files.
  // In many TanStack Start setups, they end up in .output/public or similar,
  // but here the build command points to dist/client.
  
  // If the file index.html is missing from dist/client, it means it's not being prerendered as a static file.
  const indexExists = await stat(join(SOURCE, "index.html")).catch(() => null);
  
  if (!indexExists) {
    console.log("Warning: index.html not found in dist/client. Trying to locate it...");
    // Let's check common locations
    const searchPaths = [
      join(ROOT, ".output", "public"),
      join(ROOT, "netlify-dist")
    ];
    
    for (const path of searchPaths) {
      if (await stat(path).catch(() => null)) {
        console.log(`Found content in ${path}, copying...`);
        await copyDir(path, OUT);
        break;
      }
    }
  }

  const files = await walk(OUT);
  console.log(`Export complete: ${OUT} (${files.length} files)`);
}

main().catch(console.error);