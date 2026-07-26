import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SiteShell } from "@/components/site/chrome";
import {
  Clientes,
  ProjectRows,
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
      <Numeros />
      <Projetos />
      <Clientes />
      <Convite />
    </SiteShell>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="dark-hero relative flex min-h-[92vh] items-end overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/projetos/fotos/arvore.webp"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stage-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_40%,transparent_0%,rgba(11,11,16,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stage-black via-stage-black/80 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
        <p
          className={`hero-line ${entered ? "is-in" : ""} mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-spotlight sm:text-xs`}
          style={{ transitionDelay: "0ms" }}
        >
          Produtora de eventos · Rio de Janeiro · Desde 1996
        </p>

        <h1
          className={`hero-line ${entered ? "is-in" : ""} max-w-5xl font-display text-[2.6rem] uppercase leading-[0.92] text-warm-white sm:text-7xl lg:text-8xl`}
          style={{ transitionDelay: "90ms" }}
        >
          Boas ideias.
          <br />
          <span className="text-spotlight">Grandes realizações.</span>
        </h1>

        <p
          className={`hero-line ${entered ? "is-in" : ""} mt-8 max-w-xl text-base leading-relaxed text-warm-white/80 sm:text-lg`}
          style={{ transitionDelay: "180ms" }}
        >
          Há quase 30 anos transformando ideias em eventos inesquecíveis no Rio de Janeiro e
          em todo o Brasil.
        </p>

        <div
          className={`hero-line ${entered ? "is-in" : ""} mt-10 flex flex-wrap items-center gap-4`}
          style={{ transitionDelay: "270ms" }}
        >
          <Link
            to="/contato"
            className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-7 text-sm font-semibold text-stage-black"
          >
            Quero realizar um evento
            <ArrowRight size={18} />
          </Link>
          <a
            href="#projetos"
            className="inline-flex min-h-12 items-center rounded-full border border-warm-white/30 px-7 text-sm font-semibold text-warm-white transition hover:border-spotlight hover:text-spotlight"
          >
            Ver os projetos
          </a>
        </div>

        <a
          href="#projetos"
          className="mt-14 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-warm-white/50 transition hover:text-spotlight"
        >
          Rolar para explorar
          <ArrowDown size={13} className="arrow-bob" />
        </a>
      </div>
    </section>
  );
}

/* ---------- Números ---------- */
function Numeros() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="on-scroll border-y border-border bg-night-blue/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <StatsGrid />
      </div>
    </section>
  );
}

/* ---------- Projetos ---------- */
function Projetos() {
  const ref = useScrollReveal();
  return (
    <section id="projetos" ref={ref} className="on-scroll scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Portfólio"
          title="30 anos de grandes realizações"
          aside="Do palco ao asfalto, da baía ao interior — projetos que atravessaram gerações."
        />
        <div className="mt-16 sm:mt-24">
          <ProjectRows />
        </div>
      </div>
    </section>
  );
}

/* ---------- Convite ---------- */
function Convite() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl uppercase leading-[1.02] text-warm-white sm:text-5xl">
          Quer dar vida à sua ideia?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg">
          Não importa o tamanho do projeto, o nível de complexidade ou o orçamento disponível.
          Encontramos sempre a melhor forma de botar uma ideia de pé.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/contato"
            className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-7 text-sm font-semibold text-stage-black"
          >
            Fale conosco
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/estudio"
            className="inline-flex min-h-12 items-center rounded-full border border-warm-white/30 px-7 text-sm font-semibold text-warm-white transition hover:border-spotlight hover:text-spotlight"
          >
            Conheça o estúdio
          </Link>
        </div>
      </div>
    </section>
  );
}
