import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import {
  ArrowUpRight, ArrowRight, ChevronDown, Plus, Minus,
  Sparkles, Gem, PenTool, Clock, Truck, MessageCircle,
  Send, Phone, Mail, MapPin,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/cover-metal.jpg";
import imgAcrylic from "@/assets/cover-acrylic.jpg";
import imgMerch from "@/assets/cover-merch.jpg";
import imgMetal from "@/assets/cover-metal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Three Lines Studio — Crafted with Precision. Personalized for You." },
      { name: "description", content: "Premium laser engraving, UV printing, and personalized creations designed in Phnom Penh to celebrate every occasion." },
      { property: "og:title", content: "Three Lines Studio — Crafted with Precision" },
      { property: "og:description", content: "Premium laser engraving, UV printing, and personalized gifts crafted in Phnom Penh." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang } = useStore();
  return (
    <Shell heroOverlay>
      <Hero lang={lang} />
      <ThreeCategories lang={lang} />
      <Why lang={lang} />
      <HowItWorks lang={lang} />
      <Testimonials lang={lang} />
      <FAQ lang={lang} />
      <ContactCTA lang={lang} />
    </Shell>
  );
}

/* ───────────────────────── Sections ───────────────────────── */

function Hero({ lang }: { lang: "en" | "km" }) {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-noir text-white">
      <img
        src={heroImg}
        alt="Premium custom print and engraving studio in Phnom Penh"
        className="absolute inset-0 h-full w-full object-cover tls-fade-in"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 pt-32 sm:pb-28">
        <p className="tls-fade-up text-[11px] font-semibold uppercase tracking-[0.32em] text-gold" style={{ animationDelay: "0.1s" }}>
          {t("Phnom Penh · Est. 2024", "ភ្នំពេញ · ឆ្នាំ ២០២៤", lang)}
        </p>
        <h1 className="tls-fade-up mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-[5.5rem]" style={{ animationDelay: "0.2s" }}>
          {t("Crafted with Precision.", "ឆ្លាក់ដោយភាពច្បាស់លាស់។", lang)}<br/>
          <span className="text-gold-bright">{t("Personalized for You.", "បង្កើតសម្រាប់អ្នក។", lang)}</span>
        </h1>
        <p className="tls-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ animationDelay: "0.35s" }}>
          {t(
            "Premium laser engraving, UV printing, and personalized creations designed to celebrate every occasion.",
            "ការឆ្លាក់ឡាស៊ែរ និងបោះពុម្ព UV ប្រណិត រចនាសម្រាប់ឱកាសពិសេសរបស់អ្នក។",
            lang,
          )}
        </p>
        <div className="tls-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.5s" }}>
          <Link to="/collections" className="tls-lift inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-foreground">
            {t("Browse Collections", "មើលបណ្ដុំ", lang)}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/collections/$slug" params={{ slug: "acrylic-keychains" }} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10">
            {t("Explore Keychains", "ខ្សែសោអាគ្រីលីច", lang)}
          </Link>
        </div>
      </div>
      <a href="#categories" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/70 sm:block" aria-label="Scroll">
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}

const CATEGORIES = [
  { key: "personalized", label: { en: "Personalized Gifts", km: "អំណោយផ្ទាល់ខ្លួន" }, img: imgKeychain, to: "/acrylic" },
  { key: "corporate",    label: { en: "Corporate Gifts",    km: "អំណោយក្រុមហ៊ុន" }, img: imgPen, to: "/b2b" },
  { key: "wedding",      label: { en: "Wedding & Event",    km: "អាពាហ៍ពិពាហ៍" },   img: imgPanel, to: "/acrylic" },
  { key: "decor",        label: { en: "Home Decor",         km: "តុបតែងផ្ទះ" },     img: imgMetal, to: "/metal" },
  { key: "signage",      label: { en: "Business Signage",   km: "ផ្លាកសញ្ញា" },     img: imgStandee, to: "/acrylic" },
  { key: "drinkware",    label: { en: "Custom Drinkware",   km: "កែវផ្ទាល់ខ្លួន" }, img: imgGlass, to: "/merch" },
] as const;

