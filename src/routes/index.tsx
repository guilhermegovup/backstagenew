import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Menu,
  X,
  ArrowRight,
  Lightbulb,
  Ruler,
  Wrench,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Backstage — Produção de Eventos no Rio de Janeiro" },
      {
        name: "description",
        content:
          "Backstage: quase 30 anos transformando ideias em eventos inesquecíveis — culturais, esportivos, empresariais e de entretenimento no Rio e no Brasil.",
      },
      { property: "og:title", content: "Backstage — Boas ideias. Grandes realizações." },
      {
        property: "og:description",
        content:
          "Produtora carioca especializada em grandes eventos: da maior árvore de natal flutuante do mundo ao Mickey na Baía de Guanabara.",
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Como Fazemos", href: "#como-fazemos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Clientes", href: "#clientes" },
];

const PROJECTS = [
  { name: "Árvore do Rio", desc: "A maior árvore de natal flutuante do mundo, na Lagoa Rodrigo de Freitas." },
  { name: "Corrida Todo Mundo Vai", desc: "Circuito de corridas de rua que movimenta o Rio." },
  { name: "Disney Millenium", desc: "Uma visita do Mickey Mouse à Baía de Guanabara." },
  { name: "Ação Vote Cristo", desc: "Mobilização que ajudou a eleger o Cristo Redentor uma das 7 Maravilhas do Mundo Moderno." },
  { name: "Festival Vale do Café", desc: "Festival cultural na região do Vale do Café fluminense." },
  { name: "Circuito Energia em Movimento", desc: "Circuito de eventos esportivos e de qualidade de vida." },
];

const STEPS = [
  { n: "01", title: "Ideia", desc: "A matéria-prima de todo grande feito. Ouvimos, provocamos e desenhamos o conceito.", Icon: Lightbulb },
  { n: "02", title: "Projeto", desc: "Engenharia e arquitetura traduzem a ideia em plano executável, seguro e viável.", Icon: Ruler },
  { n: "03", title: "Produção", desc: "Equipe multidisciplinar coloca o projeto de pé, cuidando de cada detalhe operacional.", Icon: Wrench },
  { n: "04", title: "Experiência", desc: "O público vive o evento. Nossa métrica de sucesso é a memória que fica.", Icon: Sparkles },
];

const STATS = [
  { k: "~30", v: "anos de história" },
  { k: "4", v: "frentes: cultural, esportiva, empresarial e entretenimento" },
  { k: "1", v: "equipe multidisciplinar apaixonada" },
  { k: "BR", v: "Rio de Janeiro e todo o Brasil" },
];

