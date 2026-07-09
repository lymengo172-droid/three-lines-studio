import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import coverMetal from "@/assets/cover-metal.jpg";
import { useStore, t } from "@/lib/store";

const U = (q: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

type MetalTemplate = {
  id: string;
  name: string;
  nameKm: string;
  category: string;
  categoryKm: string;
  image: string;
};

const METAL_TEMPLATES: MetalTemplate[] = [
  { id: "wall-art",       name: "Ultra-HD Wall Art",     nameKm: "រូបផ្ទាំងជញ្ជាំង",     category: "Wall Art",       categoryKm: "រូបផ្ទាំង",       image: U("photo-1513475382585-d06e58bcb0e0") },
  { id: "office-plate",   name: "Office Name Plate",     nameKm: "ផ្លាកឈ្មោះការិយាល័យ",  category: "Name Plate",     categoryKm: "ផ្លាកឈ្មោះ",     image: U("photo-1497215728101-856f4ea42174") },
  { id: "business-card",  name: "Metal Business Card",   nameKm: "កាតធុរកិច្ចលោហៈ",       category: "Business Card",  categoryKm: "កាតធុរកិច្ច",     image: U("photo-1450101499163-c8848c66ca85") },
  { id: "storefront",     name: "Storefront Sign",       nameKm: "ផ្លាកហាង",              category: "Signage",        categoryKm: "ផ្លាកសញ្ញា",     image: U("photo-1441986300917-64674bd600d8") },
  { id: "logo-plaque",    name: "Logo Plaque",           nameKm: "ផ្លាកឡូហ្គោ",           category: "Signage",        categoryKm: "ផ្លាកសញ្ញា",     image: U("photo-1611162617213-7d7a39e9b1d7") },
  { id: "photo-panel",    name: "Photo Panel",           nameKm: "ផ្ទាំងរូបភាព",          category: "Wall Art",       categoryKm: "រូបផ្ទាំង",       image: U("photo-1520962880247-cfaf541c8724") },
  { id: "award-plaque",   name: "Award Plaque",          nameKm: "ពានរង្វាន់លោហៈ",        category: "Award",          categoryKm: "ពានរង្វាន់",     image: U("photo-1567427017947-545c5f8d16ad") },
  { id: "door-plate",     name: "Door Plate",            nameKm: "ផ្លាកទ្វារ",            category: "Name Plate",     categoryKm: "ផ្លាកឈ្មោះ",     image: U("photo-1521207418485-99c705420785") },
  { id: "directional",    name: "Directional Sign",      nameKm: "ផ្លាកទិសដៅ",            category: "Signage",        categoryKm: "ផ្លាកសញ្ញា",     image: U("photo-1517646287270-a5a9ca602e5c") },
  { id: "menu-board",     name: "Metal Menu Board",      nameKm: "ក្ដារម៉ឺនុយលោហៈ",        category: "Menu Stand",     categoryKm: "តម្កល់ម៉ឺនុយ",   image: U("photo-1552566626-52f8b828add9") },
  { id: "triptych",       name: "Triptych Wall Set",     nameKm: "រូបផ្ទាំងបីផ្នែក",     category: "Wall Art",       categoryKm: "រូបផ្ទាំង",       image: U("photo-1470071459604-3b5ec3a7fe05") },
  { id: "custom-shape",   name: "Custom Metal Shape",    nameKm: "រូបរាងលោហៈផ្ទាល់ខ្លួន", category: "Custom",         categoryKm: "ផ្ទាល់ខ្លួន",   image: U("photo-1618221118493-9cfa1a1c00da") },
];

function TemplateGallery() {
  const { lang } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-8 sm:pb-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
          {t("Template Gallery", "គំរូផលិតផលលោហៈ", lang)}
        </p>
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
          {t("Browse popular metal templates", "គំរូលោហៈពេញនិយម", lang)}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t(
            "Browse our most popular metal templates and customize them to match your brand.",
            "ជ្រើសរើសគំរូដែលអ្នកចូលចិត្ត ហើយកែតម្រូវឱ្យសមនឹងម៉ាករបស់អ្នក។",
            lang,
          )}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 xl:grid-cols-6">
        {METAL_TEMPLATES.map((tpl) => (
          <Link
            key={tpl.id}
            to="/product/$line/$id"
            params={{ line: "metal", id: "metal-wall" }}
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

export const Route = createFileRoute("/metal")({
  head: () => ({ meta: [
    { title: "Metal (Aluminum) — Kiri Studio" },
    { name: "description", content: "Aluminum signs, name plates, wall art and business cards — engraved and Ultra-HD printed in Phnom Penh." },
    { property: "og:title", content: "Metal (Aluminum) — Kiri Studio" },
    { property: "og:description", content: "Premium aluminum pieces — signs, name plates, wall art and more." },
    { property: "og:image", content: coverMetal },
  ]}),
  component: () => (
    <CategoryPage
      config={{
        key: "metal",
        eyebrow: "Category 02 · Aluminum",
        title: "Metal",
        titleKm: "លោហៈ",
        tagline: {
          en: "Aircraft-grade aluminum — etched, printed and finished for a lifetime.",
          km: "លោហៈ អាលុយមីញ៉ូម ឆ្លាក់ បោះពុម្ព ស្ថិតស្ថេរយូរឆ្នាំ។",
        },
        intro: {
          en: "Aluminum signs, name plates, Ultra-HD wall art and metal business cards. Full collection launching soon — request an early quote to start now.",
          km: "ផ្លាកសញ្ញា ឈ្មោះ រូបផ្ទាំង និងកាតធុរកិច្ចលោហៈ។ នឹងចាប់ផ្ដើមឆាប់ៗ។",
        },
        hero: coverMetal,
      }}
    >
      <TemplateGallery />
    </CategoryPage>
  ),
});