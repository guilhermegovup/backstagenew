import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { STEPS, TIMELINE } from "@/lib/site-data";
import { SiteShell } from "@/components/site/chrome";
import { StatsGrid, useScrollReveal } from "@/components/site/bits";

export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "Estúdio — Backstage Produções" },
      {
        name: "description",
        content:
          "Quem somos, como trabalhamos e os marcos de quase 30 anos produzindo eventos culturais, esportivos, empresariais e de entretenimento no Rio de Janeiro.",
      },
      { property: "og:title", content: "Estúdio — Backstage Produções" },
      {
        property: "og:description",
        content: "Equipe multidisciplinar, método de produção e 30 anos de história.",
      },
      { property: "og:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
    ],
  }),
  component: Estudio,
});

function Estudio() {
  return (
    <SiteShell>
      <PageHeader />
      <Manifesto />
      <QuemSomos />
      <ComoFazemos />
      <Timeline />
      <VideoSection />
    </SiteShell>
  );
}

function PageHeader() {
  return (
    <header className="border-b border-border pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Estúdio
        </p>
        <h1 className="max-w-4xl font-display text-4xl uppercase leading-[0.98] text-warm-white sm:text-6xl lg:text-7xl">
          Quem faz acontecer
        </h1>
        <p className="mt-6 max-w-2xl text-base text-mist sm:text-lg">
          Engenheiros, arquitetos, comunicólogos e designers reunidos para botar ideias de pé —
          há quase 30 anos.
        </p>
      </div>
    </header>
  );
}

/* ---------- Manifesto ---------- */
function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = "Tudo que é sonhado pode ser realizado.".split(" ");
  return (
    <section className="border-t border-border py-28 sm:py-40">
      <div ref={ref} className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Manifesto
        </p>
        <h2 className="font-display text-4xl uppercase leading-[1.02] sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className={`manifesto-word mr-3 inline-block ${on ? "on" : ""}`}
              style={{ ["--i" as string]: `${i}` } as React.CSSProperties}
            >
              {w}
            </span>
          ))}
        </h2>
        <p className="mt-8 text-sm text-mist">— Do manifesto Backstage</p>
      </div>
    </section>
  );
}

/* ---------- Quem Somos ---------- */
function QuemSomos() {
  const ref = useScrollReveal();
  return (
    <section id="quem-somos" ref={ref} className="on-scroll border-t border-border bg-night-blue/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
              Quem somos
            </p>
            <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
              Uma produtora feita de gente apaixonada por realizar.
            </h2>
          </div>
          <div className="space-y-5 text-base text-mist sm:text-lg lg:col-span-7">
            <p className="text-warm-white">
              Somos a produtora que transforma boas ideias em grandes realizações.
            </p>
            <p>
              Em quase 30 anos de história, produzimos eventos culturais, esportivos,
              empresariais e de entretenimento para todos os gostos e idades.
            </p>
            <p>
              Acreditamos que tudo que é sonhado, pode ser realizado, seja a maior árvore
              de natal flutuante do mundo ou uma visita do Mickey Mouse à baía de
              Guanabara. Não importa o tamanho do projeto, o nível de complexidade ou o
              orçamento disponível, encontramos sempre a melhor forma de botar uma ideia
              de pé.
            </p>
            <p>
              Nossa equipe é multidisciplinar — formada por engenheiros, arquitetos,
              comunicólogos e designers — e apaixonada, garantindo a capacidade técnica e a
              dedicação necessárias para que seu evento obtenha êxito em todos os pontos
              de contato.
            </p>
            <p>
              Aqui, os clientes dos nossos parceiros são prioridade. Por isso, nos
              entregamos de coração para executar com perfeição cada detalhe, construindo
              a experiência ideal para fortalecer as relações da sua marca com o público.
              Essa é nossa maior métrica de sucesso.
            </p>
            <p className="text-warm-white">Quer dar vida à sua ideia? Pode contar com a gente.</p>
          </div>
        </div>

        <StatsGrid />
      </div>
    </section>
  );
}

