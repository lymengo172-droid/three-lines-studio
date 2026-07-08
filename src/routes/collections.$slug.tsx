import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { collectionBySlug, templatesByCollection, categoriesForCollection, type TemplateCategory, type KeychainTemplate } from "@/lib/collections";
import { useMemo, useState } from "react";
import { Heart, Search, ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const c = collectionBySlug(params.slug);
    const title = c ? `${c.title} — Kiri Studio` : "Collection — Kiri Studio";
    return { meta: [
      { title },
      { name: "description", content: c?.shortDesc ?? "Custom design collection." },
      { property: "og:title", content: title },
      { property: "og:description", content: c?.shortDesc ?? "Custom design collection." },
      ...(c ? [{ property: "og:image", content: c.cover }] : []),
    ]};
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = useParams({ from: "/collections/$slug" });
  const collection = collectionBySlug(slug);

  if (!collection) {
    return <Shell><div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-display text-3xl font-bold">Collection not found</h1><Link to="/collections" className="mt-4 inline-block underline">All collections</Link></div></Shell>;
  }

  if (collection.status === "coming-soon") {
    return (
      <Shell>
        <section className="mx-auto max-w-5xl px-5 pt-28 pb-24 text-center">
          <span className="rounded-full bg-foreground px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-background">Coming soon</span>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">{collection.title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">{collection.longDesc}</p>
          <img src={collection.cover} alt={collection.title} className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/b2b" className="tls-lift inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background">Request early quote <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/collections" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold">All collections</Link>
          </div>
        </section>
      </Shell>
    );
  }

  return (
    <KeychainGallery
      slug={slug}
      collectionTitle={collection.title}
      collectionDesc={collection.longDesc}
      templates={templatesByCollection(slug)}
      noir={collection.parent === "metal"}
    />
  );
}

function KeychainGallery({ slug, collectionTitle, collectionDesc, templates, noir }: { slug: string; collectionTitle: string; collectionDesc: string; templates: KeychainTemplate[]; noir?: boolean }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TemplateCategory[]>([]);
  const { isFavorite, toggleFavorite } = useStore();
  const categories = useMemo(() => categoriesForCollection(slug), [slug]);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (active.length > 0 && !active.includes(t.category)) return false;
      if (query && !`${t.title} ${t.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [templates, active, query]);

  const toggle = (cat: TemplateCategory) =>
    setActive((a) => a.includes(cat) ? a.filter((x) => x !== cat) : [...a, cat]);

  const wrapper = noir ? "bg-noir text-white" : "";
  return (
    <Shell>
     <div className={wrapper}>
      <section className="mx-auto max-w-7xl px-5 pt-24 pb-8 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{noir ? "Metal collection" : "Flagship collection"}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">{collectionTitle}</h1>
        <p className={["mt-5 max-w-xl text-base", noir ? "text-white/70" : "text-muted-foreground"].join(" ")}>{collectionDesc}</p>
      </section>

      <section className={["sticky top-[68px] z-20 border-y", noir ? "border-white/10 bg-noir/85" : "border-border bg-background/85", "backdrop-blur"].join(" ")}>
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className={["pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2", noir ? "text-white/50" : "text-muted-foreground"].join(" ")} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates…"
                className={["h-11 w-full rounded-full border pl-11 pr-4 text-sm outline-none transition focus:border-gold", noir ? "border-white/15 bg-white/5 text-white placeholder:text-white/40" : "border-border bg-background"].join(" ")}
              />
            </div>
            <div className={["text-xs sm:ml-3", noir ? "text-white/60" : "text-muted-foreground"].join(" ")}>{filtered.length} of {templates.length}</div>
          </div>
          {categories.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const on = active.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-wide transition",
                    on
                      ? "border-gold bg-gold text-white"
                      : noir
                        ? "border-white/15 text-white/70 hover:border-white hover:text-white"
                        : "border-border text-foreground/70 hover:border-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
            {active.length > 0 && (
              <button onClick={() => setActive([])} className={["ml-1 text-[12px] font-medium underline", noir ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"].join(" ")}>Clear</button>
            )}
          </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 pt-8">
        {filtered.length === 0 ? (
          <div className={["grid place-items-center rounded-3xl border border-dashed py-24 text-center", noir ? "border-white/15" : "border-border"].join(" ")}>
            <Sparkles className="h-6 w-6 text-gold" />
            <p className="mt-4 font-display text-xl font-semibold">No templates match those filters.</p>
            <button onClick={() => { setActive([]); setQuery(""); }} className="mt-3 text-sm underline">Reset filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((tpl) => (
              <TemplateCard key={tpl.id} t={tpl} fav={isFavorite(tpl.id)} onFav={() => toggleFavorite(tpl.id)} noir={noir} />
            ))}
          </div>
        )}
      </section>
     </div>
    </Shell>
  );
}

export function TemplateCard({ t, fav, onFav, noir }: { t: KeychainTemplate; fav: boolean; onFav: () => void; noir?: boolean }) {
  return (
    <article className="group flex flex-col">
      <div className={["tls-zoom relative overflow-hidden rounded-2xl", noir ? "bg-white/5" : "bg-secondary"].join(" ")}>
        <Link to="/template/$id" params={{ id: t.id }} className="block aspect-[4/5]">
          {t.placeholder || !t.image ? (
            <div className={["flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed p-6 text-center transition duration-700 group-hover:scale-[1.02]", noir ? "border-white/20 bg-white/[0.03]" : "border-border bg-secondary"].join(" ")}>
              <span className={["text-[10px] font-semibold uppercase tracking-[0.22em]", noir ? "text-white/50" : "text-muted-foreground"].join(" ")}>{t.category}</span>
              <span className={["font-display text-lg font-semibold tracking-tight", noir ? "text-white" : "text-foreground"].join(" ")}>{t.title}</span>
              <span className={["mt-2 text-[10px] uppercase tracking-[0.2em]", noir ? "text-white/40" : "text-muted-foreground/70"].join(" ")}>Preview coming soon</span>
            </div>
          ) : (
            <img src={t.image} alt={t.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          )}
        </Link>
        <button
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => { e.preventDefault(); onFav(); }}
          className={["absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition", noir ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/90 text-foreground hover:bg-white"].join(" ")}
        >
          <Heart className={["h-4 w-4", fav ? "fill-gold text-gold" : ""].join(" ")} />
        </button>
        {t.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-background">Popular</span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link to="/template/$id" params={{ id: t.id }} className={["block truncate font-display text-sm font-semibold tracking-tight hover:text-gold", noir ? "text-white" : ""].join(" ")}>{t.title}</Link>
          <p className={["mt-0.5 text-[11px] uppercase tracking-[0.16em]", noir ? "text-white/60" : "text-muted-foreground"].join(" ")}>{t.category}{t.difficulty ? ` · ${t.difficulty}` : ""}</p>
        </div>
        <Link to="/template/$id/customize" params={{ id: t.id }} className={["shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition hover:bg-gold hover:text-white", noir ? "bg-white text-noir" : "bg-foreground text-background"].join(" ")}>Customize</Link>
      </div>
    </article>
  );
}