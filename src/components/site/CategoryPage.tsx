import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Shell } from "./Shell";
import { collectionsByParent, type ParentCategory, type Collection } from "@/lib/collections";
import { useStore, t } from "@/lib/store";

export type CategoryConfig = {
  key: ParentCategory;
  eyebrow: string;
  title: string;
  titleKm: string;
  tagline: { en: string; km: string };
  intro: { en: string; km: string };
  hero: string;
};

export function CategoryPage({ config }: { config: CategoryConfig }) {
  const { lang } = useStore();
  const collections = collectionsByParent(config.key);
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? collections
      : collections.filter((c) => c.slug === active);

  return (
    <Shell heroOverlay>
      {/* Hero */}
      <section className="relative h-[62svh] min-h-[440px] w-full overflow-hidden bg-noir text-white">
        <img src={config.hero} alt={config.title} className="absolute inset-0 h-full w-full object-cover tls-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/75" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-32">
          <p className="tls-fade-up text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-bright" style={{ animationDelay: "0.1s" }}>
            {config.eyebrow}
          </p>
          <h1 className="tls-fade-up mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-7xl" style={{ animationDelay: "0.2s" }}>
            {lang === "km" ? config.titleKm : config.title}
          </h1>
          <p className="tls-fade-up mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ animationDelay: "0.35s" }}>
            {t(config.tagline.en, config.tagline.km, lang)}
          </p>
        </div>
      </section>

      {/* Sticky subcategory filter */}
      <section className="sticky top-[68px] z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterChip label={t("All", "ទាំងអស់", lang)} active={active === "all"} onClick={() => setActive("all")} />
            {collections.map((c) => (
              <FilterChip
                key={c.slug}
                label={c.title}
                active={active === c.slug}
                onClick={() => setActive(c.slug)}
                comingSoon={c.status === "coming-soon"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 pt-14 text-center">
        <p className="text-base leading-relaxed text-muted-foreground">
          {t(config.intro.en, config.intro.km, lang)}
        </p>
      </section>

      {/* Subcategory cards */}
      <section className="mx-auto max-w-7xl px-5 pb-28 pt-12">
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border py-24 text-center">
            <Sparkles className="h-6 w-6 text-gold" />
            <p className="mt-4 font-display text-xl font-semibold">{t("Nothing to show yet.", "មិនទាន់មាន", lang)}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <SubcategoryCard key={c.slug} c={c} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  comingSoon = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  comingSoon?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-medium tracking-wide transition",
        active
          ? "border-gold bg-gold text-white"
          : "border-border text-foreground/70 hover:border-foreground hover:text-foreground",
      ].join(" ")}
    >
      {label}
      {comingSoon && (
        <span className={["text-[9px] font-semibold uppercase tracking-[0.14em]", active ? "text-white/80" : "text-muted-foreground"].join(" ")}>
          Soon
        </span>
      )}
    </button>
  );
}

function SubcategoryCard({ c, lang }: { c: Collection; lang: "en" | "km" }) {
  const isAvailable = c.status === "available";
  const inner = (
    <div className="tls-zoom group relative block overflow-hidden rounded-3xl bg-secondary">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {isAvailable ? (
          <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {t("Available now", "មានហើយ", lang)}
          </span>
        ) : (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">
            {t("Coming soon", "នឹងមកដល់", lang)}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h3 className="font-display text-2xl font-bold tracking-tight">{c.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/80">{c.shortDesc}</p>
          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span>
              {isAvailable
                ? `${c.templateCount} ${t("templates", "ទម្រង់", lang)} · ${t("from", "ចាប់ពី", lang)} $${c.priceFrom}`
                : t("Launching soon", "នឹងចាប់ផ្ដើម", lang)}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-gold">
              {isAvailable ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link to="/collections/$slug" params={{ slug: c.slug }} className="block">
      {inner}
    </Link>
  );
}
