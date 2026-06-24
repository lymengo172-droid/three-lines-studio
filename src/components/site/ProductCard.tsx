import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  const priceLabel = p.priceFrom && p.priceTo
    ? `$${p.priceFrom}–${p.priceTo}`
    : p.sizes ? `from $${Math.min(...p.sizes.map((s) => s.price))}` : `$${p.basePrice}`;
  return (
    <Link
      to="/product/$line/$id"
      params={{ line: p.line, id: p.id }}
      className="group block"
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
        <img src={p.thumb} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{p.name}</div>
          {p.nameKm && <div className="truncate text-xs text-muted-foreground">{p.nameKm}</div>}
        </div>
        <div className="shrink-0 text-sm font-medium">{priceLabel}</div>
      </div>
      {p.bulkNote && <div className="mt-1 text-xs text-muted-foreground">Bulk 50+: {p.bulkNote}</div>}
    </Link>
  );
}