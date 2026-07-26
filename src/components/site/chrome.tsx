import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Menu,
  X,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";
import { NAV, CONTACT } from "@/lib/site-data";
import { ThemeToggle } from "@/components/site/theme-toggle";

/* ---------- Shell ---------- */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorSpotlight />
      <Navbar />
      <main id="top">{children}</main>
      <FooterCTAs />
      <Footer />
      <div className="film-grain" aria-hidden="true" />
    </div>
  );
}

/* ---------- Cursor holofote ---------- */
export function CursorSpotlight() {
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
export function Navbar() {
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
          ? "backdrop-blur-md bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Backstage — página inicial" className="flex items-center">
            <img
              src="/brand/logo-backstage-branco.svg"
              alt="Backstage"
              className="brand-logo h-8 w-auto"
              width={140}
              height={32}
            />
          </Link>
          <ThemeToggle />
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={"hash" in n ? n.hash : undefined}
              className="nav-link text-sm text-warm-white/80 transition hover:text-warm-white"
              activeProps={{ className: "nav-link text-sm text-warm-white" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="btn-primary inline-flex min-h-11 items-center rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black"
          >
            Fale Conosco
          </Link>
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
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={"hash" in n ? n.hash : undefined}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-md px-3 py-3 text-warm-white/90 hover:bg-night-blue"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-spotlight px-5 text-sm font-semibold text-stage-black"
            >
              Fale Conosco
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Footer CTAs ---------- */
export function FooterCTAs() {
  return (
    <section className="border-t border-border bg-stage-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-3">
        <FooterCTA kicker="Fale conosco" title="Conte sua ideia" to="/contato" />
        <FooterCTA kicker="Nossos projetos" title="30 anos de realizações" to="/" hash="projetos" />
        <FooterCTA
          kicker="Siga a Backstage"
          title="@backstage.rio.producoes"
          href={CONTACT.instagram}
        />
      </div>
    </section>
  );
}

function FooterCTA({
  kicker,
  title,
  to,
  hash,
  href,
}: {
  kicker: string;
  title: string;
  to?: string;
  hash?: string;
  href?: string;
}) {
  const common =
    "group flex items-center justify-between gap-4 border-b border-border p-8 transition hover:bg-night-blue/40 md:border-b-0 md:border-r md:last:border-r-0 sm:p-10";
  const inner = (
    <>
      <div className="min-w-0">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-spotlight">
          {kicker}
        </p>
        <p className="font-display text-xl uppercase text-warm-white [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl">
          {title}
        </p>
      </div>
      <ArrowRight
        size={28}
        className="shrink-0 text-warm-white/60 transition group-hover:translate-x-1 group-hover:text-spotlight"
      />
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={common}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} hash={hash} className={common}>
      {inner}
    </Link>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-stage-black py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <img
            src="/brand/logo-backstage-branco.svg"
            alt="Backstage"
            className="brand-logo h-10 w-auto"
            width={180}
            height={40}
          />
          <p className="mt-4 text-sm text-mist">Boas ideias. Grandes realizações.</p>
          <div className="mt-6 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Backstage"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-warm-white hover:border-spotlight hover:text-spotlight"
            >
              <Instagram size={18} />
            </a>
            <a
              href={CONTACT.facebook}
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
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-warm-white/80" />
              <a href={CONTACT.phoneHref} className="hover:text-spotlight">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-warm-white/80" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-spotlight">
                {CONTACT.email}
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
              <li key={n.label}>
                <Link
                  to={n.to}
                  hash={"hash" in n ? n.hash : undefined}
                  className="hover:text-spotlight"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-4 pt-6 text-xs text-mist sm:px-6">
        © {year} Backstage Produções. Todos os direitos reservados.
      </div>
    </footer>
  );
}
