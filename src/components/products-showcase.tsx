import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { SectionHead } from "@/components/site-chrome";
import { useLang } from "@/lib/lang";
import { productImageMap } from "@/lib/images";

type Props = {
  /** Compact layout for the home page preview */
  compact?: boolean;
  showHeader?: boolean;
};

export function ProductsShowcase({ compact = false, showHeader = true }: Props) {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const product = t.products[active];
  if (!product) return null;

  return (
    <section className={compact ? "" : "mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"}>
      {showHeader && (
        <div className={compact ? "mb-10 flex flex-wrap items-end justify-between gap-6" : "mb-12 text-center"}>
          <SectionHead
            eyebrow={t.productsSection.eyebrow}
            title={t.productsSection.title}
            body={t.productsSection.body}
            center={!compact}
          />
          {compact && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              {t.common.viewAll} <Arrow className="size-4" />
            </Link>
          )}
        </div>
      )}

      {/* Category tabs — Gulf Metal Alloys style */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {t.products.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-sm border px-4 py-2.5 text-sm font-bold transition-all ${
              active === i
                ? "border-primary bg-primary text-primary-foreground shadow-ember"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Featured category panel */}
      <article className="shadow-card mt-6 overflow-hidden rounded-sm border border-border bg-card">
        <div className="grid lg:grid-cols-2">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="group relative block min-h-[240px] overflow-hidden bg-surface lg:min-h-[420px]"
          >
            <img
              src={productImageMap[product.slug]}
              alt={product.name}
              loading="lazy"
              width={1024}
              height={768}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-graphite-foreground lg:p-8">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">
                {product.categoryEn}
              </span>
              <h3 className="mt-2 font-display text-2xl font-black lg:text-3xl">{product.name}</h3>
            </div>
          </Link>

          <div className="flex flex-col justify-center gap-5 p-7 lg:p-10">
            <p className="text-xs font-bold tracking-widest text-primary uppercase">{product.spec}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.long}</p>
            <p className="text-xs text-muted-foreground">{t.productsSection.note}</p>

            <ul className="grid gap-2 sm:grid-cols-2">
              {product.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="bg-gradient-ember mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-primary-foreground">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="cta-brand inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              >
                {t.common.viewDetails} <Arrow className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
              >
                {t.hero.cta}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Quick-access product cards */}
      {!compact && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.products.map((p, i) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              onMouseEnter={() => setActive(i)}
              className={`group overflow-hidden rounded-sm border bg-background transition-all hover:-translate-y-0.5 hover:shadow-card ${
                active === i ? "border-primary shadow-card" : "border-border"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface">
                <img
                  src={productImageMap[p.slug]}
                  alt={p.name}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  {p.categoryEn}
                </span>
                <h4 className="mt-1 font-display text-sm font-bold">{p.name}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
