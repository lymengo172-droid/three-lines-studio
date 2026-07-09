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
  { id: "photo-frame",   name: "Photo Frame",           nameKm: "ស៊ុមរូបភាព",         category: "Photo Frame",     categoryKm: "ស៊ុមរូបភាព",   image: U("photo-1513151233558-d860c5398176") },
  { id: "wall-sign",     name: "Wall Sign",             nameKm: "ផ្លាកជញ្ជាំង",       category: "Signage",         categoryKm: "ផ្លាកសញ្ញា",   image: U("photo-1503602642458-232111445657") },
  { id: "office-plate",  name: "Office Name Plate",     nameKm: "ផ្លាកឈ្មោះការិយាល័យ", category: "Name Plate",      categoryKm: "ផ្លាកឈ្មោះ",   image: U("photo-1497215728101-856f4ea42174") },
  { id: "reception",     name: "Reception Sign",        nameKm: "ផ្លាកទទួលភ្ញៀវ",     category: "Signage",         categoryKm: "ផ្លាកសញ្ញា",   image: U("photo-1541971875076-8f970d573be6") },
  { id: "qr-stand",      name: "QR Display Stand",      nameKm: "តម្កល់ QR",           category: "Display Stand",   categoryKm: "តម្កល់",       image: U("photo-1595079676601-f1adf5be5dee") },
  { id: "table-menu",    name: "Table Menu",            nameKm: "ម៉ឺនុយតុ",             category: "Menu Stand",      categoryKm: "តម្កល់ម៉ឺនុយ", image: U("photo-1552566626-52f8b828add9") },
  { id: "event-signage", name: "Event Signage",         nameKm: "ផ្លាកព្រឹត្តិការណ៍", category: "Signage",         categoryKm: "ផ្លាកសញ្ញា",   image: U("photo-1523580494863-6f3031224c94") },
  { id: "direction",     name: "Direction Sign",        nameKm: "ផ្លាកទិសដៅ",         category: "Signage",         categoryKm: "ផ្លាកសញ្ញា",   image: U("photo-1517646287270-a5a9ca602e5c") },
  { id: "award",         name: "Acrylic Award",         nameKm: "ពានរង្វាន់អាគ្រីលិក", category: "Award",           categoryKm: "ពានរង្វាន់",   image: U("photo-1567427017947-545c5f8d16ad") },
  { id: "product-stand", name: "Product Display Stand", nameKm: "តម្កល់ផលិតផល",       category: "Display Stand",   categoryKm: "តម្កល់",       image: U("photo-1556742049-0cfed4f6a45d") },
  { id: "door-sign",     name: "Door Sign",             nameKm: "ផ្លាកទ្វារ",         category: "Name Plate",      categoryKm: "ផ្លាកឈ្មោះ",   image: U("photo-1521207418485-99c705420785") },
  { id: "custom-shape",  name: "Custom Acrylic Shape",  nameKm: "រូបរាងផ្ទាល់ខ្លួន",   category: "Custom",          categoryKm: "ផ្ទាល់ខ្លួន", image: U("photo-1618221118493-9cfa1a1c00da") },
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

      <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 xl:grid-cols-6">
        {ACRYLIC_TEMPLATES.map((tpl) => (
          <Link
            key={tpl.id}
            to="/product/$line/$id"
            params={{ line: "acrylic", id: "acrylic-panel" }}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-[22px] bg-secondary tls-hairline tls-shadow-soft transition duration-500 group-hover:tls-shadow-lift">
              <img
                src={tpl.image}
                alt={tpl.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
              />
            </div>
            <div className="mt-3 px-1">
              <div className="truncate text-[13px] font-semibold tracking-tight text-foreground sm:text-[15px]">
                {lang === "km" ? tpl.nameKm : tpl.name}
              </div>
              <div className="mt-0.5 truncate text-[11px] font-normal text-muted-foreground sm:text-[12px]">
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