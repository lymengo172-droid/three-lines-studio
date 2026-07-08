import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { useStore, t } from "@/lib/store";
import { STUDIO } from "@/lib/catalog";
import { useMemo, useState } from "react";
import { Send, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { dataUrlToBlob } from "@/lib/renderPreview";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Kiri Studio" }] }),
  component: Checkout,
});

type Pay = "khqr" | "cod" | "bank";

function Checkout() {
  const { cart, subtotal, lang, clearCart } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [handle, setHandle] = useState("");
  const [pay, setPay] = useState<Pay>("khqr");
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const summary = useMemo(() => {
    const lines = cart.map((it, i) => {
      const opts = [it.templateName, it.size, it.optionsSummary].filter(Boolean).join(" · ");
      const main = `${i + 1}. ${it.productName} — ${opts} × ${it.qty} = $${(it.unitPrice * it.qty).toFixed(2)}`;
      return it.designNote ? `${main}\n   ✎ ${it.designNote}` : main;
    }).join("\n");
    const payLabel = pay === "khqr" ? "ABA Pay / KHQR" : pay === "cod" ? "Cash on Delivery" : "Bank transfer";
    return [
      `🧾 New order — ${STUDIO.name}`,
      ``,
      lines,
      ``,
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Payment: ${payLabel}`,
      ``,
      `Customer: ${name || "(name)"}`,
      `Phone: ${phone || "(phone)"}`,
      `Contact: ${handle || "(Telegram/Facebook)"}`,
    ].join("\n");
  }, [cart, subtotal, pay, name, phone, handle]);

  const tgUrl = `https://t.me/${STUDIO.telegramUsername}?text=${encodeURIComponent(summary)}`;
  const canSend = cart.length > 0 && name && phone;

  async function onSend() {
    if (!canSend || saving) return;
    setSaving(true);
    setSaveError(null);

    // Upload composited previews (data URLs) to private storage; keep template URLs as-is.
    const uploaded: Record<string, string> = {};
    for (const it of cart) {
      if (it.preview?.startsWith("data:")) {
        try {
          const blob = dataUrlToBlob(it.preview);
          const path = `${new Date().toISOString().slice(0, 10)}/${it.id}.jpg`;
          const { error: upErr } = await supabase.storage
            .from("order-previews")
            .upload(path, blob, { contentType: "image/jpeg", upsert: true });
          if (!upErr) uploaded[it.id] = path;
        } catch (e) {
          console.warn("preview upload failed", e);
        }
      }
    }

    const lineItems = cart.map((it) => ({
      product_id: it.productId ?? null,
      product_name: it.productName,
      line: it.line ?? null,
      template_id: it.templateId ?? null,
      template_name: it.templateName ?? null,
      size: it.size ?? null,
      options_summary: it.optionsSummary ?? null,
      quantity: it.qty,
      unit_price: it.unitPrice,
      line_total: Number((it.unitPrice * it.qty).toFixed(2)),
      preview_url: uploaded[it.id] ?? (it.preview?.startsWith("data:") ? null : it.preview ?? null),
      design_note: it.designNote ?? null,
    }));

    const firstPreviewPath = cart[0] ? uploaded[cart[0].id] : undefined;
    const firstPreviewFallback = cart[0]?.preview && !cart[0].preview.startsWith("data:") ? cart[0].preview : null;
    const firstNote = cart.map((it) => it.designNote).filter(Boolean).join(" · ") || null;

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          customer_name: name,
          phone,
          telegram_handle: handle || null,
          line_items: lineItems,
          subtotal: Number(subtotal.toFixed(2)),
          payment_method: pay,
          notes: null,
          design_note: firstNote,
          preview_url: firstPreviewPath ?? firstPreviewFallback,
        })
        .select("order_number")
        .single();

      if (error) throw error;
      if (data?.order_number) setOrderNumber(data.order_number as number);

      // Mark as telegram_sent (fire-and-forget); ignore failure.
      window.open(tgUrl, "_blank");
      setSent(true);
      setTimeout(() => clearCart(), 600);
    } catch (err) {
      console.error("Failed to save order", err);
      setSaveError(
        t(
          "We couldn't save your order. Please try again, or send us a message on Telegram directly.",
          "យើងមិនអាចរក្សាទុកការបញ្ជាទិញបានទេ។ សូមព្យាយាមម្តងទៀត ឬផ្ញើសារតាម Telegram ដោយផ្ទាល់។",
          lang,
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  if (cart.length === 0 && !sent) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="text-3xl font-black">{t("Your cart is empty", "រទេះទទេ", lang)}</h1>
          <Link to="/" className="mt-6 inline-block rounded-full border border-foreground px-5 py-2 text-sm font-semibold hover:bg-accent">{t("Start designing", "ចាប់ផ្តើមរចនា", lang)}</Link>
        </div>
      </Shell>
    );
  }

  if (sent) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-signal text-primary-foreground"><Check className="h-8 w-8" /></div>
          <h1 className="mt-6 text-4xl font-black">{t("Order sent", "បានផ្ញើ", lang)}</h1>
          {orderNumber !== null && (
            <p className="mt-2 text-sm font-semibold tracking-wider text-muted-foreground">
              {t("Order #", "លេខការបញ្ជាទិញ #", lang)}{String(orderNumber).padStart(4, "0")}
            </p>
          )}
          <p className="mt-3 text-muted-foreground">
            {t("We received your order on Telegram and will contact you shortly to confirm.", "យើងបានទទួលការបញ្ជាទិញតាម Telegram។ យើងនឹងទាក់ទងអ្នកឆាប់ៗដើម្បីបញ្ជាក់។", lang)}
          </p>
          <Link to="/" className="mt-8 inline-block rounded-full border border-foreground px-5 py-2 text-sm font-semibold hover:bg-accent">{t("Back home", "ត្រលប់ទៅផ្ទះ", lang)}</Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-12 sm:pt-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{t("Checkout", "ទូទាត់", lang)}</h1>

          <section className="mt-8 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Your details", "ព័ត៌មានរបស់អ្នក", lang)}</h2>
            <Field label={t("Full name", "ឈ្មោះពេញ", lang)} value={name} onChange={setName} placeholder="Sok Dara" />
            <Field label={t("Phone", "ទូរស័ព្ទ", lang)} value={phone} onChange={setPhone} placeholder="+855 12 345 678" />
            <Field label={t("Telegram or Facebook handle (for order updates)", "Telegram ឬ Facebook", lang)} value={handle} onChange={setHandle} placeholder="@yourname" />
          </section>

          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Payment method", "វិធីបង់ប្រាក់", lang)}</h2>
            <div className="mt-3 grid gap-3">
              <PayOpt id="khqr" pay={pay} setPay={setPay} title="ABA Pay / KHQR" subtitle={t("Primary — scan to pay.", "មេ — ស្កេនដើម្បីបង់ប្រាក់។", lang)} />
              <PayOpt id="cod" pay={pay} setPay={setPay} title={t("Cash on Delivery (COD)", "បង់ប្រាក់ពេលដឹក", lang)} subtitle={t("Standard outside Phnom Penh.", "ស្តង់ដារក្រៅភ្នំពេញ។", lang)} />
              <PayOpt id="bank" pay={pay} setPay={setPay} title={t("Bank transfer (ACLEDA / Wing)", "ផ្ទេរប្រាក់ ACLEDA / Wing", lang)} subtitle={t("For B2B orders over $200.", "សម្រាប់ B2B លើស $200។", lang)} />
            </div>

            {pay === "khqr" && (
              <div className="mt-6 flex items-center gap-5 rounded-2xl border border-border p-5">
                <img alt="KHQR placeholder" src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" className="h-32 w-32 rounded-lg bg-white p-2" />
                <div>
                  <div className="text-sm font-semibold">KHQR</div>
                  <p className="mt-1 text-xs text-muted-foreground">{t("Scan with any KHQR-compatible app (ABA, Wing, AC, ACLEDA). We'll confirm payment on Telegram before printing.", "ស្កេនជាមួយកម្មវិធី KHQR ណាមួយ។", lang)}</p>
                </div>
              </div>
            )}
          </section>

          <div className="mt-10">
            <button onClick={onSend} disabled={!canSend || saving} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-4 text-base font-semibold text-primary-foreground transition disabled:opacity-40 sm:w-auto">
              <Send className="h-4 w-4" />
              {saving
                ? t("Saving order…", "កំពុងរក្សាទុក…", lang)
                : t("Send order via Telegram", "ផ្ញើការបញ្ជាទិញតាម Telegram", lang)}
            </button>
            {saveError && (
              <p className="mt-3 text-xs font-medium text-destructive">{saveError}</p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              {t("This opens Telegram with your order pre-filled. We'll reply to confirm timing and payment.", "នេះនឹងបើក Telegram ដែលមានការបញ្ជាទិញរួចស្រេច។", lang)}
            </p>
          </div>
        </div>

        <aside className="self-start rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="text-sm font-semibold">{t("Order summary", "សង្ខេបការបញ្ជាទិញ", lang)}</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((it) => (
              <li key={it.id} className="flex items-start gap-3">
                <img src={it.preview} alt="" className="h-12 w-12 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{it.productName}</div>
                  <div className="truncate text-xs text-muted-foreground">{[it.templateName, it.size].filter(Boolean).join(" · ")} × {it.qty}</div>
                </div>
                <div className="shrink-0 text-sm font-medium">${(it.unitPrice * it.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">{t("Subtotal", "សរុបរង", lang)}</span>
            <span className="text-2xl font-black">${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("Delivery quoted after we confirm your order.", "ការដឹកនឹងជូនដំណឹងបន្ទាប់ពីបញ្ជាក់។", lang)}</p>
        </aside>
      </div>
    </Shell>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
    </label>
  );
}

function PayOpt({ id, pay, setPay, title, subtitle }: { id: Pay; pay: Pay; setPay: (p: Pay) => void; title: string; subtitle: string }) {
  const active = pay === id;
  return (
    <button onClick={() => setPay(id)} className={`flex items-start justify-between gap-4 rounded-xl border p-4 text-left transition ${active ? "border-foreground bg-accent" : "border-border hover:bg-accent/40"}`}>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-foreground" : "border-border"}`}>
        {active && <span className="h-2.5 w-2.5 rounded-full bg-foreground" />}
      </span>
    </button>
  );
}
