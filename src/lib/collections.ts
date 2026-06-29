import imgKeychain from "@/assets/mock-keychain.jpg";
import imgMetal from "@/assets/cover-metal.jpg";
import imgPanel from "@/assets/mock-acrylic-panel.jpg";
import imgStandee from "@/assets/mock-acrylic-standee.jpg";
import imgBlock from "@/assets/mock-acrylic-block.jpg";
import imgAcrylic from "@/assets/cover-acrylic.jpg";

const U = (q: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type CollectionStatus = "available" | "coming-soon";

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
};

export type TemplateCategory =
  | "Anime" | "Couple" | "Pet" | "Minimal" | "Business"
  | "Birthday" | "Graduation" | "Wedding" | "Cute" | "Gaming" | "Seasonal";

export type KeychainTemplate = {
  id: string;
  collection: string; // collection slug
  title: string;
  category: TemplateCategory;
  image: string;
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
  {
    slug: "acrylic-keychains",
    title: "Acrylic Keychains",
    shortDesc:
      "Hundreds of customizable acrylic keychain templates for gifts, fans, pets, couples, businesses, and every special occasion.",
    longDesc:
      "Our flagship collection. Premium 3mm cast acrylic, UV-printed in full colour, finished with a polished edge and stainless ring. Designed in-studio in Phnom Penh.",
    cover: imgKeychain,
    status: "available",
    templateCount: 24,
    priceFrom: 4,
    material: "3mm cast acrylic",
  },
  {
    slug: "metal-collection",
    title: "Metal Collection",
    shortDesc: "Ultra-HD dye-sublimated aluminium prints, brushed nameplates, and engraved metal keepsakes.",
    longDesc: "Premium aluminium pieces with archival print quality. Launching soon.",
    cover: imgMetal,
    status: "coming-soon",
    templateCount: 0,
    priceFrom: 18,
    material: "Aluminium",
  },
  { slug: "acrylic-stands", title: "Acrylic Stands", shortDesc: "Die-cut character and photo stands with bevelled bases.", longDesc: "Custom acrylic standees.", cover: imgStandee, status: "coming-soon", templateCount: 0, priceFrom: 8, material: "5mm acrylic" },
  { slug: "acrylic-photo-blocks", title: "Acrylic Photo Blocks", shortDesc: "Solid acrylic blocks with crystal-clear photo prints.", longDesc: "Photo blocks.", cover: imgBlock, status: "coming-soon", templateCount: 0, priceFrom: 22, material: "20mm acrylic" },
  { slug: "led-acrylic-signs", title: "LED Acrylic Signs", shortDesc: "Glow-edge acrylic signs with warm and cool light options.", longDesc: "LED signs.", cover: imgPanel, status: "coming-soon", templateCount: 0, priceFrom: 38, material: "Acrylic + LED base" },
  { slug: "name-plates", title: "Name Plates", shortDesc: "Personal and office name plates in acrylic or brushed metal.", longDesc: "Name plates.", cover: imgAcrylic, status: "coming-soon", templateCount: 0, priceFrom: 12, material: "Acrylic or metal" },
  { slug: "metal-wall-art", title: "Metal Wall Art", shortDesc: "Large-format Ultra-HD metal prints for walls that deserve more.", longDesc: "Wall art.", cover: imgMetal, status: "coming-soon", templateCount: 0, priceFrom: 28, material: "Aluminium" },
  { slug: "office-signs", title: "Office Signs", shortDesc: "Reception logos, door signs, wayfinding — engraved or printed.", longDesc: "Office signage.", cover: imgStandee, status: "coming-soon", templateCount: 0, priceFrom: 25, material: "Acrylic or metal" },
  { slug: "home-decor", title: "Home Décor", shortDesc: "Curated home pieces — photo frames, ornaments, decorative panels.", longDesc: "Home décor.", cover: imgPanel, status: "coming-soon", templateCount: 0, priceFrom: 15, material: "Mixed" },
];

const K = (q: string) => U(q, 900, 1100);

