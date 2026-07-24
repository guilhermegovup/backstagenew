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
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const hoveredRef = useRef(false);

  const items = PROJECTS;

  // entrance
  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // auto-cycle (touch / no interaction). Stops permanently on first hover.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (hoveredRef.current) return;
      setActive((a) => (a + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [items.length]);

  const current = items[active];

  return (
    <section id="top" className="relative overflow-hidden pt-24">
      {/* crossfade background stack */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {items.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {p.cardImage ? (
              <img
                src={i === 0 ? "/projetos/hero-arvore.jpg" : p.cardImage}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover ${i === active ? "hero-kenburns" : ""}`}
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(120% 90% at 30% 10%, #1A2340 0%, #131C33 45%, #0B0B10 100%)",
                }}
              />
            )}
          </div>
        ))}
        {/* legibility overlays */}
        <div className="absolute inset-0 bg-stage-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(19,28,51,0.85),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stage-black to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className={`hero-line ${entered ? "is-in" : ""} mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight`} style={{ transitionDelay: "0ms" }}>
          Produtora de eventos · Rio de Janeiro · Desde 1996
        </p>

        <h1
          className={`hero-line ${entered ? "is-in" : ""} mb-10 font-display text-2xl uppercase leading-[1.05] text-warm-white sm:text-3xl`}
          style={{ transitionDelay: "70ms" }}
        >
          Boas ideias. <span className="text-spotlight">Grandes realizações.</span>
        </h1>

        {/* project index — European agency style */}
        <nav aria-label="Projetos em destaque" onMouseLeave={() => { hoveredRef.current = false; }}>
          <ol className="flex flex-col">
            {items.map((p, i) => (
              <li key={p.slug} className={`hero-line ${entered ? "is-in" : ""}`} style={{ transitionDelay: `${140 + i * 70}ms` }}>
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  onMouseEnter={() => {
                    hoveredRef.current = true;
                    setActive(i);
                  }}
                  onFocus={() => {
                    hoveredRef.current = true;
                    setActive(i);
                  }}
                  className={`group flex min-h-11 items-baseline gap-4 border-b border-warm-white/10 py-3 transition-colors duration-300 sm:gap-6 ${
                    i === active ? "text-spotlight" : "text-warm-white/40 hover:text-warm-white"
                  }`}
                >
                  <span className="w-8 shrink-0 font-mono text-xs tracking-[0.2em] text-mist">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-2xl uppercase leading-none transition-transform duration-300 motion-reduce:transition-none sm:text-4xl lg:text-5xl ${
                      i === active ? "translate-x-2" : ""
                    }`}
                  >
                    {p.name}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* active meta — cinema caption */}
        <p className="mt-6 h-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-mist" aria-live="polite">
          {current.meta}
        </p>

        <div className={`hero-line ${entered ? "is-in" : ""} mt-10 flex flex-wrap items-center gap-3`} style={{ transitionDelay: "620ms" }}>
          <Link
            to="/contato"
            className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-6 text-sm font-semibold text-stage-black"
          >
            Quero realizar um evento
            <ArrowRight size={18} />
          </Link>
          <a
            href="#como-fazemos"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-mist transition hover:text-spotlight"
          >
            Rolar para explorar
            <ArrowDown size={14} className="arrow-bob" />
          </a>
        </div>
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
