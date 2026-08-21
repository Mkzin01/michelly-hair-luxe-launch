import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
  Star,
  Quote,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Phone,
  ArrowUpRight,
} from "lucide-react";

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
import portfolioBalayage from "@/assets/mh/balayage-portfolio.png.asset.json";
import portfolioMorena from "@/assets/mh/morena-iluminada-portfolio.png.asset.json";
import portfolioMadeixas from "@/assets/mh/madeixas-new.png.asset.json";
import portfolioProgressiva from "@/assets/mh/progressiva-portfolio.png.asset.json";

const PHONE = "351920810339";
const PHONE_DISPLAY = "+351 920 810 339";
const WHATSAPP = `https://wa.me/${PHONE}`;
const INSTAGRAM = "https://www.instagram.com/michellyhair.pt?igsh=cTQ4cnltejVlcGpn";
const MAPS =
  "https://google.com/maps/place/Largo+Fernanda+Alves+4A/@38.6292462,-9.1992968,87a,90y,109.31h,75.04t/data=!3m5!1e1!3m3!1s9PjZVUZ07dvUHaTlvbMsVA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D9PjZVUZ07dvUHaTlvbMsVA%26w%3D900%26h%3D600%26ll%3D38.629246,-9.199297%26yaw%3D109.311424%26pitch%3D14.962830%26thumbfov%3D112%26cb_client%3Dgmm.iv.ios!4m6!3m5!1s0xd1ecaa8e612bf47:0xedbcb24680108752!8m2!3d38.6291158!4d-9.1988223!10e5";
const ADDRESS = "Largo Fernanda Alves 4A";
const CITY = "Charneca da Caparica";

const getWA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

