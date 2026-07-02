import imgMetal from "@/assets/cover-metal.jpg";
import imgPanel from "@/assets/mock-acrylic-panel.jpg";
import imgMerch from "@/assets/cover-merch.jpg";
import imgTshirt from "@/assets/mock-tshirt.jpg";
import imgTote from "@/assets/mock-tote.jpg";
import imgMug from "@/assets/mock-mug.jpg";
import imgPen from "@/assets/mock-pen.jpg";

const U = (q: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type CollectionStatus = "available" | "coming-soon";

export type ParentCategory = "acrylic" | "metal" | "merch";

export type Collection = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  cover: string;
  status: CollectionStatus;
  templateCount: number;
  priceFrom: number;
  material: string;
  parent: ParentCategory;
};

export type TemplateCategory = string;

export type KeychainTemplate = {
  id: string;
  collection: string; // collection slug
  title: string;
  category: TemplateCategory;
  image: string;
  placeholder?: boolean;
  gallery?: string[];
  popular?: boolean;
  difficulty?: "Easy" | "Medium" | "Advanced";
  priceFrom: number;
  material: string;
  productionMethod: string;
  productionTime: string;
  recommendedUse: string;
};

export const COLLECTIONS: Collection[] = [
  // ── Acrylic ──
  {
    slug: "acrylic-plate",
    title: "Acrylic Plate",
    shortDesc:
      "A large clear-acrylic plate holding multiple die-cut photo shapes and text plaques in one layout — our flagship layered piece.",
    longDesc:
      "Premium cast acrylic plate with layered die-cut photo shapes and personalised text plaques. UV-printed in full colour, hand-finished in Phnom Penh.",
    cover: imgPanel,
    status: "available",
    templateCount: 18,
    priceFrom: 24,
    material: "Cast acrylic + die-cut layers",
    parent: "acrylic",
  },

  // ── Metal (Aluminium) ──
  {
    slug: "metal-wall-art",
    title: "Metal Wall Art",
    shortDesc:
      "Large-format Ultra-HD metal prints — sharp, luminous, and built for walls that deserve more.",
    longDesc:
      "Aircraft-grade aluminium panels, Ultra-HD sublimation printed with mounting posts. Curated categories from landscape to fine art.",
    cover: imgMetal,
    status: "available",
    templateCount: 60,
    priceFrom: 28,
    material: "Aluminium panel",
    parent: "metal",
  },

  // ── Merch subcategories ──
  { slug: "merch-stickers", title: "Stickers", shortDesc: "Die-cut vinyl stickers — matte, gloss, or holographic.", longDesc: "Custom stickers.", cover: imgMerch, status: "coming-soon", templateCount: 0, priceFrom: 1, material: "Vinyl", parent: "merch" },
  { slug: "merch-tshirts", title: "T-Shirts", shortDesc: "Soft combed cotton tees, DTG or screen printed.", longDesc: "Custom t-shirts.", cover: imgTshirt, status: "coming-soon", templateCount: 0, priceFrom: 10, material: "100% cotton", parent: "merch" },
  { slug: "merch-totes", title: "Tote Bags", shortDesc: "12oz canvas totes — everyday carry, custom printed.", longDesc: "Tote bags.", cover: imgTote, status: "coming-soon", templateCount: 0, priceFrom: 8, material: "12oz canvas", parent: "merch" },
  { slug: "merch-mugs", title: "Mugs", shortDesc: "Sublimation ceramic mugs, dishwasher safe.", longDesc: "Custom mugs.", cover: imgMug, status: "coming-soon", templateCount: 0, priceFrom: 7, material: "Ceramic", parent: "merch" },
  { slug: "merch-pens", title: "Engraved Pens", shortDesc: "Laser-engraved metal barrel pens — corporate favourite.", longDesc: "Engraved pens.", cover: imgPen, status: "coming-soon", templateCount: 0, priceFrom: 3, material: "Metal", parent: "merch" },
];

const K = (q: string) => U(q, 900, 1100);