function Categories({ lang }: { lang: "en" | "km" }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 pt-28 sm:pt-36">
      <SectionEyebrow eyebrow={t("Collections", "បណ្ដុំ", lang)} title={t("Featured categories", "ប្រភេទពិសេស", lang)} kicker={t("Six worlds. One studio. Browse what resonates.", "ប្រាំមួយពិភព ស្ទូឌីយោមួយ។", lang)} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.key}
            to={c.to as "/acrylic"}
            className="tls-zoom group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img src={c.img} alt={c.label.en} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{lang === "km" ? c.label.km : c.label.en}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/70">{t("View collection", "មើល", lang)}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-gold">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DesignCollections({ lang }: { lang: "en" | "km" }) {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-5 pt-28 sm:pt-36">
      <div className="flex items-end justify-between gap-6">
        <SectionEyebrow
          eyebrow={t("Design Collections", "បណ្ដុំរចនា", lang)}
          title={t("Browse. Personalize. Order.", "មើល · កែ · បញ្ជាទិញ។", lang)}
          kicker={t("Curated template collections — each one designed in-studio and ready to be made yours.", "បណ្ដុំទម្រង់ដែលរចនាក្នុងស្ទូឌីយោ ត្រៀមបង្កើតសម្រាប់អ្នក។", lang)}
        />
        <Link to="/collections" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-foreground/80 hover:text-gold sm:inline-flex">
          {t("All collections", "ទាំងអស់", lang)} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.slice(0, 6).map((c) => (
          <CollectionCard key={c.slug} c={c} />
        ))}
      </div>
    </section>
  );
}

const BEST = [
  { name: "Acrylic LED Sign",        desc: "Glow-edge acrylic with custom name or logo.",         price: 38, img: imgPanel,   to: "/acrylic" },
  { name: "Engraved Wooden Plaque",  desc: "Laser-engraved hardwood, ready to gift.",             price: 22, img: imgBlock,   to: "/acrylic" },
  { name: "Personalized Tumbler",    desc: "Insulated steel with your name or message.",          price: 14, img: imgMug,     to: "/merch" },
  { name: "Custom Wedding Gift",     desc: "Acrylic keepsake for the moment that matters.",       price: 28, img: imgStandee, to: "/acrylic" },
  { name: "Premium Name Plate",      desc: "Brushed metal nameplate, magnetic mount.",            price: 18, img: imgMetal,   to: "/metal" },
  { name: "UV Printed Acrylic Display", desc: "Ultra-HD photo print on clear acrylic.",           price: 32, img: imgAcrylic, to: "/acrylic" },
];