/** Dados estruturados para o Google (aparece nas pesquisas e no Google Negócios). */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Michelly Hair",
  description:
    "Salão de beleza premium na Charneca da Caparica, especialista em alisamentos, madeixas, balayage e morena iluminada.",
  image: heroNovo.url,
  telephone: `+${PHONE}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: CITY,
    addressRegion: "Setúbal",
    addressCountry: "PT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 38.6291158, longitude: -9.1988223 },
  sameAs: [INSTAGRAM],
  priceRange: "€€",
  areaServed: ["Charneca da Caparica", "Costa da Caparica", "Almada", "Margem Sul"],
};

const services = [
  {
    name: "Balayage",
    img: balayage.url,
    desc: "Reflexos pintados à mão, luminosidade sob medida.",
  },
  {
    name: "Morena Iluminada",
    img: morena.url,
    desc: "Iluminação discreta que valoriza o tom natural.",
  },
  { name: "Alisamento", img: alisamento.url, desc: "Fios lisos, saudáveis e com movimento." },
  { name: "Madeixas", img: madeixas.url, desc: "Nuances precisas para um resultado refinado." },
  { name: "Coloração", img: coloracao.url, desc: "Cor personalizada com pigmentos premium." },
  { name: "Tratamentos", img: tratamentos.url, desc: "Rituais restauradores de alta performance." },
];

type PortfolioItem = { src: string; category: string; title: string; desc: string };
const portfolio: PortfolioItem[] = [
  {
    src: portfolioBalayage.url,
    category: "Balayage",
    title: "Balayage",
    desc: "Luminosidade e naturalidade em cada fio.",
  },
  {
    src: portfolioMorena.url,
    category: "Morena Iluminada",
    title: "Morena Iluminada",
    desc: "Contraste perfeito para realçar o seu tom.",
  },
  {
    src: portfolioMadeixas.url,
    category: "Madeixas",
    title: "Madeixas",
    desc: "Técnica precisa para um resultado sofisticado.",
  },
  {
    src: portfolioProgressiva.url,
    category: "Alisamento",
    title: "Alisamento",
    desc: "Liso impecável com brilho e saúde.",
  },
];

const testimonials = [
  {
    name: "Ana Ferreira",
    text: "Um atendimento impecável. Sinto que a Michelly entende exatamente o que quero antes mesmo de eu dizer.",
  },
  {
    name: "Carolina Sousa",
    text: "Meu cabelo nunca esteve tão saudável. Ambiente sofisticado e um resultado que superou todas as expectativas.",
  },
  {
    name: "Beatriz Almeida",
    text: "Confio de olhos fechados. Cada visita é uma experiência delicada, precisa e verdadeiramente premium.",
  },
  {
    name: "Mariana Costa",
    text: "Um verdadeiro ritual. Saio do salão sempre com o cabelo perfeito e a autoestima renovada.",
  },
  {
    name: "Rita Marques",
    text: "Detalhe, técnica e sensibilidade. A Michelly transformou por completo a minha relação com o meu cabelo.",
  },
  {
    name: "Sofia Pereira",
    text: "Ambiente acolhedor, atendimento refinado. É o único sítio onde confio o meu cabelo há mais de dois anos.",
  },
];

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Analisamos a saúde do fio, o histórico de químicas e o resultado que deseja.",
  },
  {
    n: "02",
    title: "Plano à medida",
    desc: "Definimos técnica, tom e número de sessões — sem surpresas, sem promessas vazias.",
  },
  {
    n: "03",
    title: "Execução",
    desc: "Aplicação cuidada com produtos premium e o tempo que cada cabelo realmente precisa.",
  },
  {
    n: "04",
    title: "Manutenção",
    desc: "Sai com a rotina certa em casa para o resultado durar muito para além do salão.",
  },
];

const faqs = [
  {
    q: "Preciso de fazer uma avaliação antes de agendar?",
    a: "Para Madeixas, Balayage ou Alisamentos recomendamos sempre uma consulta de avaliação, para analisarmos a saúde do fio e definirmos o melhor caminho antes de qualquer química.",
  },
  {
    q: "Quais os métodos de pagamento aceites?",
    a: "Aceitamos Numerário, MB Way e Transferência Bancária.",
  },
  {
    q: "Onde se localiza o salão?",
    a: "Estamos na Charneca da Caparica, no Largo Fernanda Alves 4A, com estacionamento fácil na zona. A poucos minutos da Costa da Caparica e de Almada.",
  },
  {
    q: "Quanto tempo demora um serviço de Alisamento?",
    a: "Consoante o comprimento e a densidade do cabelo, o alisamento pode demorar entre 3 a 5 horas — o tempo necessário para garantir um resultado impecável e seguro para o fio.",
  },
  {
    q: "Como faço a minha marcação?",
    a: "O agendamento é feito diretamente por WhatsApp. Envie-nos uma mensagem com o serviço pretendido e encontramos juntas o melhor horário.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michelly Hair — Cabeleireira na Charneca da Caparica | Alisamentos e Madeixas" },
      {
        name: "description",
        content:
          "Salão de beleza premium na Charneca da Caparica. Especialista em alisamentos, madeixas, balayage e morena iluminada. Marcações por WhatsApp.",
      },
      { name: "theme-color", content: "#FBF9F6" },
      { property: "og:title", content: "Michelly Hair — Salão de Beleza Premium" },
      {
        property: "og:description",
        content: "Transformando cabelos, elevando autoestima. Charneca da Caparica.",
      },
      { property: "og:image", content: heroNovo.url },
      { name: "twitter:image", content: heroNovo.url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  component: Landing,
});

/* ============================================================
   ÍCONES
   ============================================================ */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.65 1.44h.01c6.55 0 11.86-5.3 11.86-11.85 0-3.17-1.24-6.15-3.4-8.43ZM12.06 21.6h-.01a9.72 9.72 0 0 1-4.96-1.36l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.7 9.7 0 0 1-1.49-5.1c0-5.37 4.38-9.74 9.76-9.74 2.6 0 5.05 1.02 6.9 2.86a9.7 9.7 0 0 1 2.85 6.89c0 5.37-4.38 9.74-9.67 9.74Zm5.6-7.29c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.79 1-.97 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.53-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.54.08-.83.39-.28.31-1.09 1.06-1.09 2.59s1.12 3 1.28 3.21c.15.2 2.2 3.36 5.33 4.71.75.32 1.33.52 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.6-.36Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Monograma MH desenhado em SVG — usado no cabeçalho e no rodapé. */
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

/* ============================================================
   PRIMITIVAS DE SECÇÃO
   ============================================================ */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl text-left"}`}>
      <span className="eyebrow text-gold-deep">
        {centered && <span className="gold-line mr-3" />}
        {eyebrow}
        {centered && <span className="gold-line ml-3" />}
      </span>
      <h2 className="display-lg mt-5 text-balance text-ink">{title}</h2>
      {subtitle && (
        <p
          className={`mt-5 text-pretty text-[15px] leading-[1.8] text-muted-foreground ${centered ? "mx-auto max-w-lg" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal(dependency?: unknown) {
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
  }, [dependency]);
}

/** Progresso de leitura da página (barra fina no topo). */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function AnimatedNumber({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ============================================================
   ANTES / DEPOIS — cortina arrastável
   ============================================================ */
function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      moveTo(clientX);
    };
    const onEnd = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [moveTo]);

  const startDrag = () => {
    draggingRef.current = true;
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => moveTo(e.clientX)}
      className="group relative aspect-[4/5] w-full cursor-col-resize overflow-hidden rounded-[24px] shadow-[var(--shadow-lift)] sm:aspect-[16/10] md:rounded-[32px]"
    >
      {/* Depois — camada de fundo */}
      <img
        src={after}
        alt="Depois da transformação"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Antes — recortado pela cortina */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt="Antes da transformação"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Pega */}
      <div
        role="slider"
        aria-label="Comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="absolute inset-y-0 z-30 w-11 -translate-x-1/2 cursor-col-resize"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/90 shadow-[0_0_18px_rgba(0,0,0,0.35)]" />
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/20 text-white shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
          <ChevronLeft className="-mr-1 h-4 w-4" strokeWidth={2.5} />
          <ChevronRight className="-ml-1 h-4 w-4" strokeWidth={2.5} />
        </div>
      </div>

      <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-black/35 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-gold px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink shadow-lg">
        Depois
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/80 opacity-90 transition-opacity duration-500 group-hover:opacity-0">
        Arraste para comparar
      </span>
    </div>
  );
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
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
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.12_0.01_55)]/96 backdrop-blur-lg"
      onClick={onClose}
    >
      <button
        aria-label="Fechar"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:right-8 md:top-8"
      >
        <X className="h-4 w-4" />
      </button>
      <button
        aria-label="Anterior"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        className="absolute left-3 z-10 hidden h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:grid md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Próximo"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        className="absolute right-3 z-10 hidden h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15 md:grid md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
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
          className="zoom-in max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          draggable={false}
        />
        <figcaption className="mt-5 text-center">
          <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
            {current.category}
          </div>
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

/* ============================================================
   FAQ — acordeão
   ============================================================ */
function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`reveal overflow-hidden rounded-2xl border transition-colors duration-500 ${
        open
          ? "border-gold/45 bg-card shadow-[var(--shadow-soft)]"
          : "border-border bg-card/50 hover:border-gold/30"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
      >
        <h3 className="font-serif text-[1.1rem] leading-snug text-ink md:text-[1.3rem]">{q}</h3>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
            open ? "rotate-45 border-gold bg-gold text-ink" : "border-border text-gold-deep"
          }`}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-[14px] leading-[1.8] text-muted-foreground md:px-7 md:pb-7 md:text-[15px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PÁGINA
   ============================================================ */
function Landing() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useReveal(activeCategory);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const filtered = useMemo(
    () =>
      activeCategory === "Todos"
        ? portfolio
        : portfolio.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(portfolio.map((p) => p.category)))],
    [],
  );

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
      {/* ---------- Cabeçalho ---------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/60 bg-background/92 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Michelly Hair — início"
          >
            <Monogram
              className={`h-9 w-9 transition-colors duration-500 md:h-10 md:w-10 ${scrolled ? "text-gold-deep" : "text-white/90"}`}
            />
            <span
              className={`font-serif text-[21px] leading-none tracking-[-0.02em] transition-colors duration-500 md:text-[23px] ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              Michelly <span className={scrolled ? "text-gold-deep" : "text-gold"}>Hair</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav
              .filter((n) => n.label !== "FAQ")
              .map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className={`text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold ${
                    scrolled ? "text-ink/70" : "text-white/85"
                  }`}
                >
                  {n.label}
                </a>
              ))}
            <a
              href={getWA("Olá Michelly! Gostaria de agendar um serviço no salão.")}
              target="_blank"
              rel="noreferrer"
              className={`btn-pill btn-premium h-10 w-auto px-6 text-[9px] ${
                scrolled
                  ? "btn-gold"
                  : "border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-ink"
              }`}
            >
              Agendar
            </a>
          </nav>

          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className={`tap-safe grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 hover:scale-105 md:hidden ${
              scrolled
                ? "border-border text-ink hover:bg-bege"
                : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Barra de progresso de leitura */}
        <div
          className={`h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* ---------- Menu mobile ---------- */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{
          background: "color-mix(in oklab, oklch(0.15 0.012 52) 94%, transparent)",
          backdropFilter: "blur(28px) saturate(140%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <span className="flex items-center gap-2.5 font-serif text-[21px] tracking-[-0.02em] text-white">
            <Monogram className="h-9 w-9 text-gold" />
            Michelly <span className="text-gold">Hair</span>
          </span>
          <button
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="tap-safe grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-all hover:scale-105 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 pt-14 text-center">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-[2.1rem] leading-none tracking-tight text-white/90 transition-all duration-500 hover:text-gold ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-4 h-px w-16 bg-gold/60" />
          <a
            href={getWA("Olá Michelly! Gostaria de agendar um serviço no salão.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-pill btn-premium btn-gold mt-2 h-12"
          >
            <WhatsAppIcon className="h-4 w-4" /> Agendar
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-white/60 hover:text-gold"
          >
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>

      {/* ---------- Hero ---------- */}
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
        <img
          src={heroNovo.url}
          alt="Salão Michelly Hair na Charneca da Caparica"
          fetchPriority="high"
          loading="eager"
          className="ken-burns absolute inset-0 h-full w-full object-cover object-[32%_center] md:object-[70%_center]"
          draggable={false}
        />

        {/* Camadas de contraste */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,14,8,0.62) 0%, rgba(20,14,8,0.14) 40%, rgba(20,14,8,0.30) 68%, rgba(20,14,8,0.80) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[rgba(20,14,8,0.72)] via-[rgba(20,14,8,0.18)] to-transparent md:block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(20,14,8,0.42)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pb-28 pt-28 md:grid md:grid-cols-12 md:items-center md:px-10 md:pb-24 md:pt-32">
          <div className="w-full md:col-span-7 lg:col-span-6">
            {/* Selo de confiança */}
            <div
              className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-xl md:gap-3 md:px-4 md:py-2"
              style={{ animationDelay: "80ms" }}
            >
              <span className="flex items-center gap-1.5 border-r border-white/25 pr-2.5 md:pr-3">
                <Star className="h-3 w-3 fill-gold text-gold md:h-3.5 md:w-3.5" strokeWidth={0} />
                <span className="text-[10px] font-semibold text-white md:text-[0.72rem]">5.0</span>
              </span>
              <MapPin className="h-3 w-3 text-gold md:h-3.5 md:w-3.5" />
              <span className="whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.16em] text-white/95 sm:tracking-[0.24em] md:text-[0.7rem] md:tracking-[0.3em]">
                {CITY}
                <span className="hidden sm:inline"> · Margem Sul</span>
              </span>
            </div>

            <h1
              className="hero-rise mt-6 text-balance text-white md:mt-8"
              style={{ animationDelay: "240ms" }}
            >
              <span className="display-xl block drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                Michelly Hair
              </span>
              <span className="mt-2 block font-serif text-[1.35rem] font-light italic leading-tight text-gold-soft drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:text-[1.8rem] md:mt-3 md:text-[2.2rem]">
                Alisamentos & Madeixas na {CITY}
              </span>
            </h1>

            <p
              className="hero-rise mt-5 max-w-md text-pretty text-[13.5px] leading-[1.85] text-white/85 md:mt-7 md:text-[15.5px]"
              style={{ animationDelay: "440ms" }}
            >
              Balayage, morena iluminada, alisamentos e tratamentos personalizados — técnica precisa
              para realçar a beleza natural de cada cliente.
            </p>

            {/* Ações */}
            <div className="mt-7 md:mt-9">
              <a
                href={getWA("Olá Michelly! Gostaria de mais informações.")}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-premium btn-gold hero-rise h-[3.25rem] max-w-none sm:max-w-[22rem]"
                style={{ animationDelay: "620ms" }}
              >
                <WhatsAppIcon className="h-4 w-4" /> Agendar no WhatsApp
              </a>

              <div
                className="hero-rise mt-3 flex gap-3 sm:max-w-[22rem]"
                style={{ animationDelay: "740ms" }}
              >
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-premium h-12 flex-1 border border-white/40 bg-white/8 text-[9px] tracking-[0.2em] text-white backdrop-blur-md hover:bg-white hover:text-ink"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-premium h-12 flex-1 border border-white/40 bg-white/8 text-[9px] tracking-[0.2em] text-white backdrop-blur-md hover:bg-white hover:text-ink"
                >
                  <MapPin className="h-4 w-4" /> Direções
                </a>
              </div>
            </div>

            <a
              href="#sobre"
              aria-label="Ver mais"
              className="hero-rise mt-8 inline-flex flex-col items-center gap-1 text-white/75 transition-colors hover:text-gold md:mt-10"
              style={{ animationDelay: "900ms" }}
            >
              <span className="text-[9px] font-medium uppercase tracking-[0.32em]">Descobrir</span>
              <ChevronDown className="arrow-float h-4 w-4 text-gold" strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Faixa de especialidades ---------- */}
      <section
        aria-label="Especialidades"
        className="grain relative overflow-hidden border-y border-gold/15 bg-ink py-4 md:py-5"
      >
        <div className="marquee-mask">
          <div className="marquee-track items-center gap-10 md:gap-14">
            {[...services, ...services].map((s, i) => (
              <span key={`${s.name}-${i}`} className="flex shrink-0 items-center gap-10 md:gap-14">
                <span className="whitespace-nowrap font-serif text-[1.05rem] italic text-white/80 md:text-[1.3rem]">
                  {s.name}
                </span>
                <Sparkles className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.2} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Sobre ---------- */}
      <section id="sobre" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-20">
          <div className="reveal-scale order-2 md:order-1">
            <div className="group relative">
              {/* Moldura dourada deslocada */}
              <div className="pointer-events-none absolute -bottom-4 -left-4 h-full w-full rounded-[24px] border border-gold/35 md:-bottom-6 md:-left-6 md:rounded-[32px]" />
              <div className="relative overflow-hidden rounded-[24px] shadow-[var(--shadow-lift)] md:rounded-[32px]">
                <img
                  src={especialista.url}
                  alt="Michelly a atender uma cliente no salão"
                  loading="lazy"
                  className="img-zoom w-full object-cover"
                  style={{ height: "clamp(300px, 48vw, 540px)" }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/20 md:rounded-[32px]" />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <SectionHeading
              align="left"
              eyebrow="Sobre o salão"
              title={
                <>
                  Um cuidado pensado
                  <br />
                  <span className="italic text-gold-deep">para cada mulher.</span>
                </>
              }
              subtitle="Cada visita ao Michelly Hair é uma experiência exclusiva — escuta atenta, técnica precisa e um cuidado artesanal do diagnóstico ao último toque."
            />

            {/* Números */}
            <div className="reveal mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 md:mt-12 md:gap-10">
              {[
                {
                  icon: <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.3} />,
                  value: 300,
                  suffix: "+",
                  label: "Clientes transformadas",
                },
                {
                  icon: <Heart className="h-4 w-4 text-gold" strokeWidth={1.3} />,
                  value: 100,
                  suffix: "%",
                  label: "Atendimento personalizado",
                },
              ].map((s) => (
                <div key={s.label} className="group">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="h-px w-6 bg-gold/40 transition-all duration-500 group-hover:w-10" />
                  </div>
                  <div className="mt-3 font-serif text-[2.6rem] leading-none tracking-tight text-ink md:text-[3.4rem]">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={getWA("Olá Michelly! Gostaria de agendar uma avaliação para o meu cabelo.")}
              target="_blank"
              rel="noreferrer"
              className="link-underline reveal mt-10 text-[11px] font-medium uppercase tracking-[0.28em] text-ink"
            >
              Agende a sua avaliação <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Serviços ---------- */}
      <section id="servicos" className="grain relative bg-bege/40 py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Serviços"
            title={
              <>
                Especialista em <span className="italic text-gold-deep">alisamentos</span> e
                madeixas
              </>
            }
            subtitle="Técnicas premium de balayage e morena iluminada, com produtos de alta performance e acompanhamento personalizado."
          />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-16 lg:grid-cols-3 lg:gap-6">
            {services.map((s, i) => (
              <article
                key={s.name}
                className="reveal-scale group relative overflow-hidden rounded-[18px] bg-ink shadow-[var(--shadow-soft)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] md:rounded-[24px]"
                style={{ transitionDelay: `${(i % 3) * 90}ms`, aspectRatio: "4 / 5" }}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="img-zoom absolute inset-0 h-full w-full object-cover opacity-95"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,14,8,0.88)] via-[rgba(20,14,8,0.25)] to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/10 md:rounded-[24px]" />

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <h3 className="font-serif text-[1.05rem] leading-tight text-white md:text-[1.45rem]">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 hidden text-[12.5px] leading-snug text-white/75 sm:block">
                    {s.desc}
                  </p>
                  <div className="mt-2.5 h-px w-8 bg-gold transition-all duration-700 group-hover:w-16" />
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-10 flex justify-center md:mt-14">
            <Link
              to="/servicos"
              className="link-underline text-[11px] font-medium uppercase tracking-[0.28em] text-ink"
            >
              Ver todos os serviços <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- A experiência ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="A experiência"
          title={
            <>
              Do diagnóstico ao <span className="italic text-gold-deep">último toque</span>
            </>
          }
          subtitle="Um método claro, pensado para proteger a saúde do fio e garantir que o resultado é exatamente o que imaginou."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:rounded-[28px]">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group bg-background p-6 transition-colors duration-500 hover:bg-bege/50 md:p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-serif text-[2.4rem] leading-none text-gold/35 transition-colors duration-500 group-hover:text-gold/70 md:text-[3rem]">
                {s.n}
              </span>
              <h3 className="mt-4 font-serif text-[1.25rem] text-ink md:text-[1.4rem]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.75] text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Antes & Depois ---------- */}
      <section className="grain relative overflow-hidden bg-ink py-16 text-white md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 15% 20%, rgba(197,160,101,0.28), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(197,160,101,0.16), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 md:px-10">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow text-gold">
              <span className="gold-line mr-3" />
              Resultados
              <span className="gold-line ml-3" />
            </span>
            <h2 className="display-lg mt-5 text-white">Antes & Depois</h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.8] text-white/70">
              Transformações reais assinadas por Michelly Hair. Arraste a barra para ver a
              diferença.
            </p>
          </div>

          <div className="reveal-scale mt-12 md:mt-16">
            <ComparisonSlider before={antes.url} after={depois.url} />
          </div>
        </div>
      </section>

      {/* ---------- Portfólio ---------- */}
      <section id="portfolio" className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Portfólio"
            title={
              <>
                Trabalhos assinados por{" "}
                <span className="whitespace-nowrap italic text-gold-deep">Michelly Hair</span>
              </>
            }
            subtitle="Uma seleção editorial de transformações reais feitas no salão."
          />

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-14 md:gap-3">
            {categories.map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] transition-all duration-500 md:px-5 md:text-[11px] md:tracking-[0.26em] ${
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

          <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
            {filtered.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Abrir ${item.title}`}
                className="reveal-scale group relative block w-full overflow-hidden rounded-[16px] bg-bege/40 shadow-[var(--shadow-soft)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] md:rounded-[22px]"
                style={{ aspectRatio: "3 / 4", transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="img-zoom absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[rgba(20,14,8,0.85)] via-[rgba(20,14,8,0.25)] to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10 md:rounded-[22px]" />

                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 md:h-9 md:w-9">
                  <Plus className="h-3.5 w-3.5" />
                </span>

                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 p-3 text-left md:p-5">
                  <span className="text-[8px] font-medium uppercase tracking-[0.26em] text-gold md:text-[9.5px] md:tracking-[0.3em]">
                    {item.category}
                  </span>
                  <span className="font-serif text-[15px] leading-tight text-white md:text-[21px]">
                    {item.title}
                  </span>
                  <span className="hidden text-[12px] leading-snug text-white/75 md:block">
                    {item.desc}
                  </span>
                </figcaption>
              </button>
            ))}
          </div>

          <div className="reveal mt-10 flex justify-center">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-[11px] font-medium uppercase tracking-[0.28em] text-ink"
            >
              Ver mais no Instagram <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
            </a>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndex={setLightboxIndex}
        />
      )}

      {/* ---------- Avaliações ---------- */}
      <section id="avaliacoes" className="grain relative bg-bege/40 py-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="reveal px-5 text-center md:px-10">
            <span className="eyebrow text-gold-deep">
              <span className="gold-line mr-3" />
              Avaliações
              <span className="gold-line ml-3" />
            </span>
            <div className="mt-5 flex items-center justify-center gap-1.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-current md:h-6 md:w-6" strokeWidth={0} />
              ))}
            </div>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="font-serif text-[3rem] leading-none tracking-tight text-ink md:text-[4rem]">
                5.0
              </span>
              <span className="eyebrow text-ink/70">Google Reviews</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
              Mais de <span className="text-ink">300 clientes satisfeitas</span> ao longo dos anos.
            </p>
          </div>

          <div className="reveal relative mt-12 md:mt-16">
            <div
              ref={testimonialsRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:gap-6 md:px-10"
              style={{ scrollBehavior: "smooth" }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="lux-card shrink-0 snap-center rounded-3xl p-7 md:p-9"
                  style={{ width: "min(86vw, 380px)" }}
                >
                  <Quote className="h-7 w-7 text-gold/55" strokeWidth={1.1} />
                  <p className="mt-4 font-serif text-[17px] italic leading-[1.7] text-foreground/85 md:text-[18.5px]">
                    “{t.text}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-gold/60" />
                    <span className="eyebrow text-ink">{t.name}</span>
                  </div>
                  <div className="mt-3 flex gap-0.5 text-gold">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                aria-label="Avaliação anterior"
                onClick={() =>
                  testimonialsRef.current?.scrollBy({ left: -360, behavior: "smooth" })
                }
                className="tap-safe grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Próxima avaliação"
                onClick={() => testimonialsRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                className="tap-safe grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="FAQ"
          title="Dúvidas frequentes"
          subtitle="Tudo o que precisa de saber para a sua próxima visita."
        />
        <div className="mt-10 space-y-3 md:mt-14">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ---------- Visite-nos ---------- */}
      <section id="contacto" className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-28">
        <div className="reveal-scale overflow-hidden rounded-[24px] border border-border bg-card shadow-[var(--shadow-soft)] md:rounded-[32px]">
          <div className="grid md:grid-cols-2">
            <div className="p-7 md:p-12">
              <span className="eyebrow text-gold-deep">Visite-nos</span>
              <h2 className="display-md mt-4 text-ink">
                Estamos à sua espera na <span className="italic text-gold-deep">{CITY}</span>
              </h2>

              <ul className="mt-8 space-y-5 text-[14px] text-muted-foreground">
                <li className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>
                    <span className="block text-ink">{ADDRESS}</span>
                    {CITY}, Portugal
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <a className="transition-colors hover:text-gold-deep" href={`tel:+${PHONE}`}>
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>
                    <span className="block text-ink">Atendimento por marcação</span>
                    Reserve o seu horário por WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a
                    className="transition-colors hover:text-gold-deep"
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @michellyhair.pt
                  </a>
                </li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWA(
                    "Olá Michelly! Estou pronta para a minha transformação. Gostaria de agendar um horário.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-premium btn-gold h-12 sm:max-w-[15rem]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Agendar
                </a>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-premium h-12 border border-ink/15 text-ink hover:border-gold hover:bg-bege/60 sm:max-w-[13rem]"
                >
                  <MapPin className="h-4 w-4" /> Direções
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] border-t border-border md:min-h-full md:border-l md:border-t-0">
              <iframe
                title="Mapa — Michelly Hair, Charneca da Caparica"
                src="https://www.google.com/maps?q=Largo+Fernanda+Alves+4A,+Charneca+da+Caparica&output=embed"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 20% 25%, rgba(197,160,101,0.34), transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(197,160,101,0.2), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:px-10 md:py-24">
          <div className="reveal">
            <span className="eyebrow text-white/55">
              <span className="gold-line mr-3" />
              Agende agora
              <span className="gold-line ml-3" />
            </span>
            <h2 className="display-lg mt-5 text-balance text-white">
              A sua próxima <span className="italic text-gold">transformação</span> começa aqui.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-[1.8] text-white/70">
              Reserve o seu horário e descubra o cuidado exclusivo do Michelly Hair.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={getWA(
                  "Olá Michelly! Estou pronta para a minha transformação. Gostaria de agendar um horário.",
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-premium btn-gold"
              >
                <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Rodapé ---------- */}
      <footer className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <Monogram className="h-10 w-10 text-gold-deep" />
                <span className="font-serif text-[21px] text-ink">
                  Michelly <span className="text-gold-deep">Hair</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-[13px] leading-[1.75] text-muted-foreground">
                Salão premium especializado em coloração, iluminados, alisamentos e tratamentos
                exclusivos na {CITY}.
              </p>
              <div className="mt-6 flex gap-2.5">
                {[
                  { href: WHATSAPP, label: "WhatsApp", icon: <WhatsAppIcon className="h-4 w-4" /> },
                  {
                    href: INSTAGRAM,
                    label: "Instagram",
                    icon: <InstagramIcon className="h-4 w-4" />,
                  },
                  {
                    href: MAPS,
                    label: "Localização",
                    icon: <MapPin className="h-[15px] w-[15px]" />,
                  },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={l.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:bg-bege/50 hover:text-gold-deep"
                  >
                    {l.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow text-[0.6rem]">Navegação</span>
              <ul className="mt-4 space-y-2.5 text-[13px] text-muted-foreground">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="transition-colors hover:text-gold-deep">
                      {n.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/servicos" className="transition-colors hover:text-gold-deep">
                    Todos os serviços
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="eyebrow text-[0.6rem]">Contacto</span>
              <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/80" />
                  <span>
                    {ADDRESS}
                    <br />
                    {CITY}, Portugal
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 text-gold/80" />
                  <a
                    className="transition-colors hover:text-gold-deep"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0 text-gold/80" />
                  <a
                    className="transition-colors hover:text-gold-deep"
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @michellyhair.pt
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-[10.5px] text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Michelly Hair. Todos os direitos reservados.</p>
            <p className="eyebrow text-[0.58rem]">{CITY} · Margem Sul</p>
          </div>
        </div>
      </footer>

      {/* Espaço para a barra fixa em telemóvel */}
      <div className="h-[72px] md:hidden" />

      {/* ---------- Barra de ação fixa (telemóvel) ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
        <div className="flex gap-2.5">
          <a
            href={getWA("Olá Michelly! Gostaria de agendar um serviço no salão.")}
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-premium btn-gold h-12 flex-[1.6] text-[9.5px] tracking-[0.2em]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Agendar
          </a>
          <a
            href={MAPS}
            target="_blank"
            rel="noreferrer"
            aria-label="Como chegar"
            className="btn-pill btn-premium h-12 flex-1 border border-ink/15 text-[9.5px] tracking-[0.2em] text-ink"
          >
            <MapPin className="h-4 w-4" /> Direções
          </a>
        </div>
      </div>

      {/* ---------- WhatsApp flutuante (desktop) ---------- */}
      <a
        href={getWA("Olá Michelly! Gostaria de tirar uma dúvida sobre os serviços do salão.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_34px_-6px_rgba(37,211,102,0.45)] transition-all duration-500 hover:scale-110 md:flex"
      >
        <span className="pulse-ring absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
