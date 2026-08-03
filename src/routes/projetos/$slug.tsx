import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import arvore2025 from "@/assets/arvore-do-rio-2025.jpg.asset.json";
import { PROJECTS } from "@/lib/site-data";
import { SiteShell } from "@/components/site/chrome";
import { useScrollReveal } from "@/components/site/bits";

const BASE = "https://backstagenew.lovable.app";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    if (!p) return {};
    const title = `${p.name} — Backstage`;
    const description = p.full ? p.full.slice(0, 180) : p.desc;
    const image = p.photo ? `${BASE}${p.photo}` : `${BASE}${arvore2025.url}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const bodyRef = useScrollReveal();

  const index = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <SiteShell>
      {/* Capa */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden pt-24 sm:min-h-[70vh]">
        <div className="absolute inset-0" aria-hidden="true">
          {p.photo ? (
            <img
              src={p.photo}
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
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
          <div className="absolute inset-0 bg-stage-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stage-black via-stage-black/70 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 sm:pb-24">
          <Link
            to="/"
            hash="projetos"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-mist transition hover:text-spotlight sm:mb-8 sm:text-xs sm:tracking-[0.28em]"
          >
            <ArrowLeft size={14} />
            Todos os projetos
          </Link>
          <p className="mb-3 font-mono text-[9px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-spotlight sm:mb-4 sm:text-[11px] sm:tracking-[0.3em]">
            {p.meta}
          </p>
          <h1 className="max-w-4xl font-display text-[2rem] uppercase leading-[0.95] text-warm-white sm:text-6xl lg:text-7xl">
            {p.name}
          </h1>
          <p className="mt-4 max-w-2xl font-display text-base italic text-warm-white sm:mt-6 sm:text-2xl">
            “{p.tagline}”
          </p>
        </div>
      </header>

      {/* Case */}
      <article ref={bodyRef} className="on-scroll border-t border-border py-14 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-spotlight sm:text-xs sm:tracking-[0.3em]">
                O projeto
              </p>
              <p className="mt-4 text-justified text-base leading-relaxed text-warm-white sm:mt-5 sm:text-lg">{p.desc}</p>
            </div>

            <div className="lg:col-span-8">
              {p.full ? (
                <p className="text-justified text-[0.95rem] leading-relaxed text-mist sm:text-lg">{p.full}</p>
              ) : (
                <p className="text-justified text-[0.95rem] leading-relaxed text-mist sm:text-lg">
                  Case completo em breve. Fale com a gente para conhecer os detalhes desta
                  realização.
                </p>
              )}

              {p.photo ? (
                <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-night-blue sm:mt-10">
                  <img
                    src={p.photo}
                    alt={p.cardAlt ?? p.name}
                    width={p.photoW}
                    height={p.photoH}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </figure>
              ) : null}

              <Link
                to="/contato"
                className="btn-primary mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-spotlight px-6 text-sm font-semibold text-stage-black sm:mt-12 sm:w-auto"
              >
                Quero realizar um evento assim
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Próximo projeto */}
      <nav aria-label="Próximo projeto" className="border-t border-border bg-stage-black">
        <Link
          to="/projetos/$slug"
          params={{ slug: next.slug }}
          className="group mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-10 transition hover:bg-night-blue/40 sm:flex sm:justify-between sm:gap-6 sm:px-6 sm:py-20"
        >
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-spotlight sm:mb-3 sm:tracking-[0.28em]">
              Próximo projeto
            </p>
            <p className="font-display text-2xl uppercase leading-none text-warm-white transition group-hover:text-spotlight sm:text-5xl">
              {next.name}
            </p>
          </div>
          <ArrowRight
            size={28}
            className="shrink-0 text-warm-white/60 transition group-hover:translate-x-2 group-hover:text-spotlight sm:size-9"
          />
        </Link>
      </nav>
    </SiteShell>
  );
}
