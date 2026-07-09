import { useState, type ReactNode } from "react";
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

export function CategoryPage({ config, children }: { config: CategoryConfig; children?: ReactNode }) {
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
      <section className="relative h-[78svh] min-h-[560px] w-full overflow-hidden bg-noir text-white">
        <img src={config.hero} alt={config.title} className="absolute inset-0 h-full w-full object-cover tls-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85" />
        <div className="pointer-events-none absolute right-0 top-32 hidden h-48 w-px bg-gradient-to-b from-gold-bright/50 to-transparent sm:block" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-8 sm:pb-24">
          <div className="tls-fade-up flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
            <span className="h-px w-10 bg-gold-bright" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-bright">
              {config.eyebrow}
            </p>
          </div>
          <h1 className="tls-fade-up mt-7 max-w-4xl font-display text-6xl font-extrabold uppercase leading-[1.05] tracking-[-0.04em] pb-2 sm:text-8xl lg:text-[7.5rem]" style={{ animationDelay: "0.2s" }}>
            {lang === "km" ? config.titleKm : config.title}
          </h1>
          <p className="tls-fade-up mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg" style={{ animationDelay: "0.35s" }}>
            {t(config.tagline.en, config.tagline.km, lang)}
          </p>
        </div>
      </section>

      {/* Sticky subcategory filter */}
      <section className="sticky top-[68px] z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8">
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
      <section className="mx-auto max-w-3xl px-6 pt-24 text-center sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
          {t("The Collection", "បណ្ដុំ", lang)}
        </p>
        <p className="mt-6 text-lg font-normal leading-[1.6] tracking-[-0.005em] text-muted-foreground sm:text-xl">
          {t(config.intro.en, config.intro.km, lang)}
        </p>
      </section>

      {/* Subcategory cards */}
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-16 sm:px-8 sm:pb-40 sm:pt-20">
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border py-32 text-center">
            <Sparkles className="h-6 w-6 text-gold" />
            <p className="mt-4 font-display text-xl font-semibold">{t("Nothing to show yet.", "មិនទាន់មាន", lang)}</p>
          </div>
        ) : (
          <div className={filtered.length === 1
            ? "mx-auto grid max-w-5xl gap-8"
            : "grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"}>
            {filtered.map((c, i) => (
              <SubcategoryCard key={c.slug} c={c} lang={lang} featured={filtered.length === 1 || i === 0} />
            ))}
          </div>
        )}
      </section>

      {children}
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
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border/70 text-foreground/60 hover:border-foreground hover:text-foreground",
      ].join(" ")}
    >
      {label}
      {comingSoon && (
        <span className={["text-[9px] font-semibold uppercase tracking-[0.14em]", active ? "text-background/70" : "text-muted-foreground"].join(" ")}>
          Soon
        </span>
      )}
    </button>
  );
}

function SubcategoryCard({ c, lang, featured = false }: { c: Collection; lang: "en" | "km"; featured?: boolean }) {
  const isAvailable = c.status === "available";
  const inner = (
    <div className="tls-shadow-lift group relative block overflow-hidden rounded-[28px] bg-secondary">
      <div className={["relative overflow-hidden", featured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/5]"].join(" ")}>
        <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        {isAvailable ? (
          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
            {t("Available now", "មានហើយ", lang)}
          </span>
        ) : (
          <span className="absolute left-6 top-6 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md ring-1 ring-white/20">
            {t("Coming soon", "នឹងមកដល់", lang)}
          </span>
        )}
        <div className={["absolute inset-x-0 bottom-0 text-white", featured ? "p-8 sm:p-12" : "p-7"].join(" ")}>
          <h3 className={["font-display font-extrabold tracking-[-0.03em]", featured ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"].join(" ")}>
            {c.title}
          </h3>
          <p className={["mt-3 max-w-lg text-white/75", featured ? "text-base leading-relaxed sm:text-lg" : "line-clamp-2 text-sm"].join(" ")}>
            {c.shortDesc}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
            <span>
              {isAvailable
                ? `${c.templateCount} ${t("templates", "ទម្រង់", lang)} · ${t("from", "ចាប់ពី", lang)} $${c.priceFrom}`
                : t("Launching soon", "នឹងចាប់ផ្ដើម", lang)}
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-noir transition duration-300 group-hover:bg-gold group-hover:text-white">
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
