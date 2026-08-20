import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { useLang, productImageMap } from "@/lib/lang";
import { content, productSlugs } from "@/lib/site-content";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    if (!productSlugs.includes(params.slug as (typeof productSlugs)[number])) throw notFound();
    const ar = content.ar.products.find((p) => p.slug === params.slug)!;
    const en = content.en.products.find((p) => p.slug === params.slug)!;
    return { arName: ar.name, enName: en.name, enDesc: en.desc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.arName} | ${loaderData.enName} — Top Trust`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.enDesc },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.enDesc },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  const product = t.products.find((p) => p.slug === slug);
  if (!product) return null;
  const others = t.products.filter((p) => p.slug !== slug);

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              <Back className="size-4" /> {t.common.backToProducts}
            </Link>
            <span className="mt-6 block text-xs font-bold tracking-widest text-primary uppercase">
              {product.spec}
            </span>
            <h1 className="mt-3 font-display text-3xl font-black sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.long}</p>
            <Link
              to="/contact"
              className="cta-brand shadow-ember mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              {t.common.requestProduct} <Arrow className="size-4" />
            </Link>
          </div>
          <img
            src={productImageMap[product.slug]}
            alt={product.name}
            width={1024}
            height={768}
            className="shadow-card aspect-[4/3] w-full rounded-sm border border-border object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-8 lg:py-24">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-black">{t.common.specs}</h2>
          <dl className="mt-6 overflow-hidden rounded-sm border border-border">
            {product.specs.map((s, i) => (
              <div
                key={s.k}
                className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3 ${
                  i % 2 ? "bg-background" : "bg-surface"
                }`}
              >
                <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  {s.k}
                </dt>
                <dd className="text-sm font-medium sm:col-span-2">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-2xl font-black">{t.common.uses}</h2>
          <ul className="mt-6 space-y-3">
            {product.uses.map((u) => (
              <li key={u} className="flex items-start gap-3 text-sm">
                <span className="bg-gradient-ember mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-primary-foreground">
                  <Check className="size-3" />
                </span>
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl font-black">{t.common.relatedProducts}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group shadow-card overflow-hidden rounded-sm border border-border bg-background"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={productImageMap[p.slug]}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.spec}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
