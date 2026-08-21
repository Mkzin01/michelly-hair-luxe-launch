import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Sparkles } from "lucide-react";
import { useEffect } from "react";

import balayage from "@/assets/mh/balayage.jpg.asset.json";
import morena from "@/assets/mh/morena-iluminada.jpg.asset.json";
import madeixas from "@/assets/mh/madeixas.jpg.asset.json";
import alisamento from "@/assets/mh/alisamento.jpg.asset.json";
import coloracao from "@/assets/mh/coloracao.jpg.asset.json";
import tratamentos from "@/assets/mh/tratamentos.jpg.asset.json";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Alisamentos e Madeixas na Charneca da Caparica | Michelly Hair" },
      {
        name: "description",
        content:
          "Conheça todos os serviços do Michelly Hair: alisamentos, madeixas, balayage, morena iluminada, coloração e tratamentos capilares na Charneca da Caparica.",
      },
      { property: "og:title", content: "Serviços — Michelly Hair" },
      {
        property: "og:description",
        content: "Balayage, Morena Iluminada, Alisamentos, Coloração e Tratamentos exclusivos.",
      },
    ],
  }),
  component: ServicosPage,
});

const PHONE = "351920810339";
const getWA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

type Service = {
  name: string;
  img: string;
  desc: string;
  detail: string;
  duration: string;
};

const services: Service[] = [
  {
    name: "Balayage",
    img: balayage.url,
    desc: "Reflexos naturais pintados à mão, com luminosidade sob medida e transições suaves.",
    detail:
      "Ideal para quem quer luz sem marcar a raiz — a manutenção é mais espaçada e o crescimento fica natural.",
    duration: "3 a 5 h",
  },
  {
    name: "Morena Iluminada",
    img: morena.url,
    desc: "Iluminação discreta que valoriza o tom natural, mantendo a raiz preservada.",
    detail:
      "Pensada para cabelos castanhos: ganha movimento e brilho sem perder a profundidade da cor de base.",
    duration: "3 a 4 h",
  },
  {
    name: "Alisamento",
    img: alisamento.url,
    desc: "Fios lisos, saudáveis e com movimento — técnica adaptada ao seu tipo de cabelo.",
    detail:
      "A escolha do produto é feita após avaliação, para respeitar o histórico de químicas de cada cabelo.",
    duration: "3 a 5 h",
  },
  {
    name: "Madeixas",
    img: madeixas.url,
    desc: "Nuances precisas com papel de alumínio para um resultado refinado e duradouro.",
    detail:
      "Controlo total do tom e da espessura de cada mecha, para um efeito uniforme e sofisticado.",
    duration: "2 a 4 h",
  },
  {
    name: "Coloração",
    img: coloracao.url,
    desc: "Cor personalizada com pigmentos premium, cobertura perfeita e brilho intenso.",
    detail:
      "Da cobertura de brancos à mudança de tom, com fórmulas ajustadas à sua base e ao seu estilo de vida.",
    duration: "1 h 30 a 3 h",
  },
  {
    name: "Tratamentos Capilares",
    img: tratamentos.url,
    desc: "Rituais restauradores de alta performance para reconstruir e nutrir os fios.",
    detail:
      "Hidratação, nutrição ou reconstrução — definimos o ritual certo consoante o que o seu cabelo precisa.",
    duration: "45 min a 1 h 30",
  },
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.65 1.44h.01c6.55 0 11.86-5.3 11.86-11.85 0-3.17-1.24-6.15-3.4-8.43ZM12.06 21.6h-.01a9.72 9.72 0 0 1-4.96-1.36l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.7 9.7 0 0 1-1.49-5.1c0-5.37 4.38-9.74 9.76-9.74 2.6 0 5.05 1.02 6.9 2.86a9.7 9.7 0 0 1 2.85 6.89c0 5.37-4.38 9.74-9.67 9.74Zm5.6-7.29c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.79 1-.97 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.53-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.54.08-.83.39-.28.31-1.09 1.06-1.09 2.59s1.12 3 1.28 3.21c.15.2 2.2 3.36 5.33 4.71.75.32 1.33.52 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.6-.36Z" />
    </svg>
  );
}

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle
        cx="24"
        cy="24"
        r="22.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="18"
        letterSpacing="1"
        fill="currentColor"
      >
        MH
      </text>
    </svg>
  );
}

function ServicosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Michelly Hair — início">
            <Monogram className="h-9 w-9 text-gold-deep md:h-10 md:w-10" />
            <span className="font-serif text-[21px] leading-none tracking-[-0.02em] text-ink md:text-[23px]">
              Michelly <span className="text-gold-deep">Hair</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:text-gold-deep md:text-[11px]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </Link>
        </div>
      </header>

      {/* Cabeçalho da página */}
      <section className="grain relative overflow-hidden bg-bege/40 py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
          <span className="eyebrow text-gold-deep">
            <span className="gold-line mr-3" />
            Serviços
            <span className="gold-line ml-3" />
          </span>
          <h1 className="display-lg mt-5 text-balance text-ink">
            Todos os nossos
            <br />
            <span className="italic text-gold-deep">cuidados exclusivos.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[15px] leading-[1.8] text-muted-foreground">
            Cada serviço é executado com técnica refinada, produtos premium e um cuidado artesanal —
            do diagnóstico ao último toque.
          </p>
        </div>
      </section>

      {/* Lista de serviços */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.name}
              className="reveal-scale group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[var(--shadow-lift)] md:rounded-[26px]"
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: "4 / 3" }}>
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="img-zoom absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,14,8,0.55)] to-transparent" />
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <Clock className="h-3 w-3 text-gold" strokeWidth={1.6} /> {s.duration}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h2 className="font-serif text-[1.3rem] leading-tight text-ink md:text-[1.5rem]">
                  {s.name}
                </h2>
                <div className="mt-2.5 h-px w-8 bg-gold/60 transition-all duration-700 group-hover:w-16" />
                <p className="mt-3.5 text-[13.5px] leading-[1.75] text-muted-foreground">
                  {s.desc}
                </p>
                <p className="mt-3 text-[13px] leading-[1.75] text-muted-foreground/80">
                  {s.detail}
                </p>

                <a
                  href={getWA(`Olá Michelly! Gostaria de saber mais sobre o serviço de ${s.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-auto self-start pt-6 text-[10.5px] font-medium uppercase tracking-[0.24em] text-ink"
                >
                  Agendar {s.name} <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Nota de avaliação */}
        <div className="reveal mt-12 rounded-[20px] border border-gold/25 bg-bege/40 p-6 text-center md:mt-16 md:p-8">
          <p className="mx-auto max-w-xl text-[13.5px] leading-[1.8] text-muted-foreground">
            <span className="text-ink">Os tempos são indicativos.</span> A duração exata depende do
            comprimento, da densidade e do histórico de químicas do seu cabelo — confirmamos tudo na
            avaliação, antes de começar.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 20% 25%, rgba(197,160,101,0.34), transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(197,160,101,0.2), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:px-10 md:py-20">
          <span className="eyebrow text-white/55">
            <span className="gold-line mr-3" />
            Marcações
            <span className="gold-line ml-3" />
          </span>
          <h2 className="display-lg mt-5 text-balance text-white">
            Ainda com <span className="italic text-gold">dúvidas</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-[1.8] text-white/70">
            Diga-nos o que procura e ajudamos a escolher o serviço certo para o seu cabelo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={getWA("Olá Michelly! Gostaria de agendar um dos serviços que vi no site.")}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-premium btn-gold h-12 sm:w-auto sm:px-9"
            >
              <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
            </a>
            <Link
              to="/"
              hash="contacto"
              className="btn-pill btn-premium h-12 border border-white/35 bg-white/8 text-white backdrop-blur-md hover:bg-white hover:text-ink sm:w-auto sm:px-9"
            >
              <MapPin className="h-4 w-4" /> Ver localização
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
