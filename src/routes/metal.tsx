import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import coverMetal from "@/assets/cover-metal.jpg";

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
    />
  ),
});