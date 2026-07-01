import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import coverMerch from "@/assets/cover-merch.jpg";

export const Route = createFileRoute("/merch")({
  head: () => ({ meta: [
    { title: "Merch — Three Lines Studio" },
    { name: "description", content: "Custom stickers, t-shirts, tote bags, mugs and engraved pens. Bulk-friendly branded merchandise from Phnom Penh." },
    { property: "og:title", content: "Merch — Three Lines Studio" },
    { property: "og:description", content: "Branded merchandise — stickers, apparel, drinkware and more." },
    { property: "og:image", content: coverMerch },
  ]}),
  component: () => (
    <CategoryPage
      config={{
        key: "merch",
        eyebrow: "Category 03 · Branded",
        title: "Merch",
        titleKm: "ទំនិញ",
        tagline: {
          en: "Everyday branded pieces — printed, embroidered and engraved.",
          km: "ទំនិញផ្ទាល់ខ្លួន បោះពុម្ព ខាត់ និងឆ្លាក់។",
        },
        intro: {
          en: "Stickers, tees, totes, mugs and engraved pens. Bulk pricing kicks in automatically at 50+ units. Full merchandise catalog launching soon.",
          km: "ស្ទីកឃ័រ អាវយឺត ថង់ កែវ និងប៊ិចឆ្លាក់។ តម្លៃបញ្ចុះចាប់ពី ៥០។",
        },
        hero: coverMerch,
      }}
    />
  ),
});