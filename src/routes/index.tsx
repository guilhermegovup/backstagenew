import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Menu,
  X,
  ArrowRight,
  ArrowDown,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      { property: "og:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
      { name: "twitter:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
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

type Project = {
  name: string;
  meta: string;
  tagline: string;
  desc: string;
  image?: string;
  imageAlt?: string;
  cardImage?: string;
  cardAlt?: string;
  extraImage?: string;
  extraAlt?: string;
  full?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Árvore do Rio",
    meta: "Natal · Desde 1996 / Lagoa Rodrigo de Freitas",
    tagline: "O Natal que flutua no coração da cidade.",
    desc: "A maior árvore de natal flutuante do mundo, na Lagoa Rodrigo de Freitas.",
    image: "/projetos/arvore-do-rio.png",
    imageAlt: "Logo da Árvore do Rio",
    cardImage: "/projetos/cards/card-arvore.webp",
    cardAlt: "Árvore de Natal flutuante iluminada na Lagoa Rodrigo de Freitas",
    extraImage: "/projetos/arvore-do-rio-foto.png",
    extraAlt: "Árvore de Natal flutuante iluminada na Lagoa Rodrigo de Freitas",
    full: "Uma produção mágica, que enche a gente de prazer e orgulho. Uma realização Backstage que, desde 1996, ajuda a fazer da Lagoa Rodrigo de Freitas uma referência do Natal brasileiro. Considerado o 3º maior evento do Rio de Janeiro (atrás apenas do Carnaval e do Réveillon), a Árvore do Rio já celebra 21 edições e se realiza graças à participação de 1200 profissionais, atraindo todos os anos mais de 1 milhão de pessoas para o entorno da Lagoa. A Árvore do Rio foi incluída no Guinness Book (1999 e 2007) como a maior árvore flutuante do mundo. Uma produção que envolve da parte artística ao mais alto grau de especialização em diversos campos da engenharia, inclusive naval — viabilizando a ideia de Roberto Medina com a concepção cenográfica de Abel Gomes.",
  },
  {
    name: "Corrida Todo Mundo Vai",
    meta: "Esporte · Desde 2019 / Aterro do Flamengo",
    tagline: "A atividade física mais democrática que existe.",
    desc: "Circuito de corridas de rua que movimenta o Rio.",
    image: "/projetos/corrida-todo-mundo-vai.png",
    imageAlt: "Logo do Circuito Todo Mundo Vai",
    cardImage: "/projetos/cards/card-corrida.webp",
    cardAlt: "Corredores no Aterro do Flamengo",
    full: "Com o objetivo de trazer de volta os verdadeiros corredores de rua — a atividade física mais democrática que existe, exigindo apenas vontade e um tênis no pé — foi criado o Circuito Todo Mundo Vai, para Lojas Americanas e Americanas.com. Com idealização e produção executiva da Backstage, o evento levou cerca de 6 mil pessoas ao Aterro do Flamengo numa manhã de maio de 2019. Voltado para toda a família e todas as classes sociais, já são 13 provas realizadas em 7 cidades — um evento seguro, bem organizado e de extrema qualidade, a um preço acessível.",
  },
  {
    name: "Disney Millenium",
    meta: "Entretenimento · 2000 / Baía de Guanabara",
    tagline: "Quando o Mickey escolheu o Rio.",
    desc: "Uma visita do Mickey Mouse à Baía de Guanabara.",
    image: "/projetos/disney-millenium.png",
    imageAlt: "Logo Disney Millenium",
    cardImage: "/projetos/cards/card-disney.webp",
    cardAlt: "Projeção do Mickey e bandeira brasileira no Pão de Açúcar",
    full: "Para a virada do milênio, a Disney criou um espetáculo grandioso e escolheu o Rio de Janeiro. A Backstage, empresa de eventos da Disney Events Latin America desde 1998, foi selecionada para a operação. No Pão de Açúcar, projeções em dimensões estratosféricas destacaram o Mickey e a bandeira brasileira; na Baía de Guanabara, fogos armados em balsas criaram um espetáculo de luzes, som, música e canhões de laser — pela primeira vez no Brasil, tudo sincronizado por computadores. A logística incluiu até o fechamento do aeroporto Santos Dumont. A Backstage recebeu o Troféu Mickey, dedicado a projetos de excelência — única produtora no Brasil a possuir um exemplar. Depois vieram a inauguração do Disney Channel (2001), shows da Disney na Super Casas Bahia (2005-2007), Shows do Mickey (2015 e 2017) e o lançamento do avião Star Wars Galaxy's Edge da Latam (2019).",
  },
  {
    name: "Ação Vote Cristo",
    meta: "Mobilização · 2007 / Rio de Janeiro",
    tagline: "Ele é uma maravilha.",
    desc: "Mobilização que ajudou a eleger o Cristo Redentor uma das 7 Maravilhas do Mundo Moderno.",
    image: "/projetos/vote-cristo.png",
    imageAlt: "Logo da ação Vote Cristo",
    cardImage: "/projetos/cards/card-cristo.webp",
    cardAlt: "Cristo Redentor sob céu azul",
    extraImage: "/projetos/vote-cristo-foto.jpg",
    extraAlt: "Ação de rua da campanha Vote Cristo",
    full: "A campanha de eleição do Cristo Redentor como uma das Sete Maravilhas do Mundo Moderno foi um projeto da Bradesco Seguros com produção executiva da Backstage Produções. Com o conceito 'Vote Cristo. Ele é uma maravilha.', a campanha tomou a cidade com vans envelopadas e promotores uniformizados, divulgando o site e o telefone de votação. Lideranças, artistas e celebridades participaram da mobilização nacional. O objetivo foi alcançado: o Cristo Redentor, maior símbolo do Rio de Janeiro, foi eleito uma das Sete Maravilhas do Mundo Moderno.",
  },
  {
    name: "Festival Vale do Café",
    meta: "Cultura · Desde 2003 / Vale do Paraíba",
    tagline: "Palacetes históricos como palco.",
    desc: "Festival cultural na região do Vale do Café fluminense.",
    image: "/projetos/vale-do-cafe.png",
    imageAlt: "Logo do Festival Vale do Café",
    cardImage: "/projetos/cards/card-vale.webp",
    cardAlt: "Apresentação musical do Festival Vale do Café",
    extraImage: "/projetos/vale-do-cafe-foto.jpg",
    extraAlt: "Apresentação musical do Festival Vale do Café",
    full: "Criado em 2003 para contribuir com um polo turístico cultural no interior do estado do Rio, o Festival Vale do Café divulga o patrimônio histórico e arquitetônico dos municípios do Vale do Paraíba. Idealizado por Cristina Braga, com direção artística de Turíbio Santos, tem praças, igrejas e fazendas históricas como cenário do maior festival de música da região. Em 2010 recebeu o Prêmio de Cultura do Estado do Rio de Janeiro na categoria Empreendedorismo. Em sua história, já impactou mais de 1 milhão de espectadores, com concertos de 10 mil artistas, e beneficiou mais de 4 mil alunos com cursos gratuitos de instrumentos e canto.",
  },
  {
    name: "Circuito Energia em Movimento",
    meta: "Esporte / Rio de Janeiro",
    tagline: "Movimento que vira qualidade de vida.",
    desc: "Circuito de eventos esportivos e de qualidade de vida.",
  },
];

const STEPS = [
  { n: "01", title: "Ideia", desc: "A matéria-prima de todo grande feito. Ouvimos, provocamos e desenhamos o conceito.", Icon: Lightbulb },
  { n: "02", title: "Projeto", desc: "Engenharia e arquitetura traduzem a ideia em plano executável, seguro e viável.", Icon: Ruler },
  { n: "03", title: "Produção", desc: "Equipe multidisciplinar coloca o projeto de pé, cuidando de cada detalhe operacional.", Icon: Wrench },
  { n: "04", title: "Experiência", desc: "O público vive o evento. Nossa métrica de sucesso é a memória que fica.", Icon: Sparkles },
];

type Stat = { value: number; suffix?: string; prefix?: string; label: string };
const STATS: Stat[] = [
  { value: 30, label: "anos de história" },
  { value: 2, suffix: "×", label: "no Guinness Book (Árvore do Rio, 1999 e 2007)" },
  { value: 1, suffix: "M+", label: "pessoas por ano na Lagoa" },
  { value: 1200, label: "profissionais em uma única produção" },
];

const TIMELINE: { year: string; text: string; cta?: boolean }[] = [
  { year: "1996", text: "Primeira Árvore do Rio na Lagoa Rodrigo de Freitas." },
  { year: "1998", text: "Backstage torna-se a produtora da Disney Events Latin America." },
  { year: "2000", text: "Disney Millenium: Mickey na Baía de Guanabara e o Troféu Mickey." },
  { year: "2003", text: "Nasce o Festival Vale do Café." },
  { year: "2007", text: "Vote Cristo: o Cristo eleito uma das 7 Maravilhas do Mundo Moderno." },
  { year: "2019", text: "Circuito Todo Mundo Vai leva 6 mil pessoas ao Aterro." },
  { year: "Hoje", text: "Prontos para a próxima grande realização.", cta: true },
];

const CLIENTS: { name: string; src: string }[] = [
  { name: "Petrobras", src: "/clientes/petrobras.svg" },
  { name: "Enel", src: "/clientes/enel.svg" },
  { name: "Naturgy", src: "/clientes/naturgy.svg" },
  { name: "Light", src: "/clientes/light.svg" },
  { name: "Furnas", src: "/clientes/furnas.svg" },
  { name: "Transpetro", src: "/clientes/transpetro.svg" },
  { name: "Sebrae", src: "/clientes/sebrae.svg" },
  { name: "Sesc", src: "/clientes/sesc.svg" },
  { name: "Senac", src: "/clientes/senac.svg" },
  { name: "Fundação Roberto Marinho", src: "/clientes/fundacao-roberto-marinho.svg" },
  { name: "Grupo CCR", src: "/clientes/grupo-ccr.svg" },
  { name: "Bradesco Seguros", src: "/clientes/bradesco-seguros.svg" },
  { name: "Americanas", src: "/clientes/americanas.svg" },
  { name: "Citroën", src: "/clientes/citroen.svg" },
  { name: "Land Rover", src: "/clientes/land-rover.svg" },
  { name: "Mapfre", src: "/clientes/mapfre.svg" },
  { name: "Cateno", src: "/clientes/cateno.svg" },
  { name: "Universidade", src: "/clientes/universidade.svg" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome").max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <BigMarquee />
        <ComoFazemos />
        <Projetos />
        <Manifesto />
        <QuemSomos />
        <Timeline />
        <VideoSection />
        <Clientes />
        <Contato />
      </main>
      <FooterCTAs />
      <Footer />
      <div className="film-grain" aria-hidden="true" />
    </div>
  );
}

/* ---------- Cursor holofote ---------- */
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-spot" aria-hidden="true" />;
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
        <a href="#top" aria-label="Backstage — página inicial" className="flex items-center">
          <img
            src="/brand/logo-backstage-branco.svg"
            alt="Backstage"
            className="h-8 w-auto"
            width={140}
            height={32}
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-link text-sm text-warm-white/80 transition hover:text-warm-white"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#fale-conosco"
            className="btn-primary inline-flex min-h-11 items-center rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black"
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

function SplitWords({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="word-mask"
          style={{ ["--i" as string]: `${startIndex + i}` } as React.CSSProperties}
        >
          <span>{w}</span>
        </span>
      ))}
    </>
  );
}

