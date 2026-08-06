import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import logoFull from "@/assets/mh/logo-mh-final.png.asset.json";
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
      { name: "description", content: "Conheça os melhores alisamentos na Charneca da Caparica e serviços de madeixas. Salão premium especializado em Balayage e Morena Iluminada na Margem Sul." },
      { property: "og:title", content: "Serviços — Michelly Hair" },
      { property: "og:description", content: "Balayage, Morena Iluminada, Alisamentos, Coloração e Tratamentos exclusivos." },
    ],
  }),
  component: ServicosPage,
});

const services = [
  { name: "Balayage", img: balayage.url, desc: "Reflexos naturais pintados à mão, com luminosidade sob medida e transições suaves." },
  { name: "Morena Iluminada", img: morena.url, desc: "Iluminação discreta que valoriza o tom natural, mantendo a raiz preservada." },
  { name: "Alisamento", img: alisamento.url, desc: "Fios lisos, saudáveis e com movimento — técnica adaptada ao seu tipo de cabelo." },
  { name: "Madeixas", img: madeixas.url, desc: "Nuances precisas com papel alumínio para um resultado refinado e duradouro." },
  { name: "Coloração", img: coloracao.url, desc: "Cor personalizada com pigmentos premium, cobertura perfeita e brilho intenso." },
  { name: "Tratamentos Capilares", img: tratamentos.url, desc: "Rituais restauradores de alta performance para reconstruir e nutrir os fios." },
];

function ServicosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
        <Link to="/" className="transition-transform duration-300 hover:scale-[1.02] active:scale-95">
          <img src={logoFull.url} alt="Michelly Hair" className="h-10 w-auto md:h-14" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:text-gold md:text-[11px]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-5 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="gold-line mr-3" />Serviços<span className="gold-line ml-3" /></span>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3.25rem]">
            Todos os nossos<br />
            <span className="italic text-gold">cuidados exclusivos.</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Cada serviço é executado com técnica refinada, produtos premium e um cuidado artesanal do diagnóstico ao último toque.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-[0_10px_30px_-22px_rgba(0,0,0,0.2)] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.28)] sm:rounded-3xl"
            >
              <div className="flex items-center justify-center overflow-hidden rounded-t-2xl bg-bege/40 sm:rounded-t-3xl">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-[180px] w-full object-contain object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] sm:h-auto sm:object-cover"
                />
              </div>
              <div className="px-5 py-4 text-center sm:px-6 sm:py-5 sm:text-left">
                <h2 className="font-serif text-[1.05rem] leading-tight tracking-tight text-ink sm:text-[1.3rem]">{s.name}</h2>
                <p className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground sm:text-[13.5px]">{s.desc}</p>
                <div className="mx-auto mt-2.5 h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16 sm:mx-0 sm:w-8" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="https://wa.me/351920810339"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-gold text-ink shadow-[0_18px_50px_-14px_rgba(184,144,80,0.7)] hover:bg-gold-soft"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}