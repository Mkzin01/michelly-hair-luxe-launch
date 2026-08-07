import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MapPin, ChevronDown, Star, Quote, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import logoFull from "@/assets/mh/logo-mh-new.png.asset.json";
import heroNovo from "@/assets/mh/hero-novo.png.asset.json";
import especialista from "@/assets/mh/especialista.jpg.asset.json";
import balayage from "@/assets/mh/balayage.jpg.asset.json";
import morena from "@/assets/mh/morena-iluminada.jpg.asset.json";
import madeixas from "@/assets/mh/madeixas.jpg.asset.json";
import alisamento from "@/assets/mh/alisamento.jpg.asset.json";
import coloracao from "@/assets/mh/coloracao.jpg.asset.json";
import tratamentos from "@/assets/mh/tratamentos.jpg.asset.json";
import antes from "@/assets/mh/antes.jpg.asset.json";
import depois from "@/assets/mh/depois.jpg.asset.json";
import portfolio2 from "@/assets/mh/portfolio-2.jpg.asset.json";
import portfolio3 from "@/assets/mh/portfolio-3.jpg.asset.json";
import portfolio4 from "@/assets/mh/portfolio-4.jpg.asset.json";
import portfolio5 from "@/assets/mh/portfolio-5.jpg.asset.json";
import portfolio6 from "@/assets/mh/portfolio-6.jpg.asset.json";
import portfolioBalayage from "@/assets/mh/balayage-portfolio.png.asset.json";
import portfolioMorena from "@/assets/mh/morena-iluminada-portfolio.png.asset.json";
import portfolioMadeixas from "@/assets/mh/madeixas-new.png.asset.json";
import portfolioProgressiva from "@/assets/mh/progressiva-portfolio.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michelly Hair — Cabeleireira Charneca da Caparica | Alisamentos e Madeixas" },
      { name: "description", content: "Especialista em Alisamentos na Charneca da Caparica e Madeixas. Salão de beleza premium na Margem Sul. Balayage, Morena Iluminada e tratamentos capilares." },
      { property: "og:title", content: "Michelly Hair — Salão Premium" },
      { property: "og:description", content: "Transformando cabelos, elevando autoestima." },
      { property: "og:image", content: heroNovo.url },
      { name: "twitter:image", content: heroNovo.url },
    ],
  }),
  component: Landing,
});

const PHONE = "351920810339";
const WHATSAPP = `https://wa.me/${PHONE}`;
const INSTAGRAM = "https://www.instagram.com/michellyhair.pt?igsh=cTQ4cnltejVlcGpn";
const MAPS = "https://google.com/maps/place/Largo+Fernanda+Alves+4A/@38.6292462,-9.1992968,87a,90y,109.31h,75.04t/data=!3m5!1e1!3m3!1s9PjZVUZ07dvUHaTlvbMsVA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D9PjZVUZ07dvUHaTlvbMsVA%26w%3D900%26h%3D600%26ll%3D38.629246,-9.199297%26yaw%3D109.311424%26pitch%3D14.962830%26thumbfov%3D112%26cb_client%3Dgmm.iv.ios!4m6!3m5!1s0xd1ecaa8e612bf47:0xedbcb24680108752!8m2!3d38.6291158!4d-9.1988223!10e5";

const getWA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;


const services = [
  { name: "Balayage", img: balayage.url, desc: "Reflexos naturais, luminosidade sob medida." },
  { name: "Morena Iluminada", img: morena.url, desc: "Iluminação discreta que valoriza o tom natural." },
  { name: "Alisamento", img: alisamento.url, desc: "Fios lisos, saudáveis e com movimento." },
  { name: "Madeixas", img: madeixas.url, desc: "Nuances precisas para um resultado refinado." },
  { name: "Coloração", img: coloracao.url, desc: "Cor personalizada com pigmentos premium." },
  { name: "Tratamentos Capilares", img: tratamentos.url, desc: "Rituais restauradores de alta performance." },
];

