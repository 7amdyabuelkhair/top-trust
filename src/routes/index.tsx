import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { ProductsShowcase } from "@/components/products-showcase";
import { Reveal } from "@/components/reveal";
import { ContactForm, SectionHead } from "@/components/site-chrome";
import { useLang } from "@/lib/lang";
import { images } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "توب ترست للمنتجات المعدنية | Top Trust Metal Products" },
      {
        name: "description",
        content:
          "توب ترست: توريد وتصنيع السبائك والمنتجات المعدنية، قص وتشكيل ومعالجة سطحية للمشاريع الصناعية والإنشائية في الخليج.",
      },
      { property: "og:title", content: "توب ترست للمنتجات المعدنية | Top Trust Metal Products" },
      {
        property: "og:description",
        content: "مبني على الثقة — توريد وتصنيع المنتجات المعدنية بمعايير عالمية وتسليم سريع.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={images.hero}
          alt={t.brand}
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/45 to-background/90 dark:from-background/50 dark:via-background/60 dark:to-background/95" />
        <div className="grid-etch absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
          <p className="animate-fade-up text-xs font-bold tracking-widest text-primary uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="animate-fade-up mt-6 max-w-3xl font-display text-4xl leading-[1.1] font-black sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
            {t.hero.title}
            <span className="text-gradient-ember block">{t.hero.titleAccent}</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "160ms" }}>
            {t.hero.body}
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link
              to="/contact"
              className="cta-brand shadow-ember rounded-sm px-7 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              {t.hero.cta}
            </Link>
            <Link
              to="/products"
              className="rounded-sm border border-border px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>

        <div className="relative border-t border-border bg-surface">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-5 lg:grid-cols-4 lg:px-8 rtl:divide-x-reverse">
            {t.stats.map((s, i) => (
              <div key={s.label} className="animate-fade-up px-4 py-8 text-center lg:py-10" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="font-display text-3xl font-black text-primary lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview — Gulf Metal Alloys style tabs */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <ProductsShowcase compact showHeader />
        </Reveal>
      </section>

      {/* Services preview */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHead
              eyebrow={t.servicesSection.eyebrow}
              title={t.servicesSection.title}
              body={t.servicesSection.body}
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((s, i) => (
              <Reveal key={s.n} delay={i * 60} className="bg-background p-8 transition-colors hover:bg-surface-2">
                <span className="font-display text-sm font-black text-primary">{s.n}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              {t.common.viewAll} <Arrow className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <img
              src={images.facility}
              alt={t.about.title}
              loading="lazy"
              width={1280}
              height={853}
              className="shadow-card w-full rounded-sm border border-border object-cover"
            />
            <div className="bg-gradient-ember absolute -bottom-5 -start-5 hidden rounded-sm px-6 py-5 text-primary-foreground sm:block">
              <div className="font-display text-3xl font-black">ISO</div>
              <div className="text-xs font-semibold">9001 · 14001</div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHead eyebrow={t.about.eyebrow} title={t.about.title} body={t.about.body} />
            <ul className="mt-8 space-y-3">
              {t.about.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="bg-gradient-ember mt-2 size-1.5 shrink-0 rounded-full" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              {t.common.viewAll} <Arrow className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHead
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              body={t.contact.body}
              center
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <dl className="space-y-8 text-sm">
              <div className="flex items-start gap-4">
                <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
                  <Phone className="size-4" />
                </span>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {t.contact.phoneLabel}
                  </dt>
                  <dd dir="ltr" className="mt-1 font-display text-lg font-bold rtl:text-end">
                    <a
                      href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-primary"
                    >
                      {t.contact.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
                  <Mail className="size-4" />
                </span>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {t.contact.mailLabel}
                  </dt>
                  <dd dir="ltr" className="mt-1 space-y-1 font-display text-lg font-bold rtl:text-end">
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {t.contact.email}
                    </a>
                    <a
                      href={`mailto:${t.contact.emailSecondary}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {t.contact.emailSecondary}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {t.contact.addressLabel}
                  </dt>
                  <dd className="mt-1 text-base">{t.contact.address}</dd>
                </div>
              </div>
            </dl>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
