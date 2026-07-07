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
        className={`relative aspect-[4/5] overflow-hidden rounded-[24px] ${
          noir ? "glass-dark gold-hairline" : "bg-secondary tls-hairline tls-shadow-soft"
        } tls-shadow-lift`}
      >
        <img src={p.thumb} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]" />
        {noir && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <div className="truncate font-display text-[15px] font-semibold tracking-tight">{p.name}</div>
          {p.nameKm && <div className="mt-0.5 truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.nameKm}</div>}
        </div>
        <div className="shrink-0 text-[13px] font-semibold text-gold-deep">{priceLabel}</div>
      </div>
      {p.bulkNote && <div className="mt-1 px-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Bulk 50+: {p.bulkNote}</div>}
    </Link>
  );
}