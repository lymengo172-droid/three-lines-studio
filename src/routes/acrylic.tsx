import { createFileRoute } from "@tanstack/react-router";
import { LinePage } from "@/components/site/LinePage";

export const Route = createFileRoute("/acrylic")({
  head: () => ({ meta: [
    { title: "Acrylic — Three Lines, One Studio" },
    { name: "description", content: "Custom layered acrylic panels (A4 / A5) — your photos set inside die-cut shapes. Designed and printed in Phnom Penh." },
    { property: "og:title", content: "Acrylic — Three Lines, One Studio" },
    { property: "og:description", content: "Line 01 — Layered acrylic panels, set with your photos." },
  ]}),
  component: () => <LinePage lineKey="acrylic" />,
});
