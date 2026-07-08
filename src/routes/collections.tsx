import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { COLLECTIONS } from "@/lib/collections";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Design Collections — Kiri Studio" },
      { name: "description", content: "Browse premium, customizable design collections — acrylic keychains, metal art, signage, home décor and more. Designed in Phnom Penh." },
      { property: "og:title", content: "Design Collections — Kiri Studio" },
      { property: "og:description", content: "Curated collections of customizable templates. Personalize and order in minutes." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-24 pb-10 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Design Collections</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Browse. Personalize. <span className="text-gold-bright">Make it yours.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">
          Curated template collections — each one designed in-studio and ready to be made yours in a few taps.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => (
          <CollectionCard key={c.slug} c={c} />
        ))}
      </section>
    </Shell>
  );
}

export function CollectionCard({ c }: { c: (typeof COLLECTIONS)[number] }) {
  const isAvailable = c.status === "available";
  return (
    <Link
      to="/collections/$slug"
      params={{ slug: c.slug }}
      className="tls-zoom group relative block overflow-hidden rounded-3xl bg-secondary"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {!isAvailable && (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">
            Coming soon
          </span>
        )}
        {isAvailable && (
          <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Available now
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h3 className="font-display text-2xl font-bold tracking-tight">{c.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/80">{c.shortDesc}</p>
          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span>{isAvailable ? `${c.templateCount} templates · from $${c.priceFrom}` : "Launching soon"}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-gold">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}