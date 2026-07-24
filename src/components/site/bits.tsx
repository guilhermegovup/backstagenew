import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CLIENTS, PROJECTS, STATS, type Project } from "@/lib/site-data";

/* ---------- utils ---------- */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- Marquee tipográfico ---------- */
export function BigMarquee() {
  const phrases = ["Boas ideias", "Grandes realizações"];
  // duplicate so the loop is seamless
  const loop = Array.from({ length: 6 }, (_, i) => phrases[i % 2]);
  return (
    <section aria-hidden="true" className="border-y border-border bg-stage-black py-8 sm:py-12">
      <div className="marquee-xl [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-xl-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex">
              {loop.map((p, i) => {
                const highlight = i % 4 === 1; // one word per cycle in spotlight
                return (
                  <span key={`${k}-${i}`} className="marquee-xl-item">
                    <span className={highlight ? "fill" : ""}>{p}</span>
                    <span className="ml-6 opacity-60">—</span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Números ---------- */
export function StatsGrid() {
  const ref = useRef<HTMLDListElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStart(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <dl ref={ref} className="stagger mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{ ["--i" as string]: `${i}` } as React.CSSProperties}
          className="rounded-2xl border border-border bg-stage-black/60 p-6"
        >
          <dt className="font-display text-5xl text-spotlight sm:text-6xl">
            <CountUp value={s.value} start={start} prefix={s.prefix} suffix={s.suffix} />
          </dt>
          <dd className="mt-3 text-sm text-mist">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function CountUp({
  value,
  start,
  prefix,
  suffix,
}: {
  value: number;
  start: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const duration = 900;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  const display =
    value >= 100 ? Math.round(n).toLocaleString("pt-BR") : Math.round(n).toString();
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Clientes ---------- */
export function Clientes() {
  const ref = useScrollReveal();
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section id="clientes" ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Clientes
        </p>
        <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
          Quem já realizou com a gente
        </h2>
      </div>
      <div className="marquee mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max gap-6">
          {doubled.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="grid h-24 w-48 shrink-0 place-items-center rounded-xl bg-warm-white px-6 py-4"
            >
              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="max-h-12 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mídia de projeto (duotone) ---------- */
export function ProjectMedia({
  p,
  aspectClass,
  showMetaOnPhoto = false,
}: {
  p: Project;
  aspectClass: string;
  showMetaOnPhoto?: boolean;
}) {
  const card = p.cardImage;
  return (
    <div className={`relative ${aspectClass} overflow-hidden rounded-xl bg-night-blue`}>
      {card ? (
        <img
          src={card}
          alt={p.cardAlt ?? p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center px-8 text-center"
          style={{
            background:
              "radial-gradient(120% 90% at 20% 10%, #1A2340 0%, #131C33 45%, #0B0B10 100%)",
          }}
        >
          <span
            className="font-display text-3xl uppercase leading-[0.9] sm:text-5xl"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(245,185,66,0.55)",
            }}
          >
            {p.name}
          </span>
        </div>
      )}
      {showMetaOnPhoto && card ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stage-black via-stage-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-spotlight">
              {p.meta}
            </p>
            <h3 className="font-display text-3xl uppercase leading-[0.95] text-warm-white sm:text-5xl">
              {p.name}
            </h3>
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ---------- Card de projeto (link para a página do case) ---------- */
export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex flex-col">
      <Link
        to="/projetos/$slug"
        params={{ slug: p.slug }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2 focus-visible:ring-offset-stage-black"
        aria-label={`Ver o case ${p.name}`}
      >
        <ProjectMedia p={p} aspectClass="aspect-[4/5]" />
        <div className="mt-5 flex flex-col gap-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight">
            {p.meta}
          </p>
          <h3 className="font-display text-xl uppercase leading-[0.95] text-warm-white transition group-hover:text-spotlight sm:text-2xl">
            {p.name}
          </h3>
          <p className="font-display text-base italic text-warm-white sm:text-lg">
            “{p.tagline}”
          </p>
          <p className="text-sm leading-relaxed text-mist">{p.desc}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-spotlight">
            Ver o case
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/* ---------- Grade de projetos ---------- */
export function ProjectGrid() {
  return (
    <div className="stagger grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p, i) => (
        <div key={p.slug} style={{ ["--i" as string]: `${i}` } as React.CSSProperties}>
          <ProjectCard p={p} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Cabeçalho de seção ---------- */
export function SectionHead({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          {kicker}
        </p>
        <h2 className="font-display text-3xl text-warm-white sm:text-5xl">{title}</h2>
      </div>
      {aside ? <p className="max-w-sm text-sm text-mist">{aside}</p> : null}
    </div>
  );
}
