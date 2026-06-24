// Edit this file to swap real photos, prices, and templates.

export type LineKey = "acrylic" | "metal" | "merch";

export type Option =
  | { type: "select"; id: string; label: string; choices: { label: string; priceDelta?: number }[] }
  | { type: "toggle"; id: string; label: string; priceDelta: number; hint?: string };

export type SizeTier = { id: string; label: string; price: number; dims?: string };

export type Product = {
  id: string;
  line: LineKey;
  name: string;
  nameKm?: string;
  blurb: string;
  basePrice: number;
  priceFrom?: number;
  priceTo?: number;
  sizes?: SizeTier[];
  options?: Option[];
  bulkNote?: string;
  mockup: string; // background image of the bare product for the preview composite
  thumb: string;
};

export type Template = {
  id: string;
  name: string;
  nameKm?: string;
  category: "Fan art / K-pop" | "Anime OC" | "Graduation" | "Pre-wedding / Couple" | "Family & Travel" | "Corporate / Logo";
  image: string;
};

const U = (q: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// Lightweight mockups — neutral product silhouettes so uploaded art composites cleanly.
const MOCK = {
  acrylicBlock: U("photo-1607344645866-009c320b63e0", 900, 900),
  acrylicStandee: U("photo-1611162616305-c69b3fa7fbe0", 900, 900),
  acrylicPanel: U("photo-1505691938895-1758d7feb511", 900, 900),
  keychain: U("photo-1593998066526-65fcab3021a2", 900, 900),
  magnet: U("photo-1606744824163-985d376605aa", 900, 900),
  shaker: U("photo-1611162617213-7d7a39e9b1d7", 900, 900),
  metalWall: U("photo-1513519245088-0e12902e5a38", 1200, 900),
  tshirt: U("photo-1521572163474-6864f9cf17ab", 900, 900),
  tote: U("photo-1591348278863-a8fb3887e2aa", 900, 900),
  mug: U("photo-1514228742587-6b1558fcca3d", 900, 900),
  cap: U("photo-1588850561407-ed78c282e89b", 900, 900),
  bottle: U("photo-1602143407151-7111542de6e8", 900, 900),
  glass: U("photo-1572119865084-43c285814d63", 900, 900),
  pen: U("photo-1583485088034-697b5bc36b92", 900, 900),
};

export const TEMPLATES: Template[] = [
  { id: "kpop-1", name: "K-Pop Stage", category: "Fan art / K-pop", image: U("photo-1493225457124-a3eb161ffa5f", 800, 800) },
  { id: "kpop-2", name: "Idol Portrait", category: "Fan art / K-pop", image: U("photo-1509631179647-0177331693ae", 800, 800) },
  { id: "anime-1", name: "OC Sketch", category: "Anime OC", image: U("photo-1578632767115-351597cf2477", 800, 800) },
  { id: "anime-2", name: "Chibi Pose", category: "Anime OC", image: U("photo-1604079628040-94301bb21b91", 800, 800) },
  { id: "grad-1", name: "Class of 2026", category: "Graduation", image: U("photo-1523050854058-8df90110c9f1", 800, 800) },
  { id: "grad-2", name: "Cap Toss", category: "Graduation", image: U("photo-1627556704290-2b1f5853ff78", 800, 800) },
  { id: "wed-1", name: "Golden Hour", category: "Pre-wedding / Couple", image: U("photo-1519741497674-611481863552", 800, 800) },
  { id: "wed-2", name: "City Lights", category: "Pre-wedding / Couple", image: U("photo-1511285560929-80b456fea0bc", 800, 800) },
  { id: "fam-1", name: "Family Road", category: "Family & Travel", image: U("photo-1502086223501-7ea6ecd79368", 800, 800) },
  { id: "fam-2", name: "Angkor Sunrise", category: "Family & Travel", image: U("photo-1564507592333-c60657eea523", 800, 800) },
  { id: "corp-1", name: "Logo Mark", category: "Corporate / Logo", image: U("photo-1611162617213-7d7a39e9b1d7", 800, 800) },
  { id: "corp-2", name: "Brand Wordmark", category: "Corporate / Logo", image: U("photo-1542744095-291d1f67b221", 800, 800) },
];

export const PRODUCTS: Product[] = [
  // ── Acrylic ──
  {
    id: "photo-block",
    line: "acrylic",
    name: "Photo Block",
    nameKm: "ប្លុករូបថត",
    blurb: "Free-standing acrylic block, polished edges, UV print.",
    basePrice: 15,
    sizes: [
      { id: "s", label: "S", dims: "10×15cm", price: 15 },
      { id: "m", label: "M", dims: "15×20cm", price: 25 },
      { id: "l", label: "L", dims: "20×30cm", price: 40 },
      { id: "xl", label: "XL", dims: "30×40cm", price: 55 },
    ],
    mockup: MOCK.acrylicBlock,
    thumb: MOCK.acrylicBlock,
  },
  {
    id: "custom-standee",
    line: "acrylic",
    name: "Custom Standee",
    blurb: "Die-cut acrylic figure with matching base.",
    basePrice: 8,
    priceFrom: 8,
    priceTo: 15,
    sizes: [
      { id: "s", label: "S", dims: "10cm", price: 8 },
      { id: "m", label: "M", dims: "15cm", price: 12 },
      { id: "l", label: "L", dims: "20cm", price: 15 },
    ],
    mockup: MOCK.acrylicStandee,
    thumb: MOCK.acrylicStandee,
  },
  {
    id: "photo-panel",
    line: "acrylic",
    name: "Photo Panel",
    blurb: "Wall-hung acrylic panel with stainless standoffs.",
    basePrice: 25,
    sizes: [
      { id: "s", label: "S", dims: "20×30cm", price: 25 },
      { id: "m", label: "M", dims: "30×40cm", price: 40 },
      { id: "l", label: "L", dims: "40×60cm", price: 55 },
    ],
    mockup: MOCK.acrylicPanel,
    thumb: MOCK.acrylicPanel,
  },
  { id: "keychain", line: "acrylic", name: "Acrylic Keychain", blurb: "Double-side print, anti-scratch coat.", basePrice: 5, priceFrom: 5, priceTo: 9,
    sizes: [{ id: "s", label: "5cm", price: 5 }, { id: "m", label: "7cm", price: 7 }, { id: "l", label: "9cm", price: 9 }],
    mockup: MOCK.keychain, thumb: MOCK.keychain },
  { id: "magnet", line: "acrylic", name: "Acrylic Magnet", blurb: "Strong neodymium magnet backing.", basePrice: 4, priceFrom: 4, priceTo: 8,
    sizes: [{ id: "s", label: "5cm", price: 4 }, { id: "m", label: "7cm", price: 6 }, { id: "l", label: "9cm", price: 8 }],
    mockup: MOCK.magnet, thumb: MOCK.magnet },
  { id: "shaker", line: "acrylic", name: "Shaker Acrylic", blurb: "Sealed glitter cavity, floating charms.", basePrice: 10, priceFrom: 10, priceTo: 18,
    sizes: [{ id: "s", label: "S", price: 10 }, { id: "m", label: "M", price: 14 }, { id: "l", label: "L", price: 18 }],
    mockup: MOCK.shaker, thumb: MOCK.shaker },

  // ── Metal ──
  {
    id: "metal-wall",
    line: "metal",
    name: "Metal Wall Print",
    nameKm: "ផ្ទាំងលោហៈ Ultra-HD",
    blurb: "Ultra-HD dye-sublimated aluminum. Light, vivid, will outlive the wall.",
    basePrice: 22,
    sizes: [
      { id: "s", label: "S", dims: "20×30cm", price: 22 },
      { id: "m", label: "M", dims: "30×40cm", price: 32 },
      { id: "l", label: "L", dims: "35×49cm", price: 45 },
      { id: "xl", label: "XL", dims: "54×74cm", price: 79 },
    ],
    options: [
      { type: "toggle", id: "magnet", label: "Magnetic mount kit", priceDelta: 0.5, hint: "No nails, no holes — rental friendly." },
      {
        type: "select",
        id: "layout",
        label: "Display",
        choices: [
          { label: "Single", priceDelta: 0 },
          { label: "Triptych — 3 pieces", priceDelta: 1.8 }, // multiplier handled in customizer
          { label: "Grid — 4 pieces", priceDelta: 2.6 },
          { label: "Gallery — 6 pieces", priceDelta: 3.6 },
        ],
      },
    ],
    mockup: MOCK.metalWall,
    thumb: MOCK.metalWall,
  },

  // ── Merch ──
  { id: "tshirt", line: "merch", name: "T-shirt", basePrice: 10, blurb: "Soft combed cotton, DTG print.", bulkNote: "$8 at 50+", mockup: MOCK.tshirt, thumb: MOCK.tshirt,
    options: [{ type: "select", id: "size", label: "Size", choices: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL", priceDelta: 1 }] }] },
  { id: "tote", line: "merch", name: "Tote bag", basePrice: 8, blurb: "12oz canvas, gusseted base.", bulkNote: "$6.5 at 50+", mockup: MOCK.tote, thumb: MOCK.tote },
  { id: "mug", line: "merch", name: "Mug 11oz", basePrice: 7, blurb: "Sublimation ceramic, dishwasher safe.", bulkNote: "$5.5 at 50+", mockup: MOCK.mug, thumb: MOCK.mug },
  { id: "cap", line: "merch", name: "Cap", basePrice: 12, blurb: "6-panel, embroidered or printed.", bulkNote: "$10 at 50+", mockup: MOCK.cap, thumb: MOCK.cap },
  { id: "bottle", line: "merch", name: "Bottle 500ml", basePrice: 13, blurb: "Insulated stainless, 12h cold.", bulkNote: "$11 at 50+", mockup: MOCK.bottle, thumb: MOCK.bottle },
  { id: "glass", line: "merch", name: "Glass cup", basePrice: 6, blurb: "Tempered glass, UV cured print.", bulkNote: "$4.5 at 50+", mockup: MOCK.glass, thumb: MOCK.glass },
  { id: "pen", line: "merch", name: "Engraved pen", basePrice: 3, blurb: "Laser-engraved metal barrel.", bulkNote: "$2 at 50+", mockup: MOCK.pen, thumb: MOCK.pen },
];

export const LINES: { key: LineKey; title: string; titleKm: string; subtitle: string; accentVar: string; cover: string }[] = [
  {
    key: "acrylic",
    title: "Acrylic",
    titleKm: "អាគ្រីលីច",
    subtitle: "Line 01 — Objects you hold, stand, and keep.",
    accentVar: "var(--earth)",
    cover: U("photo-1611162617213-7d7a39e9b1d7", 1400, 900),
  },
  {
    key: "metal",
    title: "Metal",
    titleKm: "លោហៈ",
    subtitle: "Line 02 — Ultra-HD wall art. Premium.",
    accentVar: "var(--ink)",
    cover: U("photo-1513519245088-0e12902e5a38", 1400, 900),
  },
  {
    key: "merch",
    title: "Merch",
    titleKm: "ទំនិញ",
    subtitle: "Line 03 — Wearables, drinkware, everyday print.",
    accentVar: "var(--forest)",
    cover: U("photo-1521572163474-6864f9cf17ab", 1400, 900),
  },
];

export const STUDIO = {
  name: "Three Lines, One Studio",
  tagline: "Three lines. One studio. Built for Cambodia.",
  city: "Phnom Penh",
  showroom: "Toul Kork, Phnom Penh",
  facebook: "https://facebook.com/threelinesstudio",
  tiktok: "https://tiktok.com/@threelinesstudio",
  telegram: "https://t.me/threelinesstudio",
  // ⚠️ REPLACE with your real Telegram username (no @) before going live.
  telegramUsername: "REPLACE_WITH_MY_TELEGRAM_USERNAME",
};

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function productsByLine(line: LineKey) {
  return PRODUCTS.filter((p) => p.line === line);
}