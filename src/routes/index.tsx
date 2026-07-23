import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MapPin, ChevronDown, Star, Quote, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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
  { name: "Mariana Costa", text: "Um verdadeiro ritual. Saio do salão sempre com o cabelo perfeito e a autoestima renovada." },
  { name: "Rita Marques", text: "Detalhe, técnica e sensibilidade. A Michelly transformou por completo a minha relação com o meu cabelo." },
  { name: "Sofia Pereira", text: "Ambiente acolhedor, atendimento refinado. É o único sítio onde confio o meu cabelo há mais de dois anos." },
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.65 1.44h.01c6.55 0 11.86-5.3 11.86-11.85 0-3.17-1.24-6.15-3.4-8.43ZM12.06 21.6h-.01a9.72 9.72 0 0 1-4.96-1.36l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.7 9.7 0 0 1-1.49-5.1c0-5.37 4.38-9.74 9.76-9.74 2.6 0 5.05 1.02 6.9 2.86a9.7 9.7 0 0 1 2.85 6.89c0 5.37-4.38 9.74-9.67 9.74Zm5.6-7.29c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.79 1-.97 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.53-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.54.08-.83.39-.28.31-1.09 1.06-1.09 2.59s1.12 3 1.28 3.21c.15.2 2.2 3.36 5.33 4.71.75.32 1.33.52 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.6-.36Z"/>
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

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

