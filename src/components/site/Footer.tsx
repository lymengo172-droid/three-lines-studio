import { STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Send } from "lucide-react";

export function Footer() {
  const { lang } = useStore();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-extrabold tracking-tight">
              Three Lines <span className="text-gold">·</span> Studio
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t(
                "Premium laser engraving, UV printing, and personalized creations — handcrafted in Phnom Penh for every occasion.",
                "ការឆ្លាក់ឡាស៊ែរ និងបោះពុម្ព UV ប្រណិត ផលិតនៅភ្នំពេញ។",
                lang,
              )}
            </p>
            <div className="mt-6 flex gap-2">
              <a href={STUDIO.facebook} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 transition hover:border-gold hover:text-gold" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={STUDIO.telegram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 transition hover:border-gold hover:text-gold" aria-label="Telegram">
                <Send className="h-4 w-4" />
              </a>
              <a href={STUDIO.tiktok} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 transition hover:border-gold hover:text-gold" aria-label="TikTok">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          <FooterCol title={t("Explore", "រុករក", lang)} items={[
            { label: t("Products", "ផលិតផល", lang), to: "/acrylic" },
            { label: t("Custom Orders", "បញ្ជាទិញ", lang), to: "/b2b" },
            { label: t("Gallery", "វិចិត្រសាល", lang), to: "/gallery" },
            { label: t("About", "អំពីយើង", lang), to: "/about" },
          ]} />
          <FooterCol title={t("Categories", "ប្រភេទ", lang)} items={[
            { label: "Acrylic", to: "/acrylic" },
            { label: "Metal Wall Art", to: "/metal" },
            { label: "Custom Merch", to: "/merch" },
            { label: "Bulk / B2B", to: "/b2b" },
          ]} />
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t("Visit", "ទស្សនា", lang)}
            </h4>
            <p className="mt-3 text-sm">{STUDIO.showroom}</p>
            <p className="text-sm text-muted-foreground">{t("Mon–Sat, 9am–7pm", "ច័ន្ទ–សៅរ៍ ៩:០០–១៩:០០", lang)}</p>
            <p className="mt-3 text-sm text-muted-foreground">ABA · KHQR · COD</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} {STUDIO.name}. {t("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។", lang)}</p>
          <p>{t("Crafted in Phnom Penh", "ផលិតនៅភ្នំពេញ", lang)}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.to + it.label}>
            <Link to={it.to as "/"} className="text-foreground/80 transition hover:text-gold">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}