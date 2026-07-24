import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { PROJECTS } from "@/lib/site-data";
import { SiteShell } from "@/components/site/chrome";
import {
  BigMarquee,
  Clientes,
  ProjectGrid,
  SectionHead,
  StatsGrid,
  useScrollReveal,
} from "@/components/site/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Backstage — Produção de Eventos no Rio de Janeiro" },
      {
        name: "description",
        content:
          "Backstage: quase 30 anos transformando ideias em eventos inesquecíveis — da maior árvore de natal flutuante do mundo ao Mickey na Baía de Guanabara.",
      },
      { property: "og:title", content: "Backstage — Boas ideias. Grandes realizações." },
      {
        property: "og:description",
        content:
          "Produtora carioca especializada em grandes eventos: cultura, esporte, entretenimento e experiências de marca.",
      },
      { property: "og:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
      { name: "twitter:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <BigMarquee />
      <Projetos />
      <Prova />
      <Clientes />
    </SiteShell>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  // parallax
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const y = Math.max(-80, Math.min(80, window.scrollY * 0.15));
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // word reveal on mount
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const t = window.setTimeout(() => el.classList.add("word-revealed"), 250);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-24">
      {/* background photo layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-y-[-10%] right-[-10%] w-[80%] will-change-transform"
          aria-hidden="true"
        >
          <img
            src="/projetos/hero-arvore.jpg"
            alt=""
            className="h-full w-full object-cover object-[65%_center] opacity-60"
            style={{
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(19,28,51,0.9),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stage-black to-transparent" />
      </div>
      <div className="spotlight-beam" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="reveal reveal-1 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Produtora de eventos · Rio de Janeiro
        </p>
        <h1
          ref={headlineRef}
          className="max-w-5xl font-display text-4xl leading-[1.02] text-warm-white sm:text-6xl lg:text-7xl"
        >
          <SplitWords text="Boas ideias." />
          <br />
          <span className="text-spotlight">
            <SplitWords text="Grandes realizações." startIndex={2} />
          </span>
        </h1>
        <p className="reveal reveal-3 mt-6 max-w-2xl text-base text-mist sm:text-lg">
          Há quase 30 anos transformando ideias em eventos inesquecíveis no Rio de Janeiro
          e no Brasil.
        </p>
        <div className="reveal reveal-4 mt-10 flex flex-wrap gap-3">
          <a
            href="#fale-conosco"
            className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-6 text-sm font-semibold text-stage-black"
          >
            Quero realizar um evento
            <ArrowRight size={18} />
          </a>
          <a
            href="#projetos"
            className="inline-flex min-h-12 items-center rounded-full border border-warm-white/25 px-6 text-sm font-semibold text-warm-white transition hover:border-spotlight hover:text-spotlight"
          >
            Ver projetos
          </a>
        </div>

        <a
          href="#como-fazemos"
          className="mt-16 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.28em] text-mist hover:text-spotlight"
        >
          Rolar para explorar
          <ArrowDown size={14} className="arrow-bob" />
        </a>
      </div>
    </section>
  );
}

/* ---------- Projetos (vitrine) ---------- */
function Projetos() {
  const ref = useScrollReveal();
  return (
    <section
      id="projetos"
      ref={ref}
      className="on-scroll scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Portfólio"
          title="30 anos de grandes realizações"
          aside="Do palco ao asfalto, da baía ao interior — uma seleção de projetos que atravessaram gerações."
        />
        <div className="mt-14">
          <ProjectGrid />
        </div>
      </div>
    </section>
  );
}

/* ---------- Prova ---------- */
function Prova() {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      className="on-scroll border-t border-border bg-night-blue/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Em números"
          title="A escala do que realizamos"
          aside="Produções que envolvem engenharia, arquitetura, logística e milhares de pessoas."
        />
        <StatsGrid />
        <div className="mt-14">
          <Link
            to="/estudio"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-spotlight"
          >
            Conheça o estúdio e o método
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