function BestSellers({ lang }: { lang: "en" | "km" }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32">
      <SectionEyebrow eyebrow={t("Best sellers", "លក់ដាច់បំផុត", lang)} title={t("Customer favourites", "ដែលអតិថិជនពេញចិត្ត", lang)} kicker={t("Hand-picked pieces our clients keep coming back for.", "ផលិតផលដែលត្រូវបានជ្រើសរើស។", lang)} />
      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {BEST.map((p) => (
          <article key={p.name} className="group flex flex-col">
            <div className="tls-zoom relative aspect-[5/6] overflow-hidden rounded-2xl bg-secondary">
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-2 text-sm">
                  <span className="text-muted-foreground">{t("From", "ចាប់ពី", lang)}</span>{" "}
                  <span className="font-semibold text-foreground">${p.price}</span>
                </p>
              </div>
              <Link to={p.to as "/acrylic"} className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition hover:border-gold hover:text-gold">
                {t("Customize", "កែតម្រូវ", lang)}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Why({ lang }: { lang: "en" | "km" }) {
  const pillars = [
    { Icon: Gem,     k: t("Precision craftsmanship", "ភាពច្បាស់លាស់", lang),    d: t("Every cut, every print measured to the millimetre. We obsess so you don't have to.", "ការកាត់ និងបោះពុម្ពយ៉ាងម៉ត់ចត់។", lang) },
    { Icon: Sparkles, k: t("Premium materials", "សម្ភារៈពិសេស", lang),          d: t("Cast acrylic, aircraft-grade aluminium, food-safe drinkware — sourced for longevity.", "សម្ភារៈប្រណិត និងស្ថិតស្ថេរ។", lang) },
    { Icon: PenTool,  k: t("Personalized designs", "រចនាផ្ទាល់ខ្លួន", lang),     d: t("Bring a sketch, a photo, or a wild idea — we'll turn it into something you'd want to keep forever.", "នាំយកគំនិតមកយើងបង្កើតឲ្យ។", lang) },
    { Icon: Clock,    k: t("Fast turnaround", "ផលិតរហ័ស", lang),                 d: t("Most personalized orders ready in 3–5 days. Rush production available on request.", "បញ្ចប់ភាគច្រើនក្នុង ៣–៥ ថ្ងៃ។", lang) },
    { Icon: Truck,    k: t("Nationwide delivery", "ដឹកជញ្ជូនទូទាំងប្រទេស", lang), d: t("Same-day pickup in Phnom Penh. Trusted courier partners to every province.", "ដឹកជញ្ជូនទូទាំងកម្ពុជា។", lang) },
    { Icon: MessageCircle, k: t("Friendly support", "ការគាំទ្ររាក់ទាក់", lang),  d: t("Real humans on Telegram and Messenger — answering questions in your language.", "ឆ្លើយតបយ៉ាងរហ័ស។", lang) },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32">
      <SectionEyebrow eyebrow={t("Why Three Lines", "ហេតុអ្វី", lang)} title={t("Built around the details.", "ផ្តោតលើព័ត៌មានលម្អិត។", lang)} kicker={t("Six quiet reasons our customers stay with us.", "ហេតុផលដែលអតិថិជននៅជាមួយយើង។", lang)} />
      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map(({ Icon, k, d }) => (
          <div key={k} className="bg-background p-8 transition hover:bg-secondary">
            <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{k}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ lang }: { lang: "en" | "km" }) {
  const steps = [
    { n: "01", k: t("Share your idea", "ប្រាប់គំនិត", lang),  d: t("Telegram us your concept, photo, or rough sketch.", "ផ្ញើតាម Telegram។", lang) },
    { n: "02", k: t("Receive a quote", "ទទួលតម្លៃ", lang),    d: t("We confirm material, size and price within hours.", "យើងបញ្ជាក់តម្លៃក្នុងរយៈពេលខ្លី។", lang) },
    { n: "03", k: t("Approve design", "យល់ព្រមការរចនា", lang), d: t("Review a digital proof, revise until perfect.", "មើល និងកែសម្រួលរហូតពេញចិត្ត។", lang) },
    { n: "04", k: t("We craft", "យើងផលិត", lang),             d: t("Engraving, printing and finishing in-house.", "ផលិតនៅស្ទូឌីយោផ្ទាល់។", lang) },
    { n: "05", k: t("Pickup or delivery", "ទទួល ឬដឹក", lang), d: t("Collect in Toul Kork or we ship to your door.", "យកនៅទួលគោក ឬដឹកជូន។", lang) },
  ];
  return (
    <section className="mt-32 border-y border-border bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionEyebrow eyebrow={t("Process", "ដំណើរការ", lang)} title={t("How it works", "របៀបធ្វើការ", lang)} kicker={t("From first message to finished piece — five quiet steps.", "ប្រាំជំហានស្ងាត់ៗ។", lang)} />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="font-display text-3xl font-extrabold text-gold">{s.n}</div>
              <div className="mt-3 font-display text-lg font-bold tracking-tight">{s.k}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-4 hidden h-px w-12 -translate-y-1/2 bg-border lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function GalleryStrip({ lang }: { lang: "en" | "km" }) {
  const tiles = [imgAcrylic, imgMetal, imgTshirt, imgMug, imgPanel, imgKeychain, imgTote, imgStandee];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32">
      <div className="flex items-end justify-between gap-6">
        <SectionEyebrow eyebrow={t("Gallery", "វិចិត្រសាល", lang)} title={t("Recent work", "ស្នាដៃថ្មីៗ", lang)} kicker={t("A glance at what's been leaving the studio.", "ការងារថ្មីៗរបស់ស្ទូឌីយោ។", lang)} />
        <Link to="/gallery" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-foreground/80 hover:text-gold sm:inline-flex">
          {t("View full gallery", "មើលទាំងអស់", lang)} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((src, i) => (
          <div key={i} className={`tls-zoom relative overflow-hidden rounded-2xl bg-secondary ${i % 5 === 0 ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}>
            <img src={src} alt="Studio work" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ lang }: { lang: "en" | "km" }) {
  const stories = [
    { q: "The acrylic sign for our cafe opening looked twice as expensive as what we paid. The team revised the proof three times without a complaint.", a: "Sokha P.", r: "Cafe owner, BKK1" },
    { q: "Ordered 120 engraved tumblers for our team retreat — flawless and delivered a day early. They're now our default gift partner.", a: "Dara C.", r: "HR Lead, fintech" },
    { q: "I sent a blurry phone photo of our grandparents and they made it look like a magazine print on metal. My mum cried.", a: "Lyna S.", r: "Anniversary gift" },
  ];
  const stats = [
    { n: "500+", k: t("Happy customers", "អតិថិជនពេញចិត្ត", lang) },
    { n: "62%",  k: t("Reorder within 6 months", "បញ្ជាទិញម្តងទៀត", lang) },
    { n: "<2h",  k: t("Average response time", "ពេលឆ្លើយតប", lang) },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32">
      <SectionEyebrow eyebrow={t("Stories", "រឿងរ៉ាវ", lang)} title={t("Trusted across Cambodia.", "ទុកចិត្តដោយអតិថិជន។", lang)} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {stories.map((s) => (
          <figure key={s.a} className="flex h-full flex-col rounded-3xl border border-border bg-background p-8">
            <blockquote className="font-display text-lg leading-relaxed tracking-tight text-foreground">
              “{s.q}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4 text-sm">
              <div className="font-semibold">{s.a}</div>
              <div className="text-muted-foreground">{s.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.k} className="bg-background p-8 text-center">
            <div className="font-display text-4xl font-extrabold tracking-tight text-foreground">{s.n}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ({ lang }: { lang: "en" | "km" }) {
  const items = [
    { q: t("How do I place a custom order?", "តើខ្ញុំបញ្ជាទិញតាមតម្រូវយ៉ាងម៉េច?", lang), a: t("Tap “Request Custom Order” or message us on Telegram. Share your idea, photo, or sketch and we'll quote within hours.", "ចុច «សុំបញ្ជាទិញ» ឬផ្ញើតាម Telegram។ យើងឆ្លើយក្នុងរយៈពេលខ្លី។", lang) },
    { q: t("How long does production take?", "តើផលិតយូរប៉ុណ្ណា?", lang),                a: t("Most personalized pieces are ready in 3–5 working days. Bulk and complex orders take 7–14 days; rush options available.", "ភាគច្រើនប្រហែល ៣–៥ ថ្ងៃ។", lang) },
    { q: t("Can I order in bulk?", "តើបញ្ជាទិញច្រើនបានទេ?", lang),                        a: t("Yes — bulk pricing auto-applies from 50 units on merch, with sharper rates at 250 and 1,000.", "បាន — តម្លៃបញ្ចុះចាប់ពី ៥០ ឯកតា។", lang) },
    { q: t("Do you deliver across Cambodia?", "ដឹកជូនទូទាំងកម្ពុជាទេ?", lang),            a: t("Yes. Free same-day in Phnom Penh above $200. Nationwide via trusted courier (1–3 days).", "បាទ ដឹកជូនទូទាំងប្រទេស។", lang) },
    { q: t("Can I provide my own design?", "តើខ្ញុំអាចផ្ដល់ការរចនាផ្ទាល់ខ្លួនបានទេ?", lang), a: t("Absolutely. Send PNG, JPG, PDF or AI files. We'll prep print-ready artwork before production at no extra cost.", "បាន ផ្ញើ PNG, JPG, PDF ឬ AI។", lang) },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 pt-32">
      <SectionEyebrow eyebrow="FAQ" title={t("Quick answers", "ចម្លើយរហ័ស", lang)} center />
      <div className="mt-12 divide-y divide-border border-y border-border">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="font-display text-base font-semibold tracking-tight sm:text-lg">{it.q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-foreground/70">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              {isOpen && (
                <p className="pb-6 pr-12 text-sm leading-relaxed text-muted-foreground tls-fade-up">{it.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactCTA({ lang }: { lang: "en" | "km" }) {
  return (
    <section id="contact" className="mx-auto mt-32 max-w-7xl px-5">
      <div className="overflow-hidden rounded-3xl border border-border bg-foreground text-background">
        <div className="grid gap-10 p-10 sm:p-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-bright">{t("Let's create something", "ចូលរួមបង្កើត", lang)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              {t("Have an idea?", "មានគំនិតមែនទេ?", lang)}<br/>
              <span className="text-gold-bright">{t("Tell us about it.", "ប្រាប់យើង។", lang)}</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-background/70">
              {t(
                "Reach us on your favourite channel — most messages get a real reply in under two hours during business hours.",
                "ទាក់ទងតាមឆាណែលដែលអ្នកចូលចិត្ត។",
                lang,
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={STUDIO.telegram} target="_blank" rel="noreferrer" className="tls-lift inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white">
                <Send className="h-4 w-4" /> Telegram
              </a>
              <a href={STUDIO.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10">
                <MessageCircle className="h-4 w-4" /> Messenger
              </a>
              <Link to="/b2b" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10">
                {t("Request Quote", "សុំតម្លៃ", lang)} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 self-center text-sm">
            <ContactRow Icon={MapPin}  k={t("Showroom", "ទីតាំង", lang)} v={STUDIO.showroom} />
            <ContactRow Icon={Clock}   k={t("Hours", "ម៉ោងបើក", lang)} v={t("Mon – Sat · 9:00 – 19:00", "ច័ន្ទ–សៅរ៍ · ៩:០០–១៩:០០", lang)} />
            <ContactRow Icon={Phone}   k={t("Call", "ហៅទូរស័ព្ទ", lang)} v="+855 12 345 678" />
            <ContactRow Icon={Mail}    k="Email" v="hello@threelinesstudio.com" />
          </ul>
        </div>
        <div className="h-56 w-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=70')] bg-cover bg-center opacity-60 grayscale" aria-label="Map placeholder" />
      </div>
    </section>
  );
}

/* ───────────────────────── Primitives ───────────────────────── */

function SectionEyebrow({ eyebrow, title, kicker, center = false }: { eyebrow: string; title: string; kicker?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-xl text-center" : "max-w-2xl"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-5xl">{title}</h2>
      {kicker && <p className="mt-4 text-base text-muted-foreground">{kicker}</p>}
    </div>
  );
}

function ContactRow({ Icon, k, v }: { Icon: typeof MapPin; k: string; v: string }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-background/15 p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-bright" strokeWidth={1.5} />
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/60">{k}</div>
        <div className="mt-1 text-sm font-medium">{v}</div>
      </div>
    </li>
  );
}