/* ---------- Big outline marquee ---------- */
function BigMarquee() {
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

/* ---------- Projetos ---------- */
function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const card = p.cardImage;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-night-blue transition duration-500 hover:-translate-y-1 hover:border-spotlight/70 hover:shadow-[0_30px_80px_-30px_rgba(245,185,66,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-night-blue">
        {card ? (
          <>
            <img
              src={card}
              alt={p.cardAlt ?? p.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.04] group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)] group-focus-within:[filter:grayscale(0)_contrast(1)_brightness(1)]"
              style={{ filter: "grayscale(0.85) contrast(1.05) brightness(0.9)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-night-blue opacity-100 transition-opacity duration-500 [mix-blend-mode:color] motion-reduce:transition-none group-hover:opacity-0 group-focus-within:opacity-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 [mix-blend-mode:soft-light]"
              style={{
                background:
                  "radial-gradient(80% 55% at 50% 0%, rgba(245,185,66,0.12), transparent 70%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-night-blue px-6 text-center"
          >
            <span
              className="font-display text-3xl uppercase leading-[0.9] sm:text-4xl"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(245,185,66,0.4)",
              }}
            >
              {p.name}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stage-black via-stage-black/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight transition duration-500 group-hover:translate-x-1">
            {p.meta}
          </p>
          <h3 className="font-display text-xl uppercase leading-[0.95] text-warm-white sm:text-2xl">
            {p.name}
          </h3>
        </div>
      </div>


      <div className="flex flex-col gap-3 border-t border-warm-white/5 p-5 sm:p-6">
        <p className="font-display text-base italic text-warm-white sm:text-lg">
          “{p.tagline}”
        </p>
        <p className="text-sm leading-relaxed text-mist">{p.desc}</p>
        {p.full ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group/btn mt-1 inline-flex items-center gap-2 self-start text-sm font-semibold text-spotlight transition hover:brightness-110"
              >
                Saiba mais
                <ArrowRight size={16} className="transition group-hover/btn:translate-x-1" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-night-blue p-0 text-warm-white">
              <div className="relative aspect-[16/9] overflow-hidden bg-stage-black">
                {photo ? (
                  <img src={photo} alt={p.extraAlt ?? p.name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 20% 10%, #1A2340 0%, #131C33 45%, #0B0B10 100%)",
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-night-blue via-night-blue/40 to-transparent" />
                {logo && (
                  <img src={logo} alt="" aria-hidden="true" className="absolute bottom-4 left-6 h-14 w-auto" />
                )}
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-spotlight">
                  {p.meta}
                </p>
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl uppercase tracking-tight text-warm-white sm:text-4xl">
                    {p.name}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Case completo do projeto {p.name}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm leading-relaxed text-mist sm:text-base">{p.full}</p>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <span className="mt-1 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Em breve
          </span>
        )}
      </div>
    </article>
  );
}

function Projetos() {
  const ref = useScrollReveal();
  return (
    <section id="projetos" ref={ref} className="on-scroll border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-spotlight">
              Portfólio
            </p>
            <h2 className="font-display text-3xl text-warm-white sm:text-5xl">
              Alguns de nossos projetos
            </h2>
          </div>
          <p className="max-w-sm text-sm text-mist">
            Uma seleção de realizações que atravessaram gerações — do palco ao asfalto, da baía ao interior.
          </p>
        </div>

        <div className="stagger mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <div key={p.name} style={{ ["--i" as string]: `${i}` } as React.CSSProperties}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Manifesto tipográfico ---------- */
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

function StatsGrid() {
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

/* ---------- Timeline ---------- */
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
    const form = e.currentTarget;
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente ou fale conosco pelo WhatsApp.");
      return;
    }
    toast.success("Mensagem enviada! Retornaremos em breve.");
    form.reset();
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
              className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-8 text-sm font-semibold text-stage-black disabled:opacity-60"
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

/* ---------- Footer CTA blocks ---------- */
function FooterCTAs() {
  const items: {
    kicker: string;
    title: string;
    href: string;
    external?: boolean;
  }[] = [
    { kicker: "Fale conosco", title: "Conte sua ideia", href: "#fale-conosco" },
    { kicker: "Nossos projetos", title: "30 anos de realizações", href: "#projetos" },
    {
      kicker: "Siga a Backstage",
      title: "@backstage.rio.producoes",
      href: "https://instagram.com/backstage.rio.producoes",
      external: true,
    },
  ];
  return (
    <section className="border-t border-border bg-stage-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-3">
        {items.map((it) => (
          <FooterCTA key={it.href} {...it} />
        ))}
      </div>
    </section>
  );
}

function FooterCTA({
  kicker,
  title,
  href,
  external,
}: {
  kicker: string;
  title: string;
  href: string;
  external?: boolean;
}): ReactNode {
  const common =
    "group flex items-center justify-between gap-4 border-b border-border p-8 transition hover:bg-night-blue/40 md:border-b-0 md:border-r md:last:border-r-0 sm:p-10";
  const inner = (
    <>
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight">
          {kicker}
        </p>
        <p className="font-display text-2xl uppercase text-warm-white sm:text-3xl">{title}</p>
      </div>
      <ArrowRight
        size={28}
        className="shrink-0 text-warm-white/60 transition group-hover:translate-x-1 group-hover:text-spotlight"
      />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={common}>
        {inner}
      </a>
    );
  }
  return (
    <a href={href} className={common}>
      {inner}
    </a>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-stage-black py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <img
            src="/brand/logo-backstage-branco.svg"
            alt="Backstage"
            className="h-10 w-auto"
            width={180}
            height={40}
          />
          <p className="mt-4 text-sm text-mist">Boas ideias. Grandes realizações.</p>
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
