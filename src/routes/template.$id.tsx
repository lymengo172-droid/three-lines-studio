import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { templateById, KEYCHAIN_TEMPLATES, collectionBySlug } from "@/lib/collections";
import { Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { TemplateCard } from "./collections.$slug";

export const Route = createFileRoute("/template/$id")({
  head: ({ params }) => {
    const t = templateById(params.id);
    const title = t ? `${t.title} — Three Lines Studio` : "Template — Three Lines Studio";
    return { meta: [
      { title },
      { name: "description", content: t ? `${t.title} · ${t.category} keychain template. From $${t.priceFrom}. ${t.recommendedUse}.` : "Custom template." },
      { property: "og:title", content: title },
      ...(t ? [{ property: "og:image", content: t.image }] : []),
    ]};
  },
  component: TemplatePage,
});

function TemplatePage() {
  const { id } = useParams({ from: "/template/$id" });
  const tpl = templateById(id);
  const { isFavorite, toggleFavorite } = useStore();

  if (!tpl) {
    return <Shell><div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-display text-3xl font-bold">Template not found</h1><Link to="/collections" className="mt-4 inline-block underline">Browse collections</Link></div></Shell>;
  }

  const fav = isFavorite(tpl.id);
  const related = KEYCHAIN_TEMPLATES.filter((x) => x.id !== tpl.id && x.category === tpl.category).slice(0, 4);
  const collection = collectionBySlug(tpl.collection);
  const isPlaceholder = tpl.placeholder || !tpl.image;

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:pt-32">
        <div className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections" className="hover:underline">Collections</Link>
          <span className="mx-2">/</span>
          <Link to="/collections/$slug" params={{ slug: tpl.collection }} className="hover:underline">{collection?.title ?? tpl.collection}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{tpl.title}</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-3xl bg-secondary">
              {isPlaceholder ? (
                <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-secondary p-8 text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{tpl.category}</span>
                  <span className="font-display text-3xl font-semibold tracking-tight">{tpl.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Artwork coming soon</span>
                </div>
              ) : (
                <img src={tpl.image} alt={tpl.title} className="aspect-[4/5] w-full object-cover" />
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{tpl.category}{tpl.popular ? " · Popular" : ""}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">{tpl.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">Price starting from</p>
            <p className="font-display text-3xl font-bold">${tpl.priceFrom}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              <Spec k="Material" v={tpl.material} />
              <Spec k="Production" v={tpl.productionMethod} />
              <Spec k="Lead time" v={tpl.productionTime} />
              <Spec k="Best for" v={tpl.recommendedUse} />
            </dl>

            <div className="mt-8 flex gap-3">
              <Link to="/template/$id/customize" params={{ id: tpl.id }} className="tls-lift inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition hover:bg-gold">
                Customize this template <ArrowRight className="h-4 w-4" />
              </Link>
              <button onClick={() => toggleFavorite(tpl.id)} aria-label="Favorite" className="grid h-14 w-14 place-items-center rounded-full border border-border transition hover:border-gold">
                <Heart className={["h-5 w-5", fav ? "fill-gold text-gold" : ""].join(" ")} />
              </button>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Designed in-studio in Phnom Penh. Every template can be personalized with your own photo, text, or colour. Need a unique design? Request a custom quote.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 pb-24">
            <h2 className="font-display text-2xl font-bold tracking-tight">Related templates</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((r) => (
                <TemplateCard key={r.id} t={r} fav={isFavorite(r.id)} onFav={() => toggleFavorite(r.id)} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile customize */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <Link to="/template/$id/customize" params={{ id: tpl.id }} className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-semibold text-background">
          Customize · from ${tpl.priceFrom} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Shell>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-background p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{k}</div>
      <div className="mt-1 text-sm font-medium">{v}</div>
    </div>
  );
}