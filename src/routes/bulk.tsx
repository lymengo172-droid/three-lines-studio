import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/bulk")({
  head: () => ({ meta: [
    { title: "B2B & Bulk orders — Three Lines, One Studio" },
    { name: "description", content: "Bulk pricing for corporates and NGOs in Cambodia — 50+ units. Request a quote." },
    { property: "og:title", content: "B2B & Bulk orders" },
    { property: "og:description", content: "Bulk pricing for corporates and NGOs in Cambodia." },
  ]}),
  component: Bulk,
});

function Bulk() {
  const { lang } = useStore();
  const [form, setForm] = useState({ name: "", company: "", product: "", qty: "", message: "" });
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = `📦 Bulk quote request\n\nName: ${form.name}\nCompany: ${form.company}\nProduct: ${form.product}\nQuantity: ${form.qty}\n\n${form.message}`;
    window.open(`https://t.me/${STUDIO.telegramUsername}?text=${encodeURIComponent(body)}`, "_blank");
    setSent(true);
  }
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 pt-12 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">B2B</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{t("Bulk orders", "បញ្ជាទិញច្រើន", lang)}</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          {t("For corporates, NGOs, schools, and events in Cambodia. 50-unit minimum. We handle design, print, and delivery in Phnom Penh.",
             "សម្រាប់ក្រុមហ៊ុន អង្គការ សាលា និងព្រឹត្តិការណ៍។ ៥០ឯកតាជាអប្បបរមា។", lang)}
        </p>
        {sent ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-bold">{t("Request sent on Telegram", "បានផ្ញើតាម Telegram", lang)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("We'll come back to you within one business day.", "យើងនឹងឆ្លើយតបក្នុងរយៈពេល ១ ថ្ងៃ។", lang)}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 grid gap-4 sm:grid-cols-2">
            <Field label={t("Your name", "ឈ្មោះរបស់អ្នក", lang)} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label={t("Company / org", "ក្រុមហ៊ុន / អង្គការ", lang)} value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
            <Field label={t("Product", "ផលិតផល", lang)} value={form.product} onChange={(v) => setForm({ ...form, product: v })} placeholder="T-shirt / Mug / Acrylic..." required />
            <Field label={t("Quantity (50+)", "ចំនួន (៥០+)", lang)} value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} placeholder="100" required type="number" />
            <label className="sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">{t("Message", "សារ", lang)}</span>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
            </label>
            <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center rounded-full bg-signal px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              {t("Request a quote", "សុំតម្លៃ", lang)}
            </button>
          </form>
        )}
      </div>
    </Shell>
  );
}

function Field({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} type={type}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
    </label>
  );
}
