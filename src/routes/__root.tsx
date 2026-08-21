import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <span className="eyebrow text-gold-deep">
          <span className="gold-line mr-3" />
          Erro 404
          <span className="gold-line ml-3" />
        </span>
        <h1 className="display-lg mt-5 text-ink">
          Página <span className="italic text-gold-deep">não encontrada</span>
        </h1>
        <p className="mt-5 text-[14.5px] leading-[1.8] text-muted-foreground">
          A página que procura não existe ou foi movida. Volte ao início para conhecer o salão.
        </p>
        <div className="mt-9 flex justify-center">
          <Link to="/" className="btn-pill btn-premium btn-gold">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <span className="eyebrow text-gold-deep">
          <span className="gold-line mr-3" />
          Ups
          <span className="gold-line ml-3" />
        </span>
        <h1 className="display-md mt-5 text-ink">Esta página não carregou</h1>
        <p className="mt-4 text-[14.5px] leading-[1.8] text-muted-foreground">
          Algo correu mal do nosso lado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-pill btn-premium btn-gold h-12 w-auto px-8"
          >
            Tentar de novo
          </button>
          <a
            href={import.meta.env.BASE_URL}
            className="btn-pill btn-premium h-12 w-auto border border-ink/15 px-8 text-ink hover:border-gold hover:bg-bege/60"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Michelly Hair — Cabeleireira Charneca da Caparica | Alisamentos e Madeixas" },
      {
        name: "description",
        content:
          "Referência em Alisamentos na Charneca da Caparica e Madeixas na Margem Sul. Salão de beleza premium especialista em transformações capilares exclusivas.",
      },
      { name: "author", content: "Michelly Hair" },
      { name: "theme-color", content: "#FBF9F6" },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:site_name", content: "Michelly Hair" },
      { property: "og:title", content: "Michelly Hair — Salão Premium" },
      {
        property: "og:description",
        content: "Transformando cabelos, elevando autoestima. Charneca da Caparica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.png`, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
