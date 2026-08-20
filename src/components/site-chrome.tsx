import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import { images } from "@/lib/images";

function BrandLogo({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <img
      src={images.logo}
      alt={t.brand}
      width={48}
      height={48}
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = images.logoFallback;
      }}
    />
  );
}

export function SiteHeader() {
  const { t, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/products", label: t.nav.products },
    { to: "/services", label: t.nav.services },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <BrandLogo className="size-11 rounded-full object-cover ring-2 ring-primary/20" />
          <span className="leading-tight">
            <span className="block font-display text-sm font-black tracking-tight sm:text-base">
              {t.brandShort}
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
              {t.tagline}
            </span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="relative py-1 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Dark mode" : "Light mode"}
            className="grid size-9 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="rounded-sm border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.langToggle}
          </button>
          <Link
            to="/contact"
            className="cta-brand shadow-ember hidden rounded-sm px-4 py-2 text-sm font-bold sm:inline-block"
          >
            {t.hero.cta}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid size-9 place-items-center rounded-sm border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-3 text-sm font-medium text-muted-foreground last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-graphite text-graphite-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandLogo className="size-12 rounded-full object-cover ring-2 ring-primary/30" />
              <div>
                <p className="font-display text-base font-black">{t.brandShort}</p>
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  {t.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-graphite-foreground/70">
              {t.brand}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${t.contact.email}`}
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="size-3.5" />
                {t.contact.email}
              </a>
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="size-3.5" />
                {t.contact.phone}
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-widest text-white uppercase">
              {t.nav.products}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-graphite-foreground/70">
              {t.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-widest text-white uppercase">
              {t.nav.about}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-graphite-foreground/70">
              <li>
                <Link to="/about" className="transition-colors hover:text-primary">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-primary">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold tracking-widest text-white uppercase">
              {t.nav.contact}
            </p>
            <ul className="mt-4 space-y-4 text-sm text-graphite-foreground/70">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="font-semibold transition-colors hover:text-primary"
                >
                  {t.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="space-y-1">
                  <a
                    href={`mailto:${t.contact.email}`}
                    dir="ltr"
                    className="block font-semibold transition-colors hover:text-primary"
                  >
                    {t.contact.email}
                  </a>
                  <a
                    href={`mailto:${t.contact.emailSecondary}`}
                    dir="ltr"
                    className="block font-semibold transition-colors hover:text-primary"
                  >
                    {t.contact.emailSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{t.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-graphite-foreground/60 sm:flex-row lg:px-8">
          <span>© {year} {t.brand}</span>
          <span>{t.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  center,
}: {
  eyebrow: string;
  title: string;
  body?: string | undefined;
  center?: boolean | undefined;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="rule-accent text-xs font-bold tracking-widest text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="grid-etch absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <SectionHead eyebrow={eyebrow} title={title} body={body} />
      </div>
    </section>
  );
}

export function ContactForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Quote request from ${name}${company ? ` (${company})` : ""}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`,
    );
    const recipients = `${t.contact.email},${t.contact.emailSecondary}`;

    try {
      window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
      setSent(true);
      form.reset();
    } catch {
      setError(t.contact.sent ? "Failed to open your email app. Please email us directly." : "");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-card space-y-4 rounded-sm border border-border bg-background p-7 lg:p-9"
    >
      <Field label={t.contact.name} name="name" />
      <Field label={t.contact.company} name="company" />
      <Field label={t.contact.emailLabel} name="email" type="email" />
      <div>
        <label
          htmlFor="message"
          className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
        >
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-2 w-full rounded-sm border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="cta-brand shadow-ember w-full rounded-sm py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
      >
        {t.contact.submit}
      </button>
      {sent && <p className="text-center text-sm text-primary">{t.contact.sent}</p>}
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full rounded-sm border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
