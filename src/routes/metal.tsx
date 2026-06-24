import { createFileRoute } from "@tanstack/react-router";
import { LinePage } from "@/components/site/LinePage";

export const Route = createFileRoute("/metal")({
  head: () => ({ meta: [
    { title: "Metal Wall Art — Three Lines, One Studio" },
    { name: "description", content: "Ultra-HD aluminum prints with optional magnetic mount. No nails, no holes — rental friendly." },
    { property: "og:title", content: "Metal — Three Lines, One Studio" },
    { property: "og:description", content: "Line 02 — Ultra-HD wall art. Premium." },
  ]}),
  component: () => <LinePage lineKey="metal" />,
});