function AnimatedNumber({ value, suffix = "", duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function BeforeAfter({ before, after, title }: { before: string; after: string; title: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="reveal">
      <p className="mb-5 text-center font-serif text-lg italic text-muted-foreground md:text-xl">— {title} —</p>
      <div
        className="relative mx-auto w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-32px_rgba(0,0,0,0.35)] select-none"
        style={{ aspectRatio: "4 / 3", maxWidth: "780px" }}
      >
        <img src={after} alt={`Depois — ${title}`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={before}
            alt={`Antes — ${title}`}
            className="absolute inset-y-0 left-0 h-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, minWidth: "100%" }}
            draggable={false}
          />
        </div>
        <div className="pointer-events-none absolute left-4 top-4">
          <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur">Antes</span>
        </div>
        <div className="pointer-events-none absolute right-4 top-4">
          <span className="rounded-full bg-gold/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-ink backdrop-blur">Depois</span>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-px bg-white/80 shadow-[0_0_20px_rgba(0,0,0,0.4)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_10px_25px_-8px_rgba(0,0,0,0.4)]">
            <ChevronLeft className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5 -ml-1" />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparar antes e depois — ${title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

function Landing() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <a href="#top" className={`font-serif text-xl md:text-2xl tracking-[0.02em] transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
            Michelly<span className="text-gold"> Hair</span>
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 hover:scale-105 ${
              scrolled ? "border-border text-ink hover:bg-bege" : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background: "color-mix(in oklab, oklch(0.14 0.008 60) 92%, transparent)",
          backdropFilter: "blur(28px) saturate(140%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <span className="font-serif text-xl text-white tracking-wide">
            Michelly<span className="text-gold"> Hair</span>
          </span>
          <button
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-all hover:scale-105 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="mx-auto flex max-w-md flex-col items-center gap-7 px-6 pt-20 text-center">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-4xl tracking-tight text-white/90 transition-all duration-500 hover:text-gold hover:tracking-wider ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 80}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-6 h-px w-16 bg-gold/60" />
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
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-[75%_center] scale-105"
          />
        </picture>
        {/* Soft directional wash — never covers the model */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/45 md:bg-gradient-to-r md:from-black/45 md:via-transparent md:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pt-28 pb-24 md:grid md:grid-cols-12 md:items-center md:px-10 md:pt-32 md:pb-20">
          <div className="w-full md:col-span-6 lg:col-span-5">
            <div className="reveal inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-xl">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span className="eyebrow text-white/95">Charneca da Caparica</span>
            </div>

            {/* Glassmorphism panel — soft, bounded to text only */}
            <div
              className="reveal relative mt-6 w-full rounded-[28px] px-6 py-8 md:px-9 md:py-10"
              style={{
                transitionDelay: "120ms",
                background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                backdropFilter: "blur(14px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 30px 80px -40px rgba(0,0,0,0.6)",
              }}
            >
              <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.015em] text-white sm:text-5xl md:text-[3.4rem] lg:text-[3.75rem]">
                Transformando cabelos,<br />
                elevando<br />
                <span className="italic font-light text-gold">autoestima.</span>
              </h1>
              <p className="mt-6 max-w-md text-[14px] leading-[1.8] text-white/85 md:text-[15px]">
                Balayage, Morena Iluminada, alisamentos e tratamentos personalizados
                para realçar a beleza natural de cada cliente.
              </p>
            </div>

            <div
              className="reveal mt-8 flex flex-col items-start gap-3"
              style={{ transitionDelay: "260ms" }}
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="btn-pill bg-gold text-ink shadow-[0_18px_40px_-18px_rgba(184,144,80,0.7)] hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(184,144,80,0.85)]"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="btn-pill border border-white/70 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-ink"
              >
                <InstagramIcon className="h-[18px] w-[18px]" /> Instagram
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="btn-pill border border-white/40 bg-white/5 text-white/95 backdrop-blur-md hover:border-white hover:bg-white/15"
              >
                <MapPin className="h-[18px] w-[18px]" /> Localização
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1.5 text-white/80">
          <span className="eyebrow text-white/70">Descubra</span>
          <ChevronDown className="scroll-arrow h-4 w-4 text-gold" />
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-gradient-to-b from-bege/30 via-background to-background">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-5 py-14 sm:grid-cols-2 md:gap-6 md:px-10 md:py-20">
          {[
            { icon: <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.3} />, value: 300, suffix: "+", title: "Clientes transformadas", desc: "Confiança construída ao longo dos anos." },
            { icon: <Heart className="h-5 w-5 text-gold" strokeWidth={1.3} />, value: 100, suffix: "%", title: "Atendimento personalizado", desc: "Cada consulta pensada individualmente." },
          ].map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 backdrop-blur-md shadow-[0_10px_40px_-24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.24)] md:p-10 shine-once"
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/5">
                  {s.icon}
                </div>
                <div className="eyebrow">{s.title}</div>
              </div>
              <div className="mt-6 font-serif text-5xl leading-none tracking-tight text-ink md:text-6xl">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            </div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:items-center">
          <div className="reveal order-2 md:order-1">
            <div className="group relative overflow-hidden rounded-[32px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
              <img
                src={especialista.url}
                alt="Michelly atendendo uma cliente"
                className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ height: "clamp(340px, 46vw, 520px)" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/20" />
            </div>
          </div>
          <div className="reveal order-1 md:order-2" style={{ transitionDelay: "120ms" }}>
            <span className="eyebrow"><span className="gold-line mr-3" />Sobre o salão</span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.015em] text-ink md:text-[3.25rem]">
              Um cuidado pensado<br />
              <span className="italic text-gold">para cada mulher.</span>
            </h2>
            <p className="mt-8 max-w-md text-[16px] leading-[1.85] text-muted-foreground">
              Cada visita ao Michelly Hair é uma experiência exclusiva — escuta atenta,
              técnica precisa e um cuidado artesanal do diagnóstico ao último toque.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 border-b border-gold pb-1 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-70"
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
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3rem]">
              Um cuidado para cada desejo.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Serviços exclusivos, executados com técnica refinada e produtos premium.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.name}
                className="reveal group overflow-hidden rounded-3xl bg-card shadow-[0_12px_36px_-22px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.28)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    style={{ aspectRatio: "4 / 3" }}
                  />
                </div>
                <div className="px-7 py-6">
                  <h3 className="font-serif text-[1.4rem] tracking-tight text-ink">{s.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-20" />
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
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3rem]">
            Antes &amp; Depois
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Deslize o comparador para revelar cada transformação.
          </p>
        </div>

        <div className="mt-16 space-y-16 md:space-y-24">
          {beforeAfter.map((t, i) => (
            <BeforeAfter key={i} before={t.before} after={t.after} title={t.title} />
          ))}
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="bg-bege/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="reveal text-center">
            <div className="flex items-center justify-center gap-1 text-gold">
              {[0,1,2,3,4].map((i) => <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />)}
            </div>
            <div className="mt-3 font-serif text-3xl text-ink md:text-4xl">5.0</div>
            <p className="eyebrow mt-2">Mais de 300 clientes satisfeitas</p>
          </div>

          <div className="reveal relative mt-14">
            <div
              ref={testimonialsRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:gap-6 md:px-10"
              style={{ scrollBehavior: "smooth" }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="snap-center shrink-0 rounded-3xl border border-border/50 bg-card/80 p-7 backdrop-blur-md shadow-[0_10px_36px_-22px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.28)] md:p-9"
                  style={{ width: "min(88vw, 380px)" }}
                >
                  <Quote className="h-7 w-7 text-gold/60" strokeWidth={1.1} />
                  <p className="mt-4 font-serif text-[17px] italic leading-[1.7] text-foreground/85 md:text-[18px]">
                    "{t.text}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-gold/60" />
                    <span className="eyebrow text-ink">{t.name}</span>
                  </div>
                  <div className="mt-3 flex gap-0.5 text-gold">
                    {[0,1,2,3,4].map((i) => <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />)}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                aria-label="Anterior"
                onClick={() => testimonialsRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Próximo"
                onClick={() => testimonialsRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 20% 30%, rgba(184,144,80,0.35), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(184,144,80,0.2), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-10 md:py-36">
          <div className="reveal">
            <span className="eyebrow text-white/60"><span className="gold-line mr-3" />Agende agora<span className="gold-line ml-3" /></span>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-white md:text-[4rem]">
              A sua próxima<br /><span className="italic text-gold">transformação</span> começa aqui.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
              Reserve o seu horário e descubra o cuidado exclusivo do Michelly Hair.
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="btn-pill bg-gold text-ink shadow-[0_18px_50px_-14px_rgba(184,144,80,0.7)] hover:bg-gold-soft"
                style={{ maxWidth: "22rem" }}
              >
                <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <div className="font-serif text-2xl text-ink">
                Michelly<span className="text-gold"> Hair</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Salão premium especializado em coloração, iluminados, alisamentos e tratamentos exclusivos.
              </p>
              <div className="mt-6 flex gap-3">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={MAPS} target="_blank" rel="noreferrer" aria-label="Localização" className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
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
              <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-[0_10px_30px_-20px_rgba(0,0,0,0.2)]">
                <iframe
                  title="Mapa Michelly Hair"
                  src="https://www.google.com/maps?q=Largo+Fernanda+Alves+4A,+Charneca+da+Caparica&output=embed"
                  className="h-56 w-full"
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
