import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { useStore } from "@/lib/store";
import { templateById } from "@/lib/collections";
import { TemplateCard } from "./collections.$slug";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [
    { title: "Favorites — Kiri Studio" },
    { name: "description", content: "Your saved design templates." },
  ]}),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useStore();
  const items = favorites.map(templateById).filter(Boolean) as NonNullable<ReturnType<typeof templateById>>[];

  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-24 pb-8 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Saved for later</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-6xl">Your favorites</h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">
          The templates you've heart'd. Saved on this device.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border py-24 text-center">
            <Heart className="h-7 w-7 text-gold" />
            <p className="mt-4 font-display text-xl font-semibold">No favorites yet</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">Browse the collection and tap the heart to save designs you love.</p>
            <Link to="/collections/$slug" params={{ slug: "acrylic-plate" }} className="tls-lift mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-gold">
              Browse keychains
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((t) => (
              <TemplateCard key={t.id} t={t} fav={isFavorite(t.id)} onFav={() => toggleFavorite(t.id)} />
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}