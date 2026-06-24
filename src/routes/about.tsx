import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Three Lines, One Studio" },
    { name: "description", content: "A quiet, premium custom-print studio in Toul Kork, Phnom Penh." },
    { property: "og:title", content: "About — Three Lines, One Studio" },
    { property: "og:description", content: "A quiet, premium custom-print studio in Toul Kork, Phnom Penh." },
  ]}),
  component: About,
});

function About() {
  const { lang } = useStore();
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 pt-12 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("About", "អំពីយើង", lang)}</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{t("Quiet work. Loud results.", "ស្ងាត់ៗ។ លទ្ធផលច្បាស់។", lang)}</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
          <p>{t("Three Lines, One Studio is a custom-print studio in Phnom Penh. We run three product lines under one roof: acrylic objects, ultra-HD metal wall art, and custom merch.", "Three Lines, One Studio ជាស្ទូឌីយោបោះពុម្ពតាមតម្រូវនៅភ្នំពេញ។", lang)}</p>
          <p>{t("We don't run sales banners or shout discounts. We print like we'd hang it on our own wall — and we let the product do the talking.", "យើងមិនធ្វើការផ្សាយពាណិជ្ជកម្មខ្លាំងៗទេ។ យើងបោះពុម្ពដូចជាដាក់នៅផ្ទះយើងផ្ទាល់។", lang)}</p>
          <p>{t("Visit the showroom in Toul Kork to see the actual finish before you order — or message us on Telegram and we'll send you reference photos of any product.", "អញ្ជើញមកមើលនៅ Toul Kork ឬផ្ញើសារតាម Telegram។", lang)}</p>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Showroom", "បង្ហាញផលិតផល", lang)}</div>
          <div className="mt-2 text-lg font-semibold">{STUDIO.showroom}</div>
          <div className="text-sm text-muted-foreground">{t("Open Mon–Sat, 9am–7pm", "ច័ន្ទ–សៅរ៍ ៩:០០–១៩:០០", lang)}</div>
        </div>
      </div>
    </Shell>
  );
}