export const KEYCHAIN_TEMPLATES: KeychainTemplate[] = [
  { id: "k-anime-1", collection: "acrylic-keychains", title: "Shoujo Portrait",   category: "Anime",   image: K("photo-1578632767115-351597cf2477"), popular: true, difficulty: "Easy", priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Anime fans · OC commissions" },
  { id: "k-anime-2", collection: "acrylic-keychains", title: "Chibi Pose",        category: "Anime",   image: K("photo-1604079628040-94301bb21b91"), difficulty: "Easy", priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Anime OC, fan-art" },
  { id: "k-anime-3", collection: "acrylic-keychains", title: "Idol Stage",        category: "Anime",   image: K("photo-1493225457124-a3eb161ffa5f"), priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "K-pop merch, fan gifts" },
  { id: "k-couple-1", collection: "acrylic-keychains", title: "His & Hers",       category: "Couple",  image: K("photo-1519741497674-611481863552"), popular: true, difficulty: "Easy", priceFrom: 8, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Anniversaries, gifts" },
  { id: "k-couple-2", collection: "acrylic-keychains", title: "Golden Hour",      category: "Couple",  image: K("photo-1511285560929-80b456fea0bc"), priceFrom: 8, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Couples, engagements" },
  { id: "k-pet-1",    collection: "acrylic-keychains", title: "Pet Portrait",     category: "Pet",     image: K("photo-1543466835-00a7907e9de1"), popular: true, difficulty: "Medium", priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + die-cut", productionTime: "3–5 days", recommendedUse: "Dogs, cats, all good boys" },
  { id: "k-pet-2",    collection: "acrylic-keychains", title: "Cat Silhouette",   category: "Pet",     image: K("photo-1514888286974-6c03e2ca1dba"), priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Cat lovers" },
  { id: "k-min-1",    collection: "acrylic-keychains", title: "Single Initial",   category: "Minimal", image: K("photo-1494891848038-7bd202a2afeb"), difficulty: "Easy", priceFrom: 4, material: "3mm cast acrylic", productionMethod: "Laser engrave", productionTime: "2–3 days", recommendedUse: "Everyday carry" },
  { id: "k-min-2",    collection: "acrylic-keychains", title: "Type Only",        category: "Minimal", image: K("photo-1517816743773-6e0fd518b4a6"), priceFrom: 4, material: "3mm cast acrylic", productionMethod: "Laser engrave", productionTime: "2–3 days", recommendedUse: "Minimalists" },
  { id: "k-min-3",    collection: "acrylic-keychains", title: "Outlined Circle",  category: "Minimal", image: K("photo-1499951360447-b19be8fe80f5"), priceFrom: 4, material: "3mm cast acrylic", productionMethod: "Laser engrave", productionTime: "2–3 days", recommendedUse: "Everyday gifts" },
  { id: "k-biz-1",    collection: "acrylic-keychains", title: "Logo Mark",        category: "Business",image: K("photo-1611162617213-7d7a39e9b1d7"), popular: true, difficulty: "Medium", priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "5–7 days", recommendedUse: "Corporate gifts, swag" },
  { id: "k-biz-2",    collection: "acrylic-keychains", title: "Brand Wordmark",   category: "Business",image: K("photo-1542744095-291d1f67b221"), priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "5–7 days", recommendedUse: "Conferences, launches" },
  { id: "k-bday-1",   collection: "acrylic-keychains", title: "Birthday Bear",    category: "Birthday",image: K("photo-1559454403-b8fb88521f80"), difficulty: "Easy", priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + die-cut", productionTime: "3–5 days", recommendedUse: "Kids parties" },
  { id: "k-bday-2",   collection: "acrylic-keychains", title: "Confetti Cake",    category: "Birthday",image: K("photo-1464349095431-e9a21285b5f3"), priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Birthday favours" },
  { id: "k-grad-1",   collection: "acrylic-keychains", title: "Class of 2026",    category: "Graduation", image: K("photo-1523050854058-8df90110c9f1"), popular: true, priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "5–7 days", recommendedUse: "Graduation keepsakes" },
  { id: "k-grad-2",   collection: "acrylic-keychains", title: "Cap Toss",         category: "Graduation", image: K("photo-1627556704290-2b1f5853ff78"), priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "5–7 days", recommendedUse: "Graduation gifts" },
  { id: "k-wed-1",    collection: "acrylic-keychains", title: "Wedding Favour",   category: "Wedding", image: K("photo-1519225421980-715cb0215aed"), popular: true, priceFrom: 7, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "7–10 days", recommendedUse: "Wedding favours" },
  { id: "k-wed-2",    collection: "acrylic-keychains", title: "Save the Date",    category: "Wedding", image: K("photo-1465495976277-4387d4b0e4a6"), priceFrom: 7, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "7–10 days", recommendedUse: "Wedding favours" },
  { id: "k-cute-1",   collection: "acrylic-keychains", title: "Pastel Daisy",     category: "Cute",    image: K("photo-1490750967868-88aa4486c946"), difficulty: "Easy", priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Friends, students" },
  { id: "k-cute-2",   collection: "acrylic-keychains", title: "Little Bee",       category: "Cute",    image: K("photo-1503454537195-1dcabb73ffb9"), priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Kids, party favours" },
  { id: "k-gam-1",    collection: "acrylic-keychains", title: "Pixel Hero",       category: "Gaming",  image: K("photo-1542751371-adc38448a05e"), popular: true, priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Gamers, esports" },
  { id: "k-gam-2",    collection: "acrylic-keychains", title: "Controller Charm", category: "Gaming",  image: K("photo-1493711662062-fa541adb3fc8"), priceFrom: 6, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Gaming gifts" },
  { id: "k-season-1", collection: "acrylic-keychains", title: "Cherry Blossom",   category: "Seasonal",image: K("photo-1522383225653-ed111181a951"), priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Spring, gifts" },
  { id: "k-season-2", collection: "acrylic-keychains", title: "Winter Pine",      category: "Seasonal",image: K("photo-1482517967863-00e15c9b44be"), priceFrom: 5, material: "3mm cast acrylic", productionMethod: "UV print + laser cut", productionTime: "3–5 days", recommendedUse: "Holiday gifting" },
];

export const KEYCHAIN_CATEGORIES: TemplateCategory[] = [
  "Anime","Couple","Pet","Minimal","Business","Birthday","Graduation","Wedding","Cute","Gaming","Seasonal",
];

export function collectionBySlug(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}
export function templatesByCollection(slug: string) {
  return KEYCHAIN_TEMPLATES.filter((t) => t.collection === slug);
}
export function templateById(id: string) {
  return KEYCHAIN_TEMPLATES.find((t) => t.id === id);
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