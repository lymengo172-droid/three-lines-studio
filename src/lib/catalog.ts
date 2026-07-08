import coverAcrylic from "@/assets/cover-acrylic.jpg";
import coverMetal from "@/assets/cover-metal.jpg";
import coverMerch from "@/assets/cover-merch.jpg";
import mockAcrylicPanel from "@/assets/mock-acrylic-panel.jpg";
import mockMetal from "@/assets/mock-metal.jpg";
import mockTshirt from "@/assets/mock-tshirt.jpg";
import mockTote from "@/assets/mock-tote.jpg";
import mockMug from "@/assets/mock-mug.jpg";
import mockCap from "@/assets/mock-cap.jpg";
import mockBottle from "@/assets/mock-bottle.jpg";
import mockGlass from "@/assets/mock-glass.jpg";
import mockPen from "@/assets/mock-pen.jpg";

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
  /** Auto-applied bulk pricing when quantity reaches `minQty`. */
  bulk?: { minQty: number; unitPrice: number };
  mockup: string; // background image of the bare product for the preview composite
  thumb: string;
  // Print area as percentages of the mockup image (where art is overlaid in the live preview).
  printArea?: { top: number; left: number; width: number; height: number; rounded?: number };
  /** When set, the customizer pre-filters the style gallery to this category. */
  defaultCategory?: Template["category"];
};

export type Template = {
  id: string;
  name: string;
  nameKm?: string;
  category:
    | "Teddy / Baby"
    | "Floral"
    | "Minimalist"
    | "Fan art / K-pop"
    | "Anime OC"
    | "Graduation"
    | "Pre-wedding / Couple"
    | "Family & Travel"
    | "Corporate / Logo";
  image: string;
};