type PortfolioItem = { src: string; category: string; title: string; desc: string };
const portfolio: PortfolioItem[] = [
  { src: portfolioBalayage.url,   category: "Balayage",         title: "Balayage",         desc: "Luminosidade e naturalidade em cada fio." },
  { src: portfolioMorena.url,     category: "Morena Iluminada", title: "Morena Iluminada", desc: "Contraste perfeito para realçar o seu tom." },
  { src: portfolioMadeixas.url,   category: "Madeixas",         title: "Madeixas",         desc: "Técnica precisa para um resultado sofisticado." },
  { src: portfolioProgressiva.url, category: "Alisamento",       title: "Alisamento",       desc: "Liso impecável com brilho e saúde." },
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

function useReveal(dependency?: any) {
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
    els.forEach((el) => {
      // Se já tiver a classe reveal-in (devido a uma renderização anterior),
      // garantimos que ela permaneça visível se o Observer for reiniciado
      if (el.classList.contains("reveal-in")) {
        // O elemento já está visível
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [dependency]);
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

function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      handleMove(clientX);
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="group relative h-[320px] w-full overflow-hidden rounded-[20px] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] md:h-[500px] md:rounded-[28px]"
    >
      {/* After Image (Full background) */}
      <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r border-white/40" 
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={before} 
          alt="Antes" 
          className="absolute inset-0 h-[320px] w-full object-cover md:h-[500px]" 
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
          draggable={false} 
        />
      </div>

      {/* Slider Divider Handle (Clickable Area) */}
      <div 
        className="absolute bottom-0 top-0 z-30 cursor-col-resize"
        style={{ left: `calc(${sliderPos}% - 20px)`, width: '40px' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/25 text-white shadow-xl backdrop-blur-md transition-transform group-hover:scale-110">
          <ChevronLeft className="h-3.5 w-3.5 -mr-0.5" strokeWidth={2.5} />
          <ChevronRight className="h-3.5 w-3.5 -ml-0.5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-4 left-4 z-20 rounded-lg bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
        Antes
      </div>
      <div className="pointer-events-none absolute top-4 right-4 z-20 rounded-lg bg-gold/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
        Depois
      </div>
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onClose, onIndex]);

  const current = items[index];
  const go = (dir: 1 | -1) => onIndex((index + dir + items.length) % items.length);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-[fadeIn_.25s_ease-out]"
      style={{ animation: "fadeIn .25s ease-out" }}
      onClick={onClose}
    >
      <button
        aria-label="Fechar"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:right-8 md:top-8"
      >
        <X className="h-4 w-4" />
      </button>
      <button
        aria-label="Anterior"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        className="absolute left-3 z-10 hidden h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:grid md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Próximo"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        className="absolute right-3 z-10 hidden h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:grid md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.title}
          className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] animate-[fadeIn_.35s_ease-out]"
          draggable={false}
        />
        <figcaption className="mt-5 text-center">
          <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">{current.category}</div>
          <div className="mt-2 font-serif text-2xl text-white md:text-3xl">{current.title}</div>
          <div className="mt-1 text-[13px] text-white/70">{current.desc}</div>
          <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
            {index + 1} / {items.length}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

function Landing() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  useReveal(activeCategory);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
    { label: "FAQ", href: "#faq" },
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <a href="#top" className="group flex items-center transition-all duration-300">
            <span 
              className={`font-serif text-[22px] tracking-[-0.02em] transition-all duration-500 md:text-2xl ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              Michelly Hair
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.filter(n => n.label !== "FAQ").map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`text-[10px] font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:text-gold ${
                  scrolled ? "text-ink/70" : "text-white/80"
                }`}
              >
                {n.label}
              </a>
            ))}
            <a
              href={getWA("Olá Michelly! Gostaria de agendar um serviço no salão.")}
              target="_blank"
              rel="noreferrer"
              className={`btn-pill h-10 w-auto px-6 text-[9px] transition-all duration-300 ${
                scrolled 
                  ? "bg-gold text-ink shadow-lg shadow-gold/20 hover:bg-gold-soft" 
                  : "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-ink"
              }`}
            >
              Agendar
            </a>
          </nav>
          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 hover:scale-105 md:hidden ${
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
        <div className="flex items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <span className="font-serif text-[22px] tracking-[-0.02em] text-white md:text-2xl">Michelly Hair</span>
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
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroNovo.url}
            alt="Michelly Hair salão premium"
            fetchPriority="high"
            loading="eager"
            className="ken-burns absolute inset-0 h-full w-full object-cover object-[30%_center] md:object-[70%_center]"
            draggable={false}
          />
        </div>
        {/* Premium layered overlay — dark top/bottom, transparent center, subtle side wash on desktop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-r from-black/45 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pt-28 pb-24 md:grid md:grid-cols-12 md:items-center md:px-10 md:pt-32 md:pb-20">
          <div className="w-full md:col-span-6 lg:col-span-5">
            <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-xl md:gap-3 md:px-4 md:py-2" style={{ animationDelay: "80ms" }}>
              <div className="flex items-center gap-1.5 border-r border-white/20 pr-2.5 md:gap-2 md:pr-3">
                <Star className="h-3 w-3 fill-gold text-gold md:h-3.5 md:w-3.5" strokeWidth={0} />
                <span className="text-[9px] font-bold text-white md:text-[0.72rem]">5.0</span>
              </div>
              <MapPin className="h-3 w-3 text-gold md:h-3.5 md:w-3.5" />
              <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.28em] text-white/95 md:text-[0.72rem] md:tracking-[0.35em]">
                Charneca da Caparica · Margem Sul
              </span>
            </div>

            {/* Glassmorphism panel — soft, bounded to text only */}
            <div
              className="hero-rise relative mt-5 w-full rounded-[24px] px-5 py-6 md:mt-6 md:rounded-[28px] md:px-9 md:py-10"
              style={{
                animationDelay: "220ms",
                background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                backdropFilter: "blur(18px) saturate(150%)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 40px 90px -50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <h1 className="hero-rise font-serif text-[1.9rem] leading-[1.05] tracking-[-0.015em] text-white sm:text-5xl md:text-[3.4rem] lg:text-[3.75rem]" style={{ animationDelay: "320ms" }}>
                Michelly Hair: Salão de Beleza<br />
                <span className="italic font-light text-gold text-[1.4rem] sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem]">na Charneca da Caparica</span>
              </h1>
              <p className="hero-rise mt-4 max-w-md text-[12.5px] leading-[1.7] text-white/85 md:mt-6 md:text-[15px] md:leading-[1.8]" style={{ animationDelay: "520ms" }}>
                Balayage, Morena Iluminada, alisamentos e tratamentos personalizados
                para realçar a beleza natural de cada cliente.
              </p>
            </div>

            <div
              className="mt-5 flex flex-col items-center gap-2.5 md:mt-8 md:items-start md:gap-3"
            >
              <a
                href={getWA("Olá Michelly! Vi o seu site e gostaria de agendar um horário para transformar o meu cabelo.")}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-premium hero-rise h-11 text-[10px] tracking-[0.24em] md:h-[3.25rem] md:text-[0.72rem] md:tracking-[0.28em] bg-gold text-ink shadow-[0_18px_40px_-18px_rgba(184,144,80,0.7)] hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(184,144,80,0.85)]"
                style={{ animationDelay: "700ms" }}
              >
                <WhatsAppIcon className="h-4 w-4" /> Agendar no WhatsApp
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-premium hero-rise h-11 text-[10px] tracking-[0.24em] md:h-[3.25rem] md:text-[0.72rem] md:tracking-[0.28em] border border-white/70 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-ink"
                style={{ animationDelay: "820ms" }}
              >
                <InstagramIcon className="h-[16px] w-[16px]" /> Ver Instagram
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-premium hero-rise h-11 text-[10px] tracking-[0.24em] md:h-[3.25rem] md:text-[0.72rem] md:tracking-[0.28em] border border-white/40 bg-white/5 text-white/95 backdrop-blur-md hover:border-white hover:bg-white/15"
                style={{ animationDelay: "940ms" }}
              >
                <MapPin className="h-[16px] w-[16px]" /> Como Chegar
              </a>

              <a
                href="#stats"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("stats");
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label="Ver mais"
                className="hero-rise mt-3 inline-flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-gold md:mt-4"
                style={{ animationDelay: "1120ms" }}
              >
                <span className="text-[9px] font-medium uppercase tracking-[0.32em] md:text-[10px]">Ver mais</span>
                <ChevronDown className="arrow-float h-4 w-4 text-gold" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Stats */}
      <section id="stats" className="relative bg-background">
        <div className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-28">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[
              { 
                icon: <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-gold" strokeWidth={1.2} />, 
                value: 300, 
                suffix: "+", 
                title: "Clientes transformadas", 
                desc: "" 
              },
              { 
                icon: <Heart className="h-5 w-5 md:h-6 md:w-6 text-gold" strokeWidth={1.2} />, 
                value: 100, 
                suffix: "%", 
                title: "Atendimento personalizado", 
                desc: "" 
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className="reveal group relative flex flex-col items-center text-center sm:items-start sm:text-left"
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-bege/30 shadow-[0_8px_30px_-10px_rgba(184,144,80,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:border-gold/40 group-hover:bg-bege/50 md:h-16 md:w-16 md:rounded-3xl">
                  {s.icon}
                </div>
                
                <div className="flex flex-col items-center sm:items-start">
                  <div className="eyebrow text-[9px] tracking-[0.25em] text-gold md:text-[0.72rem] md:tracking-[0.35em]">{s.title}</div>
                  <div className="mt-3 font-serif text-4xl leading-none tracking-tight text-ink sm:text-6xl md:mt-4 md:text-7xl lg:text-8xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-4 h-px w-8 bg-gold/30 transition-all duration-500 group-hover:w-16" />
                  {s.desc && <p className="mt-5 max-w-[280px] text-xs leading-[1.7] text-muted-foreground transition-colors duration-500 group-hover:text-ink/70 md:mt-7 md:text-sm md:leading-[1.8]">{s.desc}</p>}
                </div>
                
                {/* Decorative element */}
                <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gold/5 blur-3xl transition-all duration-700 group-hover:bg-gold/10 group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:items-center">
          <div className="reveal order-2 md:order-1">
            <div className="group relative overflow-hidden rounded-[24px] md:rounded-[32px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
              <img
                src={especialista.url}
                alt="Michelly atendendo uma cliente"
                className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ height: "clamp(260px, 46vw, 520px)" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] md:rounded-[32px] ring-1 ring-inset ring-white/20" />
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
              Agende a sua avaliação
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-bege/30 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow"><span className="gold-line mr-3" />Serviços<span className="gold-line ml-3" /></span>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3rem]">
              Especialista em Alisamentos e Madeixas.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Técnicas premium de Balayage e Morena Iluminada na Margem Sul.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((s, i) => {
              const hideOnMobile = i >= 4;
              return (
                <article
                  key={s.name}
                  className={`reveal group flex flex-col items-center justify-center rounded-2xl border border-gold/20 bg-card p-6 text-center shadow-[0_10px_30px_-22px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.15)] sm:rounded-3xl ${hideOnMobile ? "hidden sm:flex" : "flex"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className="font-serif text-[1rem] leading-tight tracking-tight text-ink sm:text-[1.3rem]">{s.name}</h3>
                  <p className="mt-2 hidden text-[11.5px] leading-snug text-muted-foreground sm:block sm:text-[13.5px]">{s.desc}</p>
                  <div className="mx-auto mt-3 h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-16" />
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-70"
            >
              Ver todos os serviços <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Antes e Depois */}
      <section id="portfolio" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-3 md:px-6">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow"><span className="gold-line mr-3" />Portfólio<span className="gold-line ml-3" /></span>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3rem]">
              Alguns dos trabalhos assinados por <span className="italic text-gold whitespace-nowrap">Michelly Hair</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Uma seleção editorial de transformações reais.
            </p>
          </div>

          {/* Categorias */}
          {(() => {
            const categories = ["Todos", ...Array.from(new Set(portfolio.map((p) => p.category)))];
            return (
              <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-14 md:gap-3">
                {categories.map((c) => {
                  const active = activeCategory === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`rounded-full border px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-all duration-500 md:px-5 md:py-2 md:text-[11px] md:tracking-[0.28em] ${
                        active
                          ? "border-ink bg-ink text-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]"
                          : "border-border bg-transparent text-muted-foreground hover:border-gold hover:text-ink"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            );
          })()}

          {/* Galeria */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
            {portfolio
              .map((item, i) => ({ item, i }))
              .filter(({ item }) => activeCategory === "Todos" || item.category === activeCategory)
              .map(({ item, i }) => (
                <button
                  key={`${item.src}-${i}`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Abrir ${item.title}`}
                  className="reveal group relative block w-full overflow-hidden rounded-[16px] bg-bege/40 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] md:rounded-[20px]"
                  style={{ aspectRatio: "3 / 4", transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    draggable={false}
                  />
                  {/* Degradê inferior discreto */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  {/* Ring interno sutil */}
                  <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10 md:rounded-[20px]" />
                  {/* Legenda sobre a foto */}
                  <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 p-3 text-left md:p-5">
                    <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-gold/95 md:text-[10px] md:tracking-[0.32em]">
                      {item.category}
                    </span>
                    <span className="font-serif text-[15px] leading-tight text-white md:text-[22px]">
                      {item.title}
                    </span>
                    <span className="hidden text-[12px] leading-snug text-white/80 md:block">
                      {item.desc}
                    </span>
                  </figcaption>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Seção Antes e Depois Estática (conforme imagem de referência) */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <span className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-gold/40" />
              RESULTADOS
              <span className="h-px w-8 bg-gold/40" />
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
              Antes & Depois
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground/80 md:text-[17px]">
              Transformações reais assinadas por Michelly Hair.
            </p>
          </div>

          <div className="reveal mx-auto max-w-4xl">
            <div className="mb-10 flex items-center justify-center gap-4 italic text-muted-foreground/60 text-sm md:text-base">
              <span className="h-px w-6 bg-border" />
              Transformação Real
              <span className="h-px w-6 bg-border" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="relative group">
                <div className="overflow-hidden rounded-[20px] md:rounded-[28px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
                  <img 
                    src={antes.url} 
                    alt="Antes" 
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  Antes
                </div>
              </div>
              
              <div className="relative group">
                <div className="overflow-hidden rounded-[20px] md:rounded-[28px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
                  <img 
                    src={depois.url} 
                    alt="Depois" 
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-lg">
                  Depois
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={portfolio}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndex={setLightboxIndex}
        />
      )}

      {/* Avaliações */}
      <section id="avaliacoes" className="bg-bege/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="reveal text-center">
            <span className="eyebrow"><span className="gold-line mr-3" />Avaliações<span className="gold-line ml-3" /></span>
            <div className="mt-5 flex items-center justify-center gap-1.5 text-gold">
              {[0,1,2,3,4].map((i) => <Star key={i} className="h-5 w-5 fill-current md:h-6 md:w-6" strokeWidth={0} />)}
            </div>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="font-serif text-5xl leading-none tracking-tight text-ink md:text-6xl">5.0</span>
              <span className="eyebrow text-ink/70">Google Reviews</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
              Mais de <span className="text-ink">300 clientes satisfeitas</span> ao longo dos anos.
            </p>
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
      
      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">
        <div className="reveal text-center">
          <span className="eyebrow"><span className="gold-line mr-3" />FAQ<span className="gold-line ml-3" /></span>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3rem]">
            Dúvidas Frequentes
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Tudo o que precisa de saber para a sua próxima visita.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {[
            { 
              q: "Preciso de fazer uma avaliação antes de agendar?", 
              a: "Para serviços de Madeixas, Balayage ou Alisamentos, recomendamos sempre uma consulta de avaliação para analisarmos a saúde do fio e definirmos o melhor caminho." 
            },
            { 
              q: "Quais os métodos de pagamento aceites?", 
              a: "Aceitamos pagamentos em Numerário, MB Way e Transferência Bancária." 
            },
            { 
              q: "Onde se localiza o salão?", 
              a: "Estamos localizados na Charneca da Caparica, no Largo Fernanda Alves 4A. Temos estacionamento fácil na zona." 
            },
            { 
              q: "Quanto tempo demora um serviço de Alisamento?", 
              a: "Dependendo do comprimento e densidade do cabelo, o serviço de Alisamento pode demorar entre 3 a 5 horas para garantir um resultado impecável." 
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="reveal group rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-card/60 md:p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="font-serif text-lg text-ink transition-colors group-hover:text-gold md:text-xl">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-ink/80 md:text-base">
                {item.a}
              </p>
            </div>
          ))}
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
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-10 md:py-20">
          <div className="reveal">
            <span className="eyebrow text-white/60"><span className="gold-line mr-3" />Agende agora<span className="gold-line ml-3" /></span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-white md:text-[3.4rem]">
              A sua próxima<br /><span className="italic text-gold">transformação</span> começa aqui.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-white/70">
              Reserve o seu horário e descubra o cuidado exclusivo do Michelly Hair.
            </p>
            <div className="mt-7 flex justify-center">
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
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <div className="font-serif text-xl text-ink">
                Michelly<span className="text-gold"> Hair</span>
              </div>
              <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-muted-foreground">
                Salão premium especializado em coloração, iluminados, alisamentos e tratamentos exclusivos.
              </p>
              <div className="mt-5 flex gap-2.5">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href={MAPS} target="_blank" rel="noreferrer" aria-label="Localização" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  <MapPin className="h-[14px] w-[14px]" />
                </a>
              </div>
            </div>

            <div>
              <span className="eyebrow text-[0.62rem]">Contacto</span>
              <ul className="mt-4 space-y-3 text-[12.5px] text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                  <span>Largo Fernanda Alves 4A<br />Charneca da Caparica, Portugal</span>
                </li>
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 text-gold/70" />
                  <a className="hover:text-gold" href={WHATSAPP} target="_blank" rel="noreferrer">+351 920 810 339</a>
                </li>
                <li className="flex items-center gap-3">
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0 text-gold/70" />
                  <a className="hover:text-gold" href={INSTAGRAM} target="_blank" rel="noreferrer">@michellyhair.pt</a>
                </li>
              </ul>
            </div>

            <div>
              <span className="eyebrow text-[0.62rem]">Localização</span>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border shadow-[0_10px_30px_-20px_rgba(0,0,0,0.2)]">
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

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-[10.5px] text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Michelly Hair. Todos os direitos reservados.</p>
            <p className="eyebrow text-[0.6rem]">Charneca da Caparica</p>
          </div>
        </div>
      </footer>
      {/* WhatsApp Floating Button */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Agendar via WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.55)] md:bottom-8 md:right-8"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-white text-[8px] font-bold text-[#25D366] items-center justify-center">1</span>
        </span>
      </a>
    </div>
  );
}
