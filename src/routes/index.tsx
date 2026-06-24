import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { LINES, STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/cover-metal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Three Lines, One Studio — Built for Cambodia" },
      { name: "description", content: "A quiet, premium custom-print studio in Phnom Penh. Acrylic, ultra-HD metal wall art, and merch — designed and printed in-house." },
      { property: "og:title", content: "Three Lines, One Studio" },
      { property: "og:description", content: "Three lines. One studio. Built for Cambodia." },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang } = useStore();
  return (
    <Shell>
      {/* Hero — gold on noir */}
      <section className="noir relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-28 lg:pb-28">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            {t("Phnom Penh · Custom print studio · est. 2024", "ភ្នំពេញ · ស្ទូឌីយោបោះពុម្ព", lang)}
          </p>
          <h1 className="mt-5 text-[3.25rem] font-black leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]">
            {t("Three lines.", "បីផ្នែក។", lang)}<br/>
            {t("One studio.", "ស្ទូឌីយោមួយ។", lang)}<br/>
            <span className="gold-text">{t("Built for Cambodia.", "សម្រាប់កម្ពុជា។", lang)}</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("We don't shout — the product does the talking. Acrylic objects, ultra-HD metal wall art, and custom merch. Pick a template, preview live, order on Telegram.",
               "យើងមិនស្រែក — ផលិតផលនិយាយជំនួស។ វត្ថុអាគ្រីលីច, លោហៈ Ultra-HD និងទំនិញតាមតម្រូវ។", lang)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/acrylic" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">
              {t("Start designing", "ចាប់ផ្តើមរចនា", lang)}
            </Link>
            <Link to="/bulk" className="rounded-full gold-hairline px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5">
              {t("B2B inquiries", "បញ្ជាទិញច្រើន", lang)}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl glow-gold">
            <img src={heroImg} alt="Ultra-HD metal wall print in a minimalist interior" className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]" width={1280} height={1600} />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl glass-dark px-4 py-3 text-xs sm:block">
            <div className="font-semibold text-gold">Line 02 — Metal</div>
            <div className="text-white/70">Ultra-HD. No nails, no holes.</div>
          </div>
        </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="overflow-hidden border-y border-border bg-noir py-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-x-8 gap-y-2 px-5 text-[11px] font-medium uppercase tracking-[0.3em]">
          <span>UV-cured print</span>
          <span className="text-gold">·</span>
          <span>Ultra-HD aluminum</span>
          <span className="text-gold">·</span>
          <span>KHQR / ABA pay</span>
          <span className="text-gold">·</span>
          <span>Bulk 50+ pricing</span>
          <span className="text-gold">·</span>
          <span>Showroom in Toul Kork</span>
        </div>
      </section>

      {/* Three line cards */}
      <section className="mx-auto mt-20 max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">{t("Three lines.", "បីផ្នែក។", lang)}</h2>
          <div className="text-xs text-muted-foreground">{t("One studio. In-house from sketch to ship.", "ស្ទូឌីយោមួយ", lang)}</div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {LINES.map((l, i) => (
          <Link key={l.key} to={`/${l.key}` as "/acrylic"} className={`group relative block overflow-hidden rounded-2xl ${l.key === "metal" ? "noir glow-gold" : "bg-neutral-100 gold-hairline"}`}>
            <img src={l.cover} alt={l.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 ${l.key === "metal" ? "bg-gradient-to-t from-black/85 via-black/30 to-transparent" : "bg-gradient-to-t from-black/65 via-black/10 to-transparent"}`} />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Line 0{i + 1}</div>
              <div className="mt-1 flex items-end justify-between gap-2">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">
                    {l.key === "metal" ? <span className="gold-text">{l.title}</span> : l.title}
                  </h2>
                  <div className="text-xs opacity-80">{l.titleKm}</div>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <p className="mt-2 max-w-xs text-xs opacity-90">{l.subtitle}</p>
            </div>
          </Link>
        ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight sm:text-4xl">{t("How it works", "របៀបធ្វើការ", lang)}</h2>
          <div className="text-xs text-muted-foreground">{t("Four steps. No hassle.", "បួនជំហាន។", lang)}</div>
        </div>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4">
          {[
            { n: "01", k: t("Pick a template", "ជ្រើសម៉ូឌែល", lang), d: t("Choose from K-pop, anime, graduation, couple, family, or your logo.", "K-pop, anime, បញ្ចប់ការសិក្សា, គូស្នេហ៍, គ្រួសារ ឬ logo របស់អ្នក។", lang) },
            { n: "02", k: t("Choose size", "ជ្រើសទំហំ", lang), d: t("Pick the format and options that fit your space.", "ជ្រើសទំហំនិងជម្រើស។", lang) },
            { n: "03", k: t("Preview live", "មើលជាមុន", lang), d: t("See your design on the product before you commit.", "មើលឃើញការរចនាមុនទិញ។", lang) },
            { n: "04", k: t("Order", "បញ្ជាទិញ", lang), d: t("Send to us on Telegram, pay with ABA / KHQR / COD.", "ផ្ញើតាម Telegram, បង់ ABA / KHQR / COD។", lang) },
          ].map((s) => (
            <li key={s.n} className="bg-background p-6">
              <div className="text-xs font-semibold text-gold-deep">{s.n}</div>
              <div className="mt-2 text-lg font-bold">{s.k}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quiet pitch */}
      <section className="mx-auto mt-24 max-w-3xl px-5 text-center">
        <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          “{t("We print like we'd hang it on our own wall.", "យើងបោះពុម្ពដូចជាដាក់នៅជញ្ជាំងផ្ទះយើងផ្ទាល់។", lang)}”
        </p>
        <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">— {STUDIO.showroom}</div>
      </section>
    </Shell>
  );
}
