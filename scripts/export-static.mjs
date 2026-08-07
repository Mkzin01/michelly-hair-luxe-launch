import { mkdir, readFile, writeFile, readdir, rm, copyFile, stat } from "node:fs/promises";
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

const TEMPLATE = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Michelly Hair — Cabeleireira Charneca da Caparica | Alisamentos e Madeixas</title>
  <meta name="description" content="Especialista em Alisamentos na Charneca da Caparica e Madeixas. Salão de beleza premium na Margem Sul. Balayage, Morena Iluminada e tratamentos capilares.">
  <link rel="icon" type="image/png" href="./favicon.png">
  <link rel="stylesheet" href="./assets/styles-DBwmwjDA.css">
  <style>
    body { background: #0c0c0c; color: white; margin: 0; font-family: sans-serif; }
    .loading-screen { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #0c0c0c; z-index: 100; }
  </style>
</head>
<body>
  <div id="root">
    <div class="loading-screen">
      <div style="text-align: center;">
        <h1 style="font-family: serif; letter-spacing: 0.2em; font-weight: 300;">MICHELLY HAIR</h1>
        <p style="font-size: 10px; letter-spacing: 0.3em; color: #b89050; margin-top: 10px;">CARREGANDO EXPERIÊNCIA...</p>
      </div>
    </div>
  </div>
  
  <script type="module">
    // Este script garante que o roteamento do TanStack Start funcione em ambiente estático
    window.__TSR_MANIFEST__ = {
      "routes": {
        "__root": { "id": "__root", "path": "" },
        "/": { "id": "/", "path": "/" },
        "/servicos": { "id": "/servicos", "path": "/servicos" }
      }
    };
  </script>
  <script type="module" src="./assets/index-D9EOVexI.js"></script>
</body>
</html>`;

async function main() {
  console.log("Starting static HTML export...");
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  await copyDir(SOURCE, OUT);

  // Garantir que as pastas de rotas existam
  await mkdir(join(OUT, "servicos"), { recursive: true });

  // Criar os arquivos index.html
  await writeFile(join(OUT, "index.html"), TEMPLATE);
  
  // Para a página de serviços, ajustamos os caminhos relativos
  const servicosTemplate = TEMPLATE.replace(/\.\//g, "../");
  await writeFile(join(OUT, "servicos", "index.html"), servicosTemplate);

  console.log("Export complete: index.html generated manually for static hosting.");
}

main().catch(console.error);