const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildPlaceholders(opts: {
  collection: string;
  category: string;
  count: number;
  labelPrefix?: string;
  priceFrom: number;
  material: string;
  productionMethod: string;
  productionTime: string;
  recommendedUse: string;
}): KeychainTemplate[] {
  const base: Omit<KeychainTemplate, "id" | "title" | "category"> = {
    collection: opts.collection,
    image: "",
    placeholder: true,
    priceFrom: opts.priceFrom,
    material: opts.material,
    productionMethod: opts.productionMethod,
    productionTime: opts.productionTime,
    recommendedUse: opts.recommendedUse,
  };
  return Array.from({ length: opts.count }, (_, i) => {
    const letter = LETTERS[i] ?? `${i + 1}`;
    const title = opts.labelPrefix
      ? `${opts.labelPrefix} — Template ${letter}`
      : `Template ${letter}`;
    return {
      ...base,
      id: `${opts.collection}-${slugify(opts.category)}-${letter.toLowerCase()}`,
      title,
      category: opts.category,
    };
  });
}

export const METAL_CATEGORIES: string[] = [
  "Nature & Landscape",
  "Anime & Pop Culture",
  "Cityscape & Architecture",
  "Wildlife & Animals",
  "Abstract & Minimalist",
  "Travel & Culture",
  "Automotive & Sports",
  "Space & Astronomy",
  "Black & White Fine Art",
  "Family & Portrait",
];

export const KEYCHAIN_TEMPLATES: KeychainTemplate[] = [
  ...buildPlaceholders({
    collection: "acrylic-plate",
    category: "Acrylic Plate",
    count: 18,
    priceFrom: 24,
    material: "Cast acrylic + die-cut layers",
    productionMethod: "UV print + laser cut",
    productionTime: "5–7 days",
    recommendedUse: "Layered photo plates, keepsakes",
  }),
  ...METAL_CATEGORIES.flatMap((cat) =>
    buildPlaceholders({
      collection: "metal-wall-art",
      category: cat,
      count: 6,
      labelPrefix: cat,
      priceFrom: 28,
      material: "Aluminium panel",
      productionMethod: "Ultra-HD sublimation",
      productionTime: "7–10 days",
      recommendedUse: `${cat} wall art`,
    }),
  ),
];

// Kept for backward compatibility; prefer categoriesForCollection().
export const KEYCHAIN_CATEGORIES: string[] = ["Acrylic Plate"];

export function collectionBySlug(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}
export function collectionsByParent(parent: ParentCategory) {
  return COLLECTIONS.filter((c) => c.parent === parent);
}
export function templatesByCollection(slug: string) {
  return KEYCHAIN_TEMPLATES.filter((t) => t.collection === slug);
}
export function templateById(id: string) {
  return KEYCHAIN_TEMPLATES.find((t) => t.id === id);
}
export function categoriesForCollection(slug: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of KEYCHAIN_TEMPLATES) {
    if (t.collection !== slug) continue;
    if (!seen.has(t.category)) {
      seen.add(t.category);
      out.push(t.category);
    }
  }
  return out;
}

export const INSPIRATION_GROUPS: { key: string; title: string; images: string[] }[] = [
  { key: "anime",      title: "Anime",      images: [K("photo-1578632767115-351597cf2477"), K("photo-1604079628040-94301bb21b91"), K("photo-1493225457124-a3eb161ffa5f")] },
  { key: "pet",        title: "Pet",        images: [K("photo-1543466835-00a7907e9de1"), K("photo-1514888286974-6c03e2ca1dba"), K("photo-1517423440428-a5a00ad493e8")] },
  { key: "business",   title: "Business",   images: [K("photo-1611162617213-7d7a39e9b1d7"), K("photo-1542744095-291d1f67b221"), K("photo-1450101499163-c8848c66ca85")] },
  { key: "couple",     title: "Couple",     images: [K("photo-1519741497674-611481863552"), K("photo-1511285560929-80b456fea0bc"), K("photo-1494774157365-9e04c6720e47")] },
  { key: "wedding",    title: "Wedding",    images: [K("photo-1519225421980-715cb0215aed"), K("photo-1465495976277-4387d4b0e4a6"), K("photo-1469371670807-013ccf25f16a")] },
  { key: "graduation", title: "Graduation", images: [K("photo-1523050854058-8df90110c9f1"), K("photo-1627556704290-2b1f5853ff78"), K("photo-1571260899304-425eee4c7efc")] },
  { key: "birthday",   title: "Birthday",   images: [K("photo-1559454403-b8fb88521f80"), K("photo-1464349095431-e9a21285b5f3"), K("photo-1513151233558-d860c5398176")] },
  { key: "lifestyle",  title: "Lifestyle",  images: [K("photo-1490750967868-88aa4486c946"), K("photo-1494891848038-7bd202a2afeb"), K("photo-1517816743773-6e0fd518b4a6")] },
];