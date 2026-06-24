import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";

export function ProductCard({ p, noir }: { p: Product; noir?: boolean }) {
  const priceLabel = p.priceFrom && p.priceTo
    ? `$${p.priceFrom}–${p.priceTo}`
    : p.sizes ? `from $${Math.min(...p.sizes.map((s) => s.price))}` : `$${p.basePrice}`;
  return (
    <Link
      to="/product/$line/$id"
      params={{ line: p.line, id: p.id }}
      className="group block"
    >
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl ${
          noir ? "glass-dark gold-hairline" : "bg-neutral-100"
        } transition duration-500 group-hover:glow-gold`}
      >
        <img src={p.thumb} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        {noir && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-tight">{p.name}</div>
          {p.nameKm && <div className="truncate text-xs text-muted-foreground">{p.nameKm}</div>}
        </div>
        <div className="shrink-0 text-sm font-semibold text-gold-deep">{priceLabel}</div>
      </div>
      {p.bulkNote && <div className="mt-1 text-xs text-muted-foreground">Bulk 50+: {p.bulkNote}</div>}
    </Link>
  );
}