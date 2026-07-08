import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import coverAcrylic from "@/assets/cover-acrylic.jpg";

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
    />
  ),
});