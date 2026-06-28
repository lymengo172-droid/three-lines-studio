import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { useStore, t } from "@/lib/store";
import { STUDIO } from "@/lib/catalog";
import { MapPin, Clock, Phone, Mail, Send, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Three Lines Studio" },
      { name: "description", content: "Visit our Phnom Penh showroom or message us on Telegram, Messenger, phone, or email." },
      { property: "og:title", content: "Contact — Three Lines Studio" },
      { property: "og:description", content: "Get in touch with Three Lines Studio in Phnom Penh." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang } = useStore();
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Contact", "ទំនាក់ទំនង", lang)}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          {t("Let's craft something together.", "ចូលរួមបង្កើតរបស់អស្ចារ្យ។", lang)}
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">
          {t("Reach us on any channel below — most messages get a real reply within two hours during business hours.", "ឆ្លើយតបក្នុងរយៈពេលពីរម៉ោងក្នុងម៉ោងធ្វើការ។", lang)}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-secondary p-8 sm:p-10">
            <h2 className="font-display text-xl font-bold tracking-tight">{t("Send a quick message", "ផ្ញើសារខ្លី", lang)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("For full custom quotes with artwork upload, use the dedicated form.", "សម្រាប់តម្លៃជាមួយការរចនា សូមប្រើទម្រង់ខាងក្រោម។", lang)}</p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget as HTMLFormElement);
                const msg = `Hi! ${data.get("name")} (${data.get("phone")}) — ${data.get("message")}`;
                window.open(`https://t.me/${STUDIO.telegramUsername}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <Field name="name" label={t("Your name", "ឈ្មោះ", lang)} required />
              <Field name="phone" label={t("Phone or Telegram", "លេខទូរស័ព្ទ ឬ Telegram", lang)} required />
              <Field name="message" label={t("What can we help with?", "ត្រូវការជំនួយអ្វី?", lang)} textarea required />
              <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-gold">
                {t("Send via Telegram", "ផ្ញើតាម Telegram", lang)} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 border-t border-border pt-6">
              <Link to="/b2b" className="text-sm font-semibold text-foreground hover:text-gold">
                {t("Need a full custom quote with artwork?", "ត្រូវការតម្លៃលំអិតជាមួយការរចនា?", lang)} →
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <ContactCard Icon={MapPin}  k={t("Showroom", "ទីតាំង", lang)} v={STUDIO.showroom} />
            <ContactCard Icon={Clock}   k={t("Hours", "ម៉ោងបើក", lang)} v={t("Mon – Sat · 9:00 – 19:00", "ច័ន្ទ–សៅរ៍ · ៩:០០–១៩:០០", lang)} />
            <ContactCard Icon={Phone}   k={t("Call", "ហៅទូរស័ព្ទ", lang)} v="+855 12 345 678" />
            <ContactCard Icon={Mail}    k="Email" v="hello@threelinesstudio.com" />
            <div className="flex gap-3">
              <a href={STUDIO.telegram} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-white">
                <Send className="h-4 w-4" /> Telegram
              </a>
              <a href={STUDIO.facebook} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent">
                <MessageCircle className="h-4 w-4" /> Messenger
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-72 w-full overflow-hidden rounded-3xl border border-border bg-secondary">
          <iframe
            title="Three Lines Studio location"
            src="https://www.google.com/maps?q=Toul+Kork+Phnom+Penh&output=embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </section>
    </Shell>
  );
}

function Field({ name, label, required, textarea }: { name: string; label: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {textarea ? <textarea name={name} required={required} rows={4} className={cls} /> : <input name={name} required={required} className={cls} />}
    </label>
  );
}

function ContactCard({ Icon, k, v }: { Icon: typeof MapPin; k: string; v: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
        <div className="mt-1 text-sm font-medium">{v}</div>
      </div>
    </div>
  );
}
