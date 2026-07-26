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
  return (
    <section id="clientes" ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
            Clientes
          </p>
          <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
            Quem já realizou com a gente
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map((c, i) => (
            <div
              key={c.name}
              className="client-chip group grid h-24 place-items-center rounded-xl border border-border bg-white px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-spotlight/40 hover:shadow-lg"
              style={{ transitionDelay: `${i * 30}ms` } as React.CSSProperties}
            >
              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="max-h-11 w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Foto de projeto (proporção nativa, sem corte) ---------- */
export function ProjectPhoto({ p }: { p: Project }) {
  if (!p.photo) {
    return (
      <div
        className="flex aspect-[4/3] items-center justify-center rounded-2xl px-8 text-center"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, #1A2340 0%, #131C33 45%, #0B0B10 100%)",
        }}
      >
        <span
          className="font-display text-2xl uppercase leading-[0.9] sm:text-4xl"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(245,185,66,0.55)" }}
        >
          {p.name}
        </span>
      </div>
    );
  }
  return (
    <div className="project-photo relative overflow-hidden rounded-2xl bg-night-blue">
      <img
        src={p.photo}
        alt={p.cardAlt ?? p.name}
        width={p.photoW}
        height={p.photoH}
        loading="lazy"
        className="h-auto w-full"
      />
      <span className="tint pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}

/* ---------- Linha editorial de projeto ---------- */
export function ProjectRow({ p, index }: { p: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
      <Link
        to="/projetos/$slug"
        params={{ slug: p.slug }}
        aria-label={`Ver o case ${p.name}`}
        className={`group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight lg:col-span-7 ${
          flip ? "lg:order-2 lg:col-start-6" : ""
        }`}
      >
        <ProjectPhoto p={p} />
      </Link>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight">
          {p.meta}
        </p>
        <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] text-warm-white sm:text-4xl">
          {p.name}
        </h3>
        <p className="mt-4 font-display text-lg italic text-warm-white sm:text-xl">
          “{p.tagline}”
        </p>
        <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">{p.desc}</p>
        <Link
          to="/projetos/$slug"
          params={{ slug: p.slug }}
          className="group/link mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-spotlight"
        >
          Ver o case
          <ArrowRight size={16} className="transition group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function ProjectRows() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.slug} p={p} index={i} />
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
