import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as morena_iluminada_jpg_asset_default, i as madeixas_jpg_asset_default, n as balayage_jpg_asset_default, o as tratamentos_jpg_asset_default, r as coloracao_jpg_asset_default, t as alisamento_jpg_asset_default } from "./tratamentos.jpg.asset-D8jepfHG.mjs";
import { d as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/servicos-DCQxBwfQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var services = [
	{
		name: "Balayage",
		img: balayage_jpg_asset_default.url,
		desc: "Reflexos naturais pintados à mão, com luminosidade sob medida e transições suaves."
	},
	{
		name: "Morena Iluminada",
		img: morena_iluminada_jpg_asset_default.url,
		desc: "Iluminação discreta que valoriza o tom natural, mantendo a raiz preservada."
	},
	{
		name: "Alisamento",
		img: alisamento_jpg_asset_default.url,
		desc: "Fios lisos, saudáveis e com movimento — técnica adaptada ao seu tipo de cabelo."
	},
	{
		name: "Madeixas",
		img: madeixas_jpg_asset_default.url,
		desc: "Nuances precisas com papel alumínio para um resultado refinado e duradouro."
	},
	{
		name: "Coloração",
		img: coloracao_jpg_asset_default.url,
		desc: "Cor personalizada com pigmentos premium, cobertura perfeita e brilho intenso."
	},
	{
		name: "Tratamentos Capilares",
		img: tratamentos_jpg_asset_default.url,
		desc: "Rituais restauradores de alta performance para reconstruir e nutrir os fios."
	}
];
function ServicosPage() {
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "font-serif text-xl tracking-[0.02em] text-ink md:text-2xl",
				children: ["Michelly", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold",
					children: " Hair"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:text-gold md:text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Voltar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-5 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "eyebrow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-line mr-3" }),
								"Serviços",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-line ml-3" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-serif text-4xl leading-tight tracking-[-0.015em] text-ink md:text-[3.25rem]",
							children: [
								"Todos os nossos",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-gold",
									children: "cuidados exclusivos."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[15px] leading-relaxed text-muted-foreground",
							children: "Cada serviço é executado com técnica refinada, produtos premium e um cuidado artesanal do diagnóstico ao último toque."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3",
					children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group relative overflow-hidden rounded-2xl bg-card shadow-[0_10px_30px_-22px_rgba(0,0,0,0.2)] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.28)] sm:rounded-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center overflow-hidden rounded-t-2xl bg-bege/40 sm:rounded-t-3xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.img,
								alt: s.name,
								loading: "lazy",
								className: "h-[180px] w-full object-contain object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] sm:h-auto sm:object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-4 text-center sm:px-6 sm:py-5 sm:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-[1.05rem] leading-tight tracking-tight text-ink sm:text-[1.3rem]",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-[12.5px] leading-snug text-muted-foreground sm:text-[13.5px]",
									children: s.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2.5 h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16 sm:mx-0 sm:w-8" })
							]
						})]
					}, s.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://wa.me/351920810339",
						target: "_blank",
						rel: "noreferrer",
						className: "btn-pill bg-gold text-ink shadow-[0_18px_50px_-14px_rgba(184,144,80,0.7)] hover:bg-gold-soft",
						children: "Agendar pelo WhatsApp"
					})
				})
			]
		})]
	});
}
//#endregion
export { ServicosPage as component };