const CLIENTS = Array.from({ length: 12 }, (_, i) => `Logo ${String(i + 1).padStart(2, "0")}`);

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome").max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ComoFazemos />
        <Projetos />
        <QuemSomos />
        <VideoSection />
        <Clientes />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-stage-black/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-xl tracking-tight text-warm-white">
          BACKSTAGE
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-warm-white/80 transition hover:text-spotlight"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#fale-conosco"
            className="inline-flex min-h-11 items-center rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black transition hover:brightness-110"
          >
            Fale Conosco
          </a>
        </nav>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-md text-warm-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-stage-black/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-md px-3 py-3 text-warm-white/90 hover:bg-night-blue"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#fale-conosco"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(19,28,51,0.9),transparent_60%)]" />
      <div className="spotlight-beam" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="reveal reveal-1 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Produtora de eventos · Rio de Janeiro
        </p>
        <h1 className="reveal reveal-2 max-w-5xl font-display text-4xl leading-[1.02] text-warm-white sm:text-6xl lg:text-7xl">
          Boas ideias.
          <br />
          <span className="text-spotlight">Grandes realizações.</span>
        </h1>
        <p className="reveal reveal-3 mt-6 max-w-2xl text-base text-mist sm:text-lg">
          Há quase 30 anos transformando ideias em eventos inesquecíveis no Rio de Janeiro
          e no Brasil.
        </p>
        <div className="reveal reveal-4 mt-10 flex flex-wrap gap-3">
          <a
            href="#fale-conosco"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-6 text-sm font-semibold text-stage-black transition hover:brightness-110"
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

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, title, desc, Icon }) => (
            <li
              key={n}
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

/* ---------- Projetos ---------- */
function Projetos() {
  const ref = useScrollReveal();
  return (
    <section id="projetos" ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
              Portfólio
            </p>
            <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
              Alguns de nossos projetos
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-border bg-night-blue transition hover:-translate-y-1 hover:border-spotlight/70 hover:shadow-[0_20px_60px_-20px_rgba(245,185,66,0.35)]"
            >
              <div
                aria-hidden="true"
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #131C33 0%, #0B0B10 60%, #1A2340 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(245,185,66,0.35),transparent_40%)]" />
                <span className="relative px-6 text-center font-display text-2xl uppercase tracking-tight text-warm-white sm:text-3xl">
                  {p.name}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-warm-white">{p.name}</h3>
                <p className="mt-2 text-sm text-mist">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
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
            <p className="text-warm-white">
              Quer dar vida à sua ideia? Pode contar com a gente.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border bg-stage-black/60 p-6"
            >
              <dt className="font-display text-4xl text-spotlight">{s.k}</dt>
              <dd className="mt-3 text-sm text-mist">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
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

/* ---------- Clientes ---------- */
function Clientes() {
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
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="grid h-24 w-48 shrink-0 place-items-center rounded-xl border border-border bg-night-blue/60 text-sm font-semibold uppercase tracking-widest text-mist"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contato ---------- */
function Contato() {
  const ref = useScrollReveal();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !map[key]) map[key] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Mensagem enviada! Retornaremos em breve.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="fale-conosco" ref={ref} className="on-scroll border-t border-border bg-night-blue/40 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
          Fale conosco
        </p>
        <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
          O que você quer realizar?
        </h2>
        <p className="mt-4 text-mist">
          Conte um pouco sobre a sua ideia. Nosso time entra em contato para desenhar
          o próximo grande feito com você.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
          <Field label="Primeiro Nome" name="firstName" required error={errors.firstName} />
          <Field label="Sobrenome" name="lastName" error={errors.lastName} />
          <Field label="E-mail" name="email" type="email" required error={errors.email} />
          <Field label="Telefone Celular" name="phone" type="tel" error={errors.phone} />
          <div className="sm:col-span-2">
            <TextArea label="Mensagem" name="message" error={errors.message} />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-8 text-sm font-semibold text-stage-black transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Fale conosco"}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-warm-white">
        {label}
        {required && <span className="ml-1 text-spotlight">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="min-h-12 w-full rounded-md border border-input bg-stage-black/60 px-4 text-warm-white placeholder:text-mist/70 focus:border-spotlight focus:outline-none"
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({ label, name, error }: { label: string; name: string; error?: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-warm-white">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full rounded-md border border-input bg-stage-black/60 px-4 py-3 text-warm-white placeholder:text-mist/70 focus:border-spotlight focus:outline-none"
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-stage-black py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-warm-white">BACKSTAGE</p>
          <p className="mt-3 text-sm text-mist">Boas ideias. Grandes realizações.</p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com/backstage.rio.producoes"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Backstage"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-warm-white hover:border-spotlight hover:text-spotlight"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com/backstage.rio.producoes"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Backstage"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-warm-white hover:border-spotlight hover:text-spotlight"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-spotlight">
            Contato
          </p>
          <ul className="space-y-3 text-mist">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-warm-white/80" />
              <span>
                Avenida Armando Lombardi, 800 sl 313, Condado Cascais, Barra da Tijuca,
                Rio de Janeiro — RJ, CEP 22640-906
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-warm-white/80" />
              <a href="tel:+5521967848349" className="hover:text-spotlight">
                +55 21 96784-8349
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-warm-white/80" />
              <a href="mailto:backstage@backstage.art.br" className="hover:text-spotlight">
                backstage@backstage.art.br
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-spotlight">
            Navegação
          </p>
          <ul className="grid grid-cols-2 gap-2 text-mist">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-spotlight">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#fale-conosco" className="hover:text-spotlight">
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-4 pt-6 text-xs text-mist sm:px-6">
        © {year} Backstage Produções. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ---------- utils ---------- */
function useScrollReveal<T extends HTMLElement = HTMLElement>() {
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
