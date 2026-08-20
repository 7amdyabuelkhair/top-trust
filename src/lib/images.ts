/** Central image URLs — local assets served from /public */
export const images = {
  logo: "/logo.jpg",
  logoFallback: "/logo.svg",
  hero: "/hero.png",
  facility: "/facility.jpg",
  products: {
    "steel-pipes": "/product-pipes.jpg",
    "aluminium-sheets": "/product-sheets.jpg",
    "copper-rods": "/product-rods.jpg",
    "structural-beams": "/product-beams.jpg",
  },
} as const;

export const productImageMap: Record<string, string> = { ...images.products };
