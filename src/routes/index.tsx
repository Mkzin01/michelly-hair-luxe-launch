import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, Instagram, MapPin, ChevronDown, Star, Quote, Heart } from "lucide-react";

import heroDesktop from "@/assets/mh/hero-desktop.jpg.asset.json";
import heroMobile from "@/assets/mh/hero-mobile.jpg.asset.json";
import especialista from "@/assets/mh/especialista.jpg.asset.json";
import balayage from "@/assets/mh/balayage.jpg.asset.json";
import morena from "@/assets/mh/morena-iluminada.jpg.asset.json";
import madeixas from "@/assets/mh/madeixas.jpg.asset.json";
import alisamento from "@/assets/mh/alisamento.jpg.asset.json";
import coloracao from "@/assets/mh/coloracao.jpg.asset.json";
import tratamentos from "@/assets/mh/tratamentos.jpg.asset.json";
import antes from "@/assets/mh/antes.jpg.asset.json";
import depois from "@/assets/mh/depois.jpg.asset.json";
import p2 from "@/assets/mh/portfolio-2.jpg.asset.json";
import p3 from "@/assets/mh/portfolio-3.jpg.asset.json";
import p4 from "@/assets/mh/portfolio-4.jpg.asset.json";
import p5 from "@/assets/mh/portfolio-5.jpg.asset.json";
import p6 from "@/assets/mh/portfolio-6.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michelly Hair — Salão Premium | Charneca da Caparica" },
      { name: "description", content: "Especialista em Balayage, Morena Iluminada, Alisamentos e tratamentos personalizados. Atendimento exclusivo em Charneca da Caparica." },
      { property: "og:title", content: "Michelly Hair — Salão Premium" },
      { property: "og:description", content: "Transformando cabelos, elevando autoestima." },
      { property: "og:image", content: heroDesktop.url },
      { name: "twitter:image", content: heroDesktop.url },
    ],
  }),
  component: Landing,
});

const WHATSAPP = "https://wa.me/351920810339";
const INSTAGRAM = "https://www.instagram.com/michellyhair.pt?igsh=cTQ4cnltejVlcGpn";
const MAPS = "https://google.com/maps/place/Largo+Fernanda+Alves+4A/@38.6292462,-9.1992968,87a,90y,109.31h,75.04t/data=!3m5!1e1!3m3!1s9PjZVUZ07dvUHaTlvbMsVA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D9PjZVUZ07dvUHaTlvbMsVA%26w%3D900%26h%3D600%26ll%3D38.629246,-9.199297%26yaw%3D109.311424%26pitch%3D14.962830%26thumbfov%3D112%26cb_client%3Dgmm.iv.ios!4m6!3m5!1s0xd1ecaa8e612bf47:0xedbcb24680108752!8m2!3d38.6291158!4d-9.1988223!10e5";

const services = [
  { name: "Balayage", img: balayage.url, desc: "Reflexos naturais, luminosidade sob medida." },
  { name: "Morena Iluminada", img: morena.url, desc: "Iluminação discreta que valoriza o tom natural." },
  { name: "Madeixas", img: madeixas.url, desc: "Nuances precisas para um resultado refinado." },
  { name: "Alisamento", img: alisamento.url, desc: "Fios lisos, saudáveis e com movimento." },
  { name: "Coloração", img: coloracao.url, desc: "Cor personalizada com pigmentos premium." },
  { name: "Tratamentos Capilares", img: tratamentos.url, desc: "Rituais restauradores de alta performance." },
];

const beforeAfter = [
  { before: antes.url, after: depois.url, title: "Balayage Iluminada" },
  { before: p2.url, after: p3.url, title: "Morena Iluminada" },
  { before: p4.url, after: p5.url, title: "Coloração Personalizada" },
];

