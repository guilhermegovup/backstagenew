import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    const image = p.cardImage ? `${BASE}${p.cardImage}` : `${BASE}/projetos/hero-arvore.jpg`;
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
      <header className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        <div className="absolute inset-0" aria-hidden="true">
          {p.cardImage ? (
            <img
              src={p.cardImage}
              alt=""
              className="h-full w-full object-cover"
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

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Link
            to="/"
            hash="projetos"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-mist transition hover:text-spotlight"
          >
            <ArrowLeft size={14} />
            Todos os projetos
          </Link>
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-spotlight sm:text-[11px]">
            {p.meta}
          </p>
          <h1 className="max-w-4xl font-display text-4xl uppercase leading-[0.95] text-warm-white sm:text-6xl lg:text-7xl">
            {p.name}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-lg italic text-warm-white sm:text-2xl">
            “{p.tagline}”
          </p>
        </div>
      </header>

      {/* Case */}
      <article ref={bodyRef} className="on-scroll border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
                O projeto
              </p>
              <p className="mt-5 text-lg leading-relaxed text-warm-white">{p.desc}</p>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.imageAlt ?? p.name}
                  loading="lazy"
                  className="mt-8 max-h-24 w-auto opacity-80"
                />
              ) : null}
            </div>

            <div className="lg:col-span-8">
              {p.full ? (
                <p className="text-base leading-relaxed text-mist sm:text-lg">{p.full}</p>
              ) : (
                <p className="text-base leading-relaxed text-mist sm:text-lg">
                  Case completo em breve. Fale com a gente para conhecer os detalhes desta
                  realização.
                </p>
              )}

              {p.extraImage ? (
                <figure className="mt-10 overflow-hidden rounded-2xl border border-border">
                  <img
                    src={p.extraImage}
                    alt={p.extraAlt ?? p.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ) : null}

              <Link
                to="/contato"
                className="btn-primary mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-6 text-sm font-semibold text-stage-black"
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
          className="group mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-14 transition hover:bg-night-blue/40 sm:px-6 sm:py-20"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight">
              Próximo projeto
            </p>
            <p className="font-display text-3xl uppercase leading-none text-warm-white transition group-hover:text-spotlight sm:text-5xl">
              {next.name}
            </p>
          </div>
          <ArrowRight
            size={36}
            className="shrink-0 text-warm-white/60 transition group-hover:translate-x-2 group-hover:text-spotlight"
          />
        </Link>
      </nav>
    </SiteShell>
  );
}
