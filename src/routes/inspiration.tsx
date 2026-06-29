import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { INSPIRATION_GROUPS } from "@/lib/collections";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/inspiration")({
  head: () => ({ meta: [
    { title: "Inspiration — Three Lines Studio" },
    { name: "description", content: "A gallery of finished customer pieces — anime, pets, business, weddings and more." },
    { property: "og:title", content: "Inspiration — Three Lines Studio" },
  ]}),
  component: InspirationPage,
});

function InspirationPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-24 pb-12 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Inspiration</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Real pieces. <span className="text-gold-bright">Real moments.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">A look at finished work that's left the studio. Browse by mood, then imagine your own.</p>
      </section>

      {INSPIRATION_GROUPS.map((g) => (
        <section key={g.key} className="mx-auto max-w-7xl px-5 pb-16">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.title}</h2>
            <Link to="/collections/$slug" params={{ slug: "acrylic-keychains" }} className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-gold sm:inline">Make your own →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {g.images.map((src, i) => (
              <div key={src + i} className={["tls-zoom overflow-hidden rounded-2xl bg-secondary", i === 0 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-square"].join(" ")}>
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="overflow-hidden rounded-3xl bg-foreground p-10 text-background sm:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright">Make it yours</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">Find a template, personalize it, and we'll craft it.</h2>
          <Link to="/collections" className="tls-lift mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground">
            Explore collections <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Shell>
  );
}