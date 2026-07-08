import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { PRODUCTS, STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";
import { Building2, Palette, Truck, ShieldCheck, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "B2B & Bulk Orders — Kiri Studio" },
      { name: "description", content: "Request a custom quote for corporate gifts, NGO merch, school events, and white-label printing in Cambodia. 50-unit minimum." },
      { property: "og:title", content: "B2B & Bulk Orders — Kiri Studio" },
      { property: "og:description", content: "Corporate gifting, white-label merch and bulk printing in Phnom Penh." },
    ],
  }),
  component: B2B,
});

const schema = z.object({
  company: z.string().trim().min(1).max(120),
  contact_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  product: z.string().trim().min(1).max(120),
  quantity: z.coerce.number().int().min(1).max(1_000_000),
  deadline: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

const MERCH = PRODUCTS.filter((p) => p.line === "merch");

function B2B() {
  const { lang } = useStore();
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    phone: "",
    email: "",
    product: MERCH[0]?.name ?? "T-shirt",
    quantity: "100",
    deadline: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  function setField<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setBusy(true);
    try {
      let artwork_path: string | null = null;
      if (file) {
        if (file.size > 20 * 1024 * 1024) throw new Error("Artwork file must be under 20 MB.");
        const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
        const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("b2b-artwork").upload(key, file, { upsert: false, contentType: file.type || undefined });
        if (upErr) throw upErr;
        artwork_path = key;
      }
      const payload = {
        company: parsed.data.company,
        contact_name: parsed.data.contact_name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        product: parsed.data.product,
        quantity: parsed.data.quantity,
        deadline: parsed.data.deadline || null,
        message: parsed.data.message || null,
        artwork_path,
      };
      const { data, error: insErr } = await supabase
        .from("b2b_requests")
        .insert(payload)
        .select("id")
        .single();
      if (insErr) throw insErr;

      // Also notify owner on Telegram for instant alert
      const tgBody =
        `📦 New B2B quote request\n\n` +
        `Company: ${payload.company}\n` +
        `Contact: ${payload.contact_name}\n` +
        `Phone: ${payload.phone}\n` +
        (payload.email ? `Email: ${payload.email}\n` : "") +
        `Product: ${payload.product}\n` +
        `Quantity: ${payload.quantity}\n` +
        (payload.deadline ? `Deadline: ${payload.deadline}\n` : "") +
        (artwork_path ? `Artwork: ${artwork_path}\n` : "") +
        (payload.message ? `\n${payload.message}\n` : "") +
        `\nRef: ${data.id.slice(0, 8)}`;
      window.open(
        `https://t.me/${STUDIO.telegramUsername}?text=${encodeURIComponent(tgBody)}`,
        "_blank",
      );

      setDone(data.id.slice(0, 8));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl px-5 pt-20 pb-24 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/10 gold-hairline">
            <Check className="h-7 w-7 text-gold-deep" />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight">{t("Quote request received", "ទទួលបានសំណើ", lang)}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(`Reference: #${done}. We'll come back to you within one business day with pricing, lead time, and a mockup.`,
               `លេខយោង៖ #${done}. យើងនឹងឆ្លើយតបក្នុងរយៈពេល ១ ថ្ងៃធ្វើការ។`, lang)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full gold-hairline px-5 py-2.5 text-sm font-semibold">{t("Back home", "ត្រឡប់ទៅទំព័រដើម", lang)}</Link>
            <a href={STUDIO.telegram} target="_blank" rel="noreferrer" className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold">{t("Chat on Telegram", "ជជែកលើ Telegram", lang)}</a>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* Hero */}
      <section className="noir">
        <div className="mx-auto max-w-7xl px-5 pt-14 pb-14 sm:pt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">B2B · Wholesale · White-label</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
            {t("Built for", "សម្រាប់", lang)} <span className="gold-text">{t("businesses.", "អាជីវកម្ម។", lang)}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("Corporate gifts, NGO event merch, hotel signage, brand activations — we handle design, production, and delivery across Cambodia. 50-unit minimum.",
               "អំណោយក្រុមហ៊ុន ទំនិញព្រឹត្តិការណ៍ NGO ផ្លាកសញ្ញាសណ្ឋាគារ — យើងគ្រប់គ្រងការរចនា ផលិត និងដឹកជញ្ជូន។", lang)}
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-5 pt-16">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
          {[
            { Icon: Palette, k: t("White-label", "ស្លាកស្វ័យប្រវត្តិ", lang), d: t("Your logo, your colors, your packaging — zero Kiri branding on the finished product.", "ឡូហ្គូរបស់អ្នក ពណ៌របស់អ្នក។", lang) },
            { Icon: Building2, k: t("Bulk pricing", "តម្លៃបរិមាណច្រើន", lang), d: t("Tiered discounts from 50 units. Sharper rates above 250 and 1,000 — ask for a custom quote.", "បញ្ចុះតម្លៃចាប់ពី ៥០។", lang) },
            { Icon: Truck, k: t("Delivery in PP", "ដឹកជញ្ជូននៅភ្នំពេញ", lang), d: t("Free delivery in Phnom Penh for orders above $200. Nationwide via partner courier.", "ដឹកជញ្ជូនឥតគិតថ្លៃ។", lang) },
          ].map(({ Icon, k, d }) => (
            <div key={k} className="bg-background p-6">
              <Icon className="h-5 w-5 text-gold-deep" />
              <div className="mt-3 text-base font-bold">{k}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-24">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t("Request a quote", "សុំតម្លៃ", lang)}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("Tell us what you need. We'll reply with pricing, lead time, and a free mockup.", "ប្រាប់យើងពីអ្វីដែលអ្នកត្រូវការ។", lang)}</p>

        <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <Field label={t("Company / organisation", "ក្រុមហ៊ុន / អង្គការ", lang)} value={form.company} onChange={(v) => setField("company", v)} required maxLength={120} />
          <Field label={t("Contact name", "ឈ្មោះអ្នកទំនាក់ទំនង", lang)} value={form.contact_name} onChange={(v) => setField("contact_name", v)} required maxLength={120} />
          <Field label={t("Phone", "ទូរស័ព្ទ", lang)} value={form.phone} onChange={(v) => setField("phone", v)} placeholder="012 345 678" required maxLength={40} />
          <Field label={t("Email (optional)", "អ៊ីមែល (ស្រេចចិត្ត)", lang)} value={form.email} onChange={(v) => setField("email", v)} type="email" maxLength={255} />

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{t("Product", "ផលិតផល", lang)}</span>
            <select value={form.product} onChange={(e) => setField("product", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground">
              {MERCH.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
              <option value="Acrylic Panel">Acrylic Panel</option>
              <option value="Metal Wall Print">Metal Wall Print</option>
              <option value="Mixed / Other">{t("Mixed / Other", "ផ្សេងៗ", lang)}</option>
            </select>
          </label>
          <Field label={t("Quantity (50+ recommended)", "ចំនួន (៥០+)", lang)} value={form.quantity} onChange={(v) => setField("quantity", v)} type="number" required />

          <Field label={t("Deadline (optional)", "កាលបរិច្ឆេទ (ស្រេចចិត្ត)", lang)} value={form.deadline} onChange={(v) => setField("deadline", v)} type="date" />

          <label className="sm:col-span-2 block">
            <span className="text-xs font-medium text-muted-foreground">{t("Artwork file (optional · max 20 MB)", "ឯកសាររចនា (ស្រេចចិត្ត)", lang)}</span>
            <div className="mt-1 flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-2.5">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <input type="file" accept=".png,.jpg,.jpeg,.pdf,.ai,.svg,.psd,.zip"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="flex-1 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-foreground file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-background" />
            </div>
            {file && <p className="mt-1 text-xs text-muted-foreground">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</p>}
          </label>

          <label className="sm:col-span-2 block">
            <span className="text-xs font-medium text-muted-foreground">{t("Project details", "ព័ត៌មានគម្រោង", lang)}</span>
            <textarea value={form.message} onChange={(e) => setField("message", e.target.value)} rows={5} maxLength={4000}
              placeholder={t("Event date, colors, sizing breakdown, special requests…", "កាលបរិច្ឆេទ ពណ៌ ទំហំ…", lang)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
          </label>

          {error && (
            <p className="sm:col-span-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">{error}</p>
          )}

          <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> {t("Your details stay private — used only for this quote.", "ព័ត៌មានរបស់អ្នកនឹងត្រូវបានរក្សាសម្ងាត់។", lang)}
            </div>
            <button type="submit" disabled={busy} className="btn-gold rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50">
              {busy ? t("Sending…", "កំពុងផ្ញើ…", lang) : t("Send quote request", "ផ្ញើសំណើ", lang)}
            </button>
          </div>
        </form>
      </section>
    </Shell>
  );
}

function Field({ label, value, onChange, placeholder, required, type = "text", maxLength }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string; maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} type={type} maxLength={maxLength}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
    </label>
  );
}