const testimonials = [
  { name: "Ana Ferreira", text: "Um atendimento impecável. Sinto que a Michelly entende exatamente o que quero antes mesmo de eu dizer." },
  { name: "Carolina Sousa", text: "Meu cabelo nunca esteve tão saudável. Ambiente sofisticado e um resultado que superou todas as expectativas." },
  { name: "Beatriz Almeida", text: "Confio de olhos fechados. Cada visita é uma experiência delicada, precisa e verdadeiramente premium." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Landing() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <a href="#top" className={`font-serif text-xl md:text-2xl tracking-wide transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
            Michelly<span className="text-gold"> Hair</span>
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
              scrolled ? "border-border text-ink hover:bg-bege" : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <span className="font-serif text-xl text-white tracking-wide">
            Michelly<span className="text-gold"> Hair</span>
          </span>
          <button
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 pt-20 text-center">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl text-white/90 transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-8 h-px w-16 bg-gold/60" />
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="eyebrow text-white/70 hover:text-gold">
            +351 920 810 339
          </a>
        </nav>
      </div>

      {/* Hero */}
      <section id="top" ref={heroRef} className="relative min-h-[100svh] w-full overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile.url} />
          <img
            src={heroDesktop.url}
            alt="Michelly Hair salão premium"
            className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-40 md:pb-16">
          <div className="max-w-2xl">
            <div className="reveal inline-flex items-center gap-3 rounded-full bg-black/25 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span className="eyebrow text-white/90">Charneca da Caparica</span>
            </div>

            <div className="reveal mt-6 inline-block rounded-sm bg-black/35 px-5 py-5 backdrop-blur-md md:px-7 md:py-7" style={{ transitionDelay: "120ms" }}>
              <h1 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Transformando cabelos,<br />
                elevando<br />
                <span className="italic text-gold">autoestima.</span>
              </h1>
            </div>

            <p className="reveal mt-6 max-w-md text-sm leading-relaxed text-white/85 md:text-base" style={{ transitionDelay: "220ms" }}>
              Especialista em Balayage, Morena Iluminada, Alisamentos e tratamentos personalizados
              para realçar a beleza natural de cada cliente.
            </p>

            <div className="reveal mt-7 flex flex-wrap gap-2.5 md:gap-3" style={{ transitionDelay: "320ms" }}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft md:px-7 md:py-3.5 md:text-xs md:tracking-[0.28em]"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Agendar WhatsApp
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/70 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-ink md:px-7 md:py-3.5 md:text-xs md:tracking-[0.28em]"
              >
                <Instagram className="h-3.5 w-3.5" /> Instagram
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 transition-all hover:bg-white/10 md:px-7 md:py-3.5 md:text-xs md:tracking-[0.28em]"
              >
                <MapPin className="h-3.5 w-3.5" /> Localização
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 self-center text-white/80">
            <span className="eyebrow text-white/70">Descubra</span>
            <ChevronDown className="scroll-arrow h-5 w-5 text-gold" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-bege/40">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-10 md:px-10 md:py-14">
          <div className="reveal text-center md:text-left">
            <div className="font-serif text-4xl text-ink md:text-5xl">300<span className="text-gold">+</span></div>
            <div className="eyebrow mt-2">Clientes transformadas</div>
          </div>
          <div className="reveal border-l border-border pl-6 text-center md:text-left" style={{ transitionDelay: "120ms" }}>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Heart className="h-6 w-6 text-gold" strokeWidth={1.4} />
              <div className="font-serif text-3xl text-ink md:text-4xl">Atendimento</div>
            </div>
            <div className="eyebrow mt-2">100% personalizado</div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 md:items-center">
          <div className="reveal order-2 md:order-1">
            <img
              src={especialista.url}
              alt="Michelly atendendo uma cliente"
              className="w-full rounded-sm object-cover shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
              style={{ height: "clamp(280px, 52vw, 520px)" }}
            />
          </div>
          <div className="reveal order-1 md:order-2" style={{ transitionDelay: "120ms" }}>
            <span className="eyebrow"><span className="gold-line mr-3" />Sobre o salão</span>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-5xl">
              Atendimento pensado<br />para cada mulher.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              No Michelly Hair, cada visita é uma experiência exclusiva. Escuta atenta, técnica precisa
              e um cuidado artesanal com o cabelo — do primeiro diagnóstico ao último toque.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Especialista em coloração, iluminados e alisamentos, Michelly trabalha com produtos de alta
              performance e uma abordagem sob medida para valorizar o que cada mulher tem de mais autêntico.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 border-b border-gold pb-1 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-70"
            >
              Agende a sua consulta
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-bege/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow"><span className="gold-line mr-3" />Serviços<span className="gold-line ml-3" /></span>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-5xl">
              Um cuidado para cada desejo.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Serviços exclusivos, executados com técnica refinada e produtos premium.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.name}
                className="reveal group overflow-hidden rounded-sm bg-card shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-56 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 md:h-64"
                  />
                </div>
                <div className="px-6 py-6">
                  <h3 className="font-serif text-xl text-ink md:text-2xl">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-16" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Antes e Depois */}
      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="gold-line mr-3" />Portfólio<span className="gold-line ml-3" /></span>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-5xl">
            Antes &amp; Depois
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Transformações reais assinadas por Michelly.
          </p>
        </div>

        <div className="mt-16 space-y-16 md:space-y-24">
          {beforeAfter.map((t, i) => (
            <div key={i} className="reveal">
              <p className="mb-6 text-center font-serif text-lg italic text-muted-foreground md:text-xl">
                — {t.title} —
              </p>
              <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                <figure className="group">
                  <div className="overflow-hidden rounded-sm shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)]">
                    <img
                      src={t.before}
                      alt={`Antes — ${t.title}`}
                      className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                      style={{ height: "clamp(260px, 42vw, 440px)" }}
                    />
                  </div>
                  <figcaption className="mt-4 text-center">
                    <span className="eyebrow text-ink">Antes</span>
                    <p className="mt-1 text-xs text-muted-foreground">Ponto de partida</p>
                  </figcaption>
                </figure>
                <figure className="group">
                  <div className="overflow-hidden rounded-sm shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)]">
                    <img
                      src={t.after}
                      alt={`Depois — ${t.title}`}
                      className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                      style={{ height: "clamp(260px, 42vw, 440px)" }}
                    />
                  </div>
                  <figcaption className="mt-4 text-center">
                    <span className="eyebrow text-gold">Depois</span>
                    <p className="mt-1 text-xs text-muted-foreground">Resultado final</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="bg-bege/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="reveal text-center">
            <div className="flex items-center justify-center gap-1 text-gold">
              {[0,1,2,3,4].map((i) => <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />)}
            </div>
            <div className="mt-3 font-serif text-4xl text-ink md:text-5xl">5.0</div>
            <p className="eyebrow mt-3">Mais de 300 clientes satisfeitas</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className="reveal rounded-sm bg-card p-8 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.2)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.3)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Quote className="h-6 w-6 text-gold/70" strokeWidth={1.2} />
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                  {t.text}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-6 bg-gold/60" />
                  <span className="eyebrow">{t.name}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 md:py-32">
          <div className="reveal">
            <span className="eyebrow text-white/60"><span className="gold-line mr-3" />Agende agora<span className="gold-line ml-3" /></span>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-white md:text-6xl">
              A sua próxima<br /><span className="italic text-gold">transformação</span> começa aqui.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
              Reserve o seu horário e descubra o cuidado exclusivo do Michelly Hair.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-all hover:bg-gold-soft"
            >
              <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <div className="font-serif text-2xl text-ink">
                Michelly<span className="text-gold"> Hair</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Salão premium especializado em coloração, iluminados, alisamentos e tratamentos exclusivos.
              </p>
              <div className="mt-6 flex gap-3">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-gold hover:text-gold">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-gold hover:text-gold">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={MAPS} target="_blank" rel="noreferrer" aria-label="Localização" className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-gold hover:text-gold">
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <span className="eyebrow">Contacto</span>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>Largo Fernanda Alves 4A</li>
                <li>Charneca da Caparica, Portugal</li>
                <li><a className="hover:text-gold" href={WHATSAPP} target="_blank" rel="noreferrer">+351 920 810 339</a></li>
                <li><a className="hover:text-gold" href={INSTAGRAM} target="_blank" rel="noreferrer">@michellyhair.pt</a></li>
              </ul>
            </div>

            <div>
              <span className="eyebrow">Localização</span>
              <div className="mt-5 overflow-hidden rounded-sm border border-border">
                <iframe
                  title="Mapa Michelly Hair"
                  src="https://www.google.com/maps?q=Largo+Fernanda+Alves+4A,+Charneca+da+Caparica&output=embed"
                  className="h-48 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Michelly Hair. Todos os direitos reservados.</p>
            <p className="eyebrow">Charneca da Caparica</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
