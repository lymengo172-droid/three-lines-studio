import { Shell } from "./Shell";
import { ProductCard } from "./ProductCard";
import { LINES, productsByLine, type LineKey } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";

export function LinePage({ lineKey }: { lineKey: LineKey }) {
  const { lang } = useStore();
  const line = LINES.find((l) => l.key === lineKey)!;
  const products = productsByLine(lineKey);
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-12 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: line.accentVar }}>
          Line 0{LINES.findIndex((l) => l.key === lineKey) + 1}
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{t(line.title, line.titleKm, lang)}</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">{line.subtitle}</p>
      </section>
      <section className="mx-auto mt-12 grid max-w-7xl gap-x-6 gap-y-10 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </section>
    </Shell>
  );
}