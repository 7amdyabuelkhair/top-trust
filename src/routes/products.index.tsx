import { createFileRoute } from "@tanstack/react-router";

import { ProductsShowcase } from "@/components/products-showcase";
import { PageHero } from "@/components/site-chrome";
import { useLang } from "@/lib/lang";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "المنتجات المعدنية | Products — Top Trust" },
      {
        name: "description",
        content:
          "كتالوج منتجات توب ترست: أنابيب الصلب، ألواح الألمنيوم، قضبان النحاس، والقطاعات الإنشائية بمواصفات معتمدة.",
      },
      { property: "og:title", content: "المنتجات المعدنية | Products — Top Trust" },
      {
        property: "og:description",
        content: "درجات معتمدة من الصلب والألمنيوم والنحاس، جاهزة للقص والتشكيل حسب المقاس.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHero
        eyebrow={t.productsSection.eyebrow}
        title={t.productsSection.title}
        body={t.productsSection.body}
      />
      <ProductsShowcase showHeader={false} />
    </div>
  );
}
