import { createFileRoute } from "@tanstack/react-router";
import { LinePage } from "@/components/site/LinePage";

export const Route = createFileRoute("/merch")({
  head: () => ({ meta: [
    { title: "Custom Merch — Three Lines, One Studio" },
    { name: "description", content: "T-shirts, totes, mugs, caps, bottles, glassware and engraved pens — bulk friendly." },
    { property: "og:title", content: "Merch — Three Lines, One Studio" },
    { property: "og:description", content: "Line 03 — Wearables, drinkware, everyday print." },
  ]}),
  component: () => <LinePage lineKey="merch" />,
});
