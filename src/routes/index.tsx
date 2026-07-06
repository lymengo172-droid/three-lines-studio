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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      {/* Vertical gold hairline accent */}
      <div className="pointer-events-none absolute right-0 top-24 hidden h-64 w-px bg-gradient-to-b from-gold-bright/40 to-transparent sm:block" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 pt-32 sm:pb-28">
        <div className="tls-fade-up flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
          <span className="h-px w-10 bg-gold-bright" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-bright">
            {t("Phnom Penh · Est. 2024", "ភ្នំពេញ · ឆ្នាំ ២០២៤", lang)}
          </p>
        </div>
        <h1 className="tls-fade-up mt-6 max-w-4xl font-display text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] sm:text-7xl lg:text-[5.75rem]" style={{ animationDelay: "0.2s" }}>
          {t("Crafted with", "ឆ្លាក់ដោយ", lang)}<br/>
          <span className="gold-text italic">{t("Precision.", "ភាពច្បាស់លាស់។", lang)}</span><br/>
          {t("Personalized for you.", "បង្កើតសម្រាប់អ្នក។", lang)}
        </h1>
        <div className="tls-fade-up mt-7 max-w-xl space-y-2" style={{ animationDelay: "0.35s" }}>
          <p className="text-base leading-relaxed text-white/85 sm:text-lg">
            {t(
              "Premium laser engraving, UV printing, and personalized creations designed to celebrate every occasion.",
              "ការឆ្លាក់ឡាស៊ែរ និងបោះពុម្ព UV ប្រណិត រចនាសម្រាប់ឱកាសពិសេសរបស់អ្នក។",
              lang,
            )}
          </p>
          {lang === "en" && (
            <p className="text-[13px] font-light leading-relaxed text-white/45">
              ការបោះពុម្ពអាគ្រីលីក និងលោហៈធាតុដែលផលិតយ៉ាងសម្រិតសម្រាំង។
            </p>
          )}
        </div>
        <div className="tls-fade-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.5s" }}>
          <Link to="/collections" className="btn-gold tls-lift inline-flex items-center gap-2 rounded-none px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em]">
            {t("Browse Collections", "មើលបណ្ដុំ", lang)}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/collections/$slug" params={{ slug: "acrylic-plate" }} className="inline-flex items-center gap-2 rounded-none border border-white/25 bg-white/5 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur transition hover:border-gold-bright hover:text-gold-bright">
            {t("Explore Acrylic", "ខ្សែសោអាគ្រីលីច", lang)}
          </Link>
        </div>
      </div>
      {/* Editorial scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 right-6 hidden flex-col items-center gap-4 opacity-60 sm:flex">
        <span className="rotate-90 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.55em] text-white/70">
          {t("Scroll", "រំកិល", lang)}
        </span>
        <span className="h-14 w-px bg-white/50" />
      </div>
    </section>
  );
}

const THREE_CATEGORIES = [
  {
    key: "acrylic",
    to: "/acrylic" as const,
    eyebrow: "01",
    label: { en: "Acrylic", km: "អាគ្រីលីច" },
    desc: {
      en: "Cast acrylic keychains, stands, LED signs and photo blocks — UV-printed in full colour, hand-finished with a polished edge. Our flagship category.",
      km: "អាគ្រីលីច — ខ្សែសោ តម្កល់ ផ្លាកសញ្ញា LED និងប្លុករូបភាព។",
    },
    img: imgAcrylic,
  },
  {
    key: "metal",
    to: "/metal" as const,
    eyebrow: "02",
    label: { en: "Metal (Aluminum)", km: "លោហៈ" },
    desc: {
      en: "Aluminum signs, brushed name plates, Ultra-HD wall art and metal business cards. Aircraft-grade materials, built to last.",
      km: "អាលុយមីញ៉ូម — ផ្លាកសញ្ញា ឈ្មោះ រូបផ្ទាំង និងកាតធុរកិច្ច។",
    },
    img: imgMetal,
  },
  {
    key: "merch",
    to: "/merch" as const,
    eyebrow: "03",
    label: { en: "Merch", km: "ទំនិញ" },
    desc: {
      en: "Stickers, t-shirts, tote bags, mugs and engraved pens. Everyday branded pieces with bulk pricing that scales with you.",
      km: "ស្ទីកឃ័រ អាវយឺត ថង់ កែវ និងប៊ិចឆ្លាក់។",
    },
    img: imgMerch,
  },
] as const;

function ThreeCategories({ lang }: { lang: "en" | "km" }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 pt-24 sm:pt-32">
      <SectionEyebrow
        eyebrow={t("Categories", "ប្រភេទ", lang)}
        title={t("Choose your world.", "ជ្រើសពិភពរបស់អ្នក។", lang)}
        kicker={t(
          "Three focused categories — each with its own subcategories and custom templates.",
          "បីប្រភេទសំខាន់ ដែលនីមួយៗមានទម្រង់ផ្ទាល់ខ្លួន។",
          lang,
        )}
      />
      <div className="mt-14 flex flex-col gap-8">
        {THREE_CATEGORIES.map((c, i) => (
          <Link
            key={c.key}
            to={c.to}
            className="tls-zoom group relative block overflow-hidden rounded-3xl bg-secondary"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
              <img
                src={c.img}
                alt={c.label.en}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-14">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-bright">
                  {t("Category", "ប្រភេទ", lang)} {c.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-6xl">
                  {lang === "km" ? c.label.km : c.label.en}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {t(c.desc.en, c.desc.km, lang)}
                </p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-foreground transition group-hover:bg-gold group-hover:text-white">
                  {t("Explore Collection", "រុករកបណ្ដុំ", lang)}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
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