/* ---------- Como Fazemos ---------- */
function ComoFazemos() {
  const ref = useScrollReveal();
  return (
    <section id="como-fazemos" ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
              Como fazemos
            </p>
            <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
              Da ideia ao aplauso.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base text-mist sm:text-lg">
              A ideia é a matéria-prima para todo grande feito. Seja para criar um projeto do
              zero ou resolver o desafio de um cliente, nossa equipe criativa está sempre pronta
              para encontrar a solução. A história é feita de grandes conquistas. Para nós, toda
              expectativa pode (e deve) ser superada. Queremos fazer história com cada projeto.
              Afinal, toda ideia pode ser uma grande realização.
            </p>
          </div>
        </div>

        <ol className="stagger mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, title, desc, Icon }, i) => (
            <li
              key={n}
              style={{ ["--i" as string]: `${i}` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-2xl border border-border bg-night-blue p-6 transition hover:-translate-y-1 hover:border-spotlight/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-spotlight">{n}</span>
                <Icon size={22} className="text-warm-white/70 transition group-hover:text-spotlight" />
              </div>
              <h3 className="mt-6 font-display text-xl text-warm-white">{title}</h3>
              <p className="mt-3 text-sm text-mist">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Linha do tempo ---------- */
function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = ref.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      fill.style.setProperty("--p", `${p}`);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="linha-do-tempo" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Nossa história
        </p>
        <h2 className="max-w-3xl font-display text-3xl text-warm-white sm:text-5xl">
          30 anos de grandes realizações.
        </h2>

        <div ref={ref} className="timeline relative mt-16">
          <div ref={fillRef} className="timeline-fill" />
          <ul className="space-y-14 md:space-y-24">
            {TIMELINE.map((item, i) => {
              const rightSide = i % 2 === 1;
              return (
                <li key={item.year} className="relative">
                  <div className="grid grid-cols-[36px_1fr] gap-4 md:grid-cols-2 md:gap-16">
                    {/* Dot column (mobile) / left content (desktop) */}
                    <div className="md:hidden">
                      <TimelineDot />
                    </div>
                    {/* Desktop left cell */}
                    <div className={`hidden md:block ${rightSide ? "" : "md:pr-16 md:text-right"}`}>
                      {!rightSide && <TimelineItem item={item} align="right" />}
                    </div>
                    {/* Desktop right cell */}
                    <div className={`hidden md:block ${rightSide ? "md:pl-16" : ""}`}>
                      {rightSide && <TimelineItem item={item} align="left" />}
                    </div>
                    {/* Mobile content */}
                    <div className="md:hidden">
                      <TimelineItem item={item} align="left" />
                    </div>
                  </div>
                  {/* Center dot (desktop) */}
                  <div className="pointer-events-none absolute left-1/2 top-2 hidden -translate-x-1/2 md:block">
                    <TimelineDot />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TimelineDot() {
  return (
    <span className="block h-3 w-3 rounded-full border-2 border-spotlight bg-stage-black" />
  );
}

function TimelineItem({
  item,
  align,
}: {
  item: { year: string; text: string; cta?: boolean };
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "md:items-end" : ""}>
      <p
        aria-hidden="true"
        className="font-display text-5xl uppercase leading-none tracking-tight sm:text-7xl"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(245, 185, 66, 0.7)",
        }}
      >
        {item.year}
      </p>
      <p className="mt-3 max-w-sm text-base text-warm-white sm:text-lg">
        {item.text}
      </p>
      {item.cta && (
        <a
          href="#fale-conosco"
          className="btn-primary mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black"
        >
          Comece com a gente
          <ArrowRight size={16} />
        </a>
      )}
    </div>
  );
}

/* ---------- Vídeo ---------- */
function VideoSection() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Assista
        </p>
        <h2 className="mb-10 font-display text-3xl text-warm-white sm:text-5xl">
          Bastidor em movimento.
        </h2>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-night-blue">
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/DzI66fBD2oE"
              title="Backstage — vídeo institucional"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