const U = (q: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const MOCK = {
  acrylicPanel: mockAcrylicPanel,
  metalWall: mockMetal,
  tshirt: mockTshirt,
  tote: mockTote,
  mug: mockMug,
  cap: mockCap,
  bottle: mockBottle,
  glass: mockGlass,
  pen: mockPen,
};

export const TEMPLATES: Template[] = [
  // ── Acrylic Panel styles — layered die-cut layouts ──
  { id: "teddy-haru", name: "HARU · Teddy", category: "Teddy / Baby", image: U("photo-1559454403-b8fb88521f80", 800, 800) },
  { id: "teddy-cream", name: "Cream Bear", category: "Teddy / Baby", image: U("photo-1582722872445-44dc5f7e3c8f", 800, 800) },
  { id: "teddy-baby", name: "My Baby", category: "Teddy / Baby", image: U("photo-1519689680058-324335c77eba", 800, 800) },
  { id: "teddy-bee", name: "Little Bee", category: "Teddy / Baby", image: U("photo-1503454537195-1dcabb73ffb9", 800, 800) },
  { id: "floral-1", name: "Wildflower", category: "Floral", image: U("photo-1490750967868-88aa4486c946", 800, 800) },
  { id: "floral-2", name: "Peony Frame", category: "Floral", image: U("photo-1487530811176-3780de880c2d", 800, 800) },
  { id: "floral-3", name: "Pressed Botanical", category: "Floral", image: U("photo-1454425064867-19e0ec64472f", 800, 800) },
  { id: "min-1", name: "Single Frame", category: "Minimalist", image: U("photo-1494891848038-7bd202a2afeb", 800, 800) },
  { id: "min-2", name: "Type Only", category: "Minimalist", image: U("photo-1517816743773-6e0fd518b4a6", 800, 800) },
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
  // ── Acrylic — ONE flagship product, many styles ──
  {
    id: "acrylic-panel",
    line: "acrylic",
    name: "Acrylic Panel",
    nameKm: "ផ្ទាំងអាគ្រីលីច",
    blurb:
      "Layered clear-acrylic panel — your photos set inside cute die-cut shapes (teddy, florals, nameplates). Free-standing, A4 or A5.",
    basePrice: 25,
    sizes: [
      { id: "a5", label: "A5", dims: "14.8×21cm", price: 25 },
      { id: "a4", label: "A4", dims: "21×29.7cm", price: 35 },
    ],
    options: [
      { type: "toggle", id: "nameplate", label: "Add custom nameplate", priceDelta: 2, hint: "e.g. \"HARU\", \"my baby\"" },
      { type: "toggle", id: "stand", label: "Wood display stand", priceDelta: 3 },
    ],
    bulkNote: "−15% at 20+ panels",
    mockup: MOCK.acrylicPanel,
    thumb: MOCK.acrylicPanel,
    printArea: { top: 24, left: 25, width: 50, height: 53, rounded: 1 },
    defaultCategory: "Teddy / Baby",
  },

  // ── Metal ──
  {
    id: "metal-wall",
    line: "metal",
    name: "Metal Wall Print",
    nameKm: "ផ្ទាំងលោហៈ Ultra-HD",
    blurb: "Ultra-HD dye-sublimated aluminum. Light, vivid, will outlive the wall.",
    basePrice: 10,
    sizes: [
      { id: "m", label: "M", dims: "20×30cm", price: 10 },
      { id: "l", label: "L", dims: "30×40cm", price: 18 },
      { id: "xl", label: "XL", dims: "35×49cm", price: 23 },
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
    printArea: { top: 22, left: 20, width: 60, height: 56, rounded: 1 },
  },

  // ── Merch ──
  { id: "tshirt", line: "merch", name: "T-shirt", basePrice: 10, blurb: "Soft combed cotton, DTG print.", bulkNote: "$8 at 50+", bulk: { minQty: 50, unitPrice: 8 }, mockup: MOCK.tshirt, thumb: MOCK.tshirt,
    printArea: { top: 38, left: 38, width: 24, height: 28, rounded: 1 },
    options: [{ type: "select", id: "size", label: "Size", choices: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL", priceDelta: 1 }] }] },
  { id: "tote", line: "merch", name: "Tote bag", basePrice: 8, blurb: "12oz canvas, gusseted base.", bulkNote: "$6.5 at 50+", bulk: { minQty: 50, unitPrice: 6.5 }, mockup: MOCK.tote, thumb: MOCK.tote,
    printArea: { top: 50, left: 36, width: 28, height: 28, rounded: 1 } },
  { id: "mug", line: "merch", name: "Mug 11oz", basePrice: 7, blurb: "Sublimation ceramic, dishwasher safe.", bulkNote: "$5.5 at 50+", bulk: { minQty: 50, unitPrice: 5.5 }, mockup: MOCK.mug, thumb: MOCK.mug,
    printArea: { top: 42, left: 36, width: 24, height: 28, rounded: 1 } },
  { id: "cap", line: "merch", name: "Cap", basePrice: 12, blurb: "6-panel, embroidered or printed.", bulkNote: "$10 at 50+", bulk: { minQty: 50, unitPrice: 10 }, mockup: MOCK.cap, thumb: MOCK.cap,
    printArea: { top: 36, left: 41, width: 18, height: 18, rounded: 2 } },
  { id: "bottle", line: "merch", name: "Bottle 500ml", basePrice: 13, blurb: "Insulated stainless, 12h cold.", bulkNote: "$11 at 50+", bulk: { minQty: 50, unitPrice: 11 }, mockup: MOCK.bottle, thumb: MOCK.bottle,
    printArea: { top: 45, left: 45, width: 14, height: 30, rounded: 2 } },
  { id: "glass", line: "merch", name: "Glass cup", basePrice: 6, blurb: "Tempered glass, UV cured print.", bulkNote: "$4.5 at 50+", bulk: { minQty: 50, unitPrice: 4.5 }, mockup: MOCK.glass, thumb: MOCK.glass,
    printArea: { top: 42, left: 39, width: 22, height: 26, rounded: 1 } },
  { id: "pen", line: "merch", name: "Engraved pen", basePrice: 3, blurb: "Laser-engraved metal barrel.", bulkNote: "$2 at 50+", bulk: { minQty: 50, unitPrice: 2 }, mockup: MOCK.pen, thumb: MOCK.pen,
    printArea: { top: 42, left: 32, width: 36, height: 12, rounded: 999 } },
];

export const LINES: { key: LineKey; title: string; titleKm: string; subtitle: string; accentVar: string; cover: string }[] = [
  { key: "acrylic", title: "Acrylic", titleKm: "អាគ្រីលីច",
    subtitle: "Line 01 — Layered acrylic panels, set with your photos.",
    accentVar: "var(--gold-deep)", cover: coverAcrylic },
  { key: "metal", title: "Metal", titleKm: "លោហៈ",
    subtitle: "Line 02 — Ultra-HD wall art. Premium.",
    accentVar: "var(--gold)", cover: coverMetal },
  { key: "merch", title: "Merch", titleKm: "ទំនិញ",
    subtitle: "Line 03 — Wearables, drinkware, everyday print.",
    accentVar: "var(--gold-deep)", cover: coverMerch },
];

export const STUDIO = {
  name: "Kiri Studio",
  tagline: "Three lines. One studio. Built for Cambodia.",
  city: "Phnom Penh",
  showroom: "Toul Kork, Phnom Penh",
  facebook: "https://facebook.com/kiristudio",
  tiktok: "https://tiktok.com/@kiristudio",
  telegram: "https://t.me/kiristudio",
  // Owner's Telegram username (no @). Used to deep-link orders.
  telegramUsername: "lymengv",
};

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function productsByLine(line: LineKey) {
  return PRODUCTS.filter((p) => p.line === line);
}