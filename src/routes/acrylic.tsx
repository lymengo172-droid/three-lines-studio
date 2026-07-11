import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import coverAcrylic from "@/assets/cover-acrylic.jpg";
import { useStore, t } from "@/lib/store";

const U = (q: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

type AcrylicTemplate = {
  id: string;
  name: string;
  nameKm: string;
  category: string;
  categoryKm: string;
  image: string;
};

const ACRYLIC_TEMPLATES: AcrylicTemplate[] = [
  { id: "keychain",   name: "Acrylic Keychain",  nameKm: "ខ្សែសោអាគ្រីលិក",    category: "Keychain",      categoryKm: "ខ្សែសោ",         image: U("photo-1600185365483-26d7a4cc7519") },
  { id: "stand",      name: "Acrylic Stand",     nameKm: "តម្កល់អាគ្រីលិក",    category: "Display Stand", categoryKm: "តម្កល់",         image: U("photo-1556742049-0cfed4f6a45d") },
  { id: "nameplate",  name: "Acrylic Nameplate", nameKm: "ផ្លាកឈ្មោះអាគ្រីលិក", category: "Nameplate",     categoryKm: "ផ្លាកឈ្មោះ",     image: U("photo-1497215728101-856f4ea42174") },
  { id: "sign",       name: "Acrylic Sign",      nameKm: "ផ្លាកសញ្ញាអាគ្រីលិក", category: "Signage",       categoryKm: "ផ្លាកសញ្ញា",     image: U("photo-1503602642458-232111445657") },
  { id: "qr-stand",   name: "Acrylic QR Stand",  nameKm: "តម្កល់ QR",           category: "QR Stand",      categoryKm: "តម្កល់ QR",      image: U("photo-1595079676601-f1adf5be5dee") },
  { id: "award",      name: "Acrylic Award",     nameKm: "ពានរង្វាន់អាគ្រីលិក", category: "Award",         categoryKm: "ពានរង្វាន់",     image: U("photo-1567427017947-545c5f8d16ad") },
  { id: "menu",       name: "Acrylic Menu",      nameKm: "ម៉ឺនុយអាគ្រីលិក",     category: "Menu Stand",    categoryKm: "តម្កល់ម៉ឺនុយ",   image: U("photo-1552566626-52f8b828add9") },
  { id: "display",    name: "Acrylic Display",   nameKm: "ការតាំងបង្ហាញ",       category: "Display",       categoryKm: "តាំងបង្ហាញ",     image: U("photo-1513151233558-d860c5398176") },
  { id: "photo-block",name: "Acrylic Photo Block", nameKm: "ប្លុករូបភាព",        category: "Photo",         categoryKm: "រូបភាព",         image: U("photo-1541971875076-8f970d573be6") },
];

function TemplateGallery() {
  const { lang } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-8 sm:pb-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
          {t("Template Gallery", "គំរូផលិតផលអាគ្រីលិក", lang)}
        </p>
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
          {t("Browse popular acrylic templates", "គំរូអាគ្រីលិកពេញនិយម", lang)}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t(
            "Browse our most popular acrylic templates and customize them to match your brand.",
            "ជ្រើសរើសគំរូដែលអ្នកចូលចិត្ត ហើយកែតម្រូវឱ្យសមនឹងម៉ាករបស់អ្នក។",
            lang,
          )}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:gap-6 lg:gap-8">
        {ACRYLIC_TEMPLATES.map((tpl) => (
          <Link
            key={tpl.id}
            to="/product/$line/$id"
            params={{ line: "acrylic", id: "acrylic-panel" }}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-[20px] bg-secondary tls-hairline tls-shadow-soft tls-shadow-lift">
              <img
                src={tpl.image}
                alt={tpl.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="mt-4 px-1 text-center sm:text-left">
              <div className="truncate text-[13px] font-semibold tracking-tight text-foreground sm:text-[15px]">
                {lang === "km" ? tpl.nameKm : tpl.name}
              </div>
              <div className="mt-1 truncate text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
                {lang === "km" ? tpl.categoryKm : tpl.category}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/acrylic")({
  head: () => ({ meta: [
    { title: "Acrylic — Kiri Studio" },
    { name: "description", content: "Premium custom acrylic keychains, stands, photo blocks, LED signs and magnets. Designed and printed in Phnom Penh." },
    { property: "og:title", content: "Acrylic — Kiri Studio" },
    { property: "og:description", content: "Flagship acrylic category — keychains, stands, LED signs and more." },
    { property: "og:image", content: coverAcrylic },
  ]}),
  component: () => (
    <CategoryPage
      config={{
        key: "acrylic",
        eyebrow: "Category 01 · Flagship",
        title: "Acrylic",
        titleKm: "អាគ្រីលីច",
        tagline: {
          en: "Cast acrylic, UV-printed and hand-finished. Our flagship craft.",
          km: "អាគ្រីលីច ចាក់ពុម្ព បោះពុម្ព UV និងបញ្ចប់ដោយដៃ។",
        },
        intro: {
          en: "Explore our acrylic subcategories — from our flagship keychain gallery to stands, LED signs and more. New collections are added regularly.",
          km: "រុករកបណ្ដុំអាគ្រីលីច — ខ្សែសោ តម្កល់ ផ្លាកសញ្ញា LED និងច្រើនទៀត។",
        },
        hero: coverAcrylic,
      }}
    >
      <TemplateGallery />
    </CategoryPage>
  ),
});