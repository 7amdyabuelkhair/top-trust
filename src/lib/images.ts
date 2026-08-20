const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/** Central image URLs — local assets served from /public */
export const images = {
  logo: withBase("/logo.jpg"),
  logoFallback: withBase("/logo.svg"),
  hero: withBase("/hero.png"),
  facility: withBase("/facility.jpg"),
  products: {
    "steel-pipes": withBase("/product-pipes.jpg"),
    "aluminium-sheets": withBase("/product-sheets.jpg"),
    "copper-rods": withBase("/product-rods.jpg"),
    "structural-beams": withBase("/product-beams.jpg"),
  },
} as const;

export const productImageMap: Record<string, string> = { ...images.products };
