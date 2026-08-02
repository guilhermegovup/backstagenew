import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT } from "@/lib/site-data";
import { SiteShell } from "@/components/site/chrome";
import { useScrollReveal } from "@/components/site/bits";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Backstage Produções" },
      {
        name: "description",
        content:
          "Conte sua ideia para a Backstage. Produção de eventos no Rio de Janeiro e em todo o Brasil.",
      },
      { property: "og:title", content: "Fale com a Backstage" },
      { property: "og:description", content: "O que você quer realizar?" },
      { property: "og:image", content: "https://backstagenew.lovable.app/projetos/hero-arvore.jpg" },
    ],
  }),
  component: ContatoPage,
});

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome").max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

function ContatoPage() {
  return (
    <SiteShell>
      <header className="border-b border-border pt-28 pb-12 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-spotlight sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
            Fale conosco
          </p>
          <h1 className="max-w-4xl font-display text-[2rem] uppercase leading-[0.98] text-warm-white sm:text-6xl lg:text-7xl">
            O que você quer realizar?
          </h1>
          <p className="mt-5 max-w-2xl text-justified text-[0.95rem] text-mist sm:mt-6 sm:text-lg">
            Conte sua ideia. Respondemos rápido — não importa o tamanho do projeto, o nível de
            complexidade ou o orçamento disponível.
          </p>
        </div>
      </header>

      <Contato />

      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:gap-8 sm:px-6">
          <div className="flex min-w-0 gap-3 text-sm text-mist">
            <MapPin size={18} className="mt-0.5 shrink-0 text-spotlight" />
            <span className="min-w-0 break-words">{CONTACT.address}</span>
          </div>
          <div className="flex min-w-0 gap-3 text-sm text-mist">
            <Phone size={18} className="mt-0.5 shrink-0 text-spotlight" />
            <a href={CONTACT.phoneHref} className="min-h-11 break-words hover:text-spotlight">
              {CONTACT.phone}
            </a>
          </div>
          <div className="flex min-w-0 gap-3 text-sm text-mist">
            <Mail size={18} className="mt-0.5 shrink-0 text-spotlight" />
            <a href={`mailto:${CONTACT.email}`} className="min-h-11 break-all hover:text-spotlight">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

/* ---------- Formulário ---------- */
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
