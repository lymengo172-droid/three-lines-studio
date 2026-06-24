import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Customizer } from "@/components/site/Customizer";
import { productById, LINES } from "@/lib/catalog";

export const Route = createFileRoute("/product/$line/$id")({
  head: ({ params }) => {
    const p = productById(params.id);
    const title = p ? `${p.name} — Three Lines, One Studio` : "Product — Three Lines, One Studio";
    return { meta: [
      { title },
      { name: "description", content: p?.blurb ?? "Custom-printed product." },
      { property: "og:title", content: title },
      { property: "og:description", content: p?.blurb ?? "Custom-printed product." },
      ...(p ? [{ property: "og:image", content: p.thumb }, { name: "twitter:image", content: p.thumb }] : []),
    ]};
  },
  component: ProductPage,
  notFoundComponent: () => <Shell><div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="text-3xl font-black">Not found</h1><Link to="/" className="mt-4 inline-block underline">Go home</Link></div></Shell>,
});

function ProductPage() {
  const { line, id } = useParams({ from: "/product/$line/$id" });
  const product = productById(id);
  if (!product) {
    return <Shell><div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="text-3xl font-black">Product not found</h1><Link to="/" className="mt-4 inline-block underline">Go home</Link></div></Shell>;
  }
  const lineMeta = LINES.find((l) => l.key === product.line)!;
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:pt-16">
        <div className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/${line}` as "/acrylic"} className="hover:underline">{lineMeta.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: lineMeta.accentVar }}>{lineMeta.title}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{product.name}</h1>
            {product.nameKm && <p className="mt-1 text-sm text-muted-foreground">{product.nameKm}</p>}
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{product.blurb}</p>
          </div>
        </div>
        <Customizer product={product} />
      </div>
    </Shell>
  );
}
