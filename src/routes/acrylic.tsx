import { createFileRoute } from "@tanstack/react-router";
import { LinePage } from "@/components/site/LinePage";

export const Route = createFileRoute("/acrylic")({
  head: () => ({ meta: [
    { title: "Acrylic — Three Lines, One Studio" },
    { name: "description", content: "Acrylic photo blocks, standees, panels, keychains, magnets and shakers — custom-printed in Phnom Penh." },
    { property: "og:title", content: "Acrylic — Three Lines, One Studio" },
    { property: "og:description", content: "Line 01 — Objects you hold, stand, and keep." },
  ]}),
  component: () => <LinePage lineKey="acrylic" />,
});
