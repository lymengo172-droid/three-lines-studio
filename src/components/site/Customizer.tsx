import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { TEMPLATES, type Product } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";
import { PreviewMockup } from "./PreviewMockup";
import { PhotoSlot, DEFAULT_TRANSFORM, type PhotoSlotValue } from "./PhotoSlot";
import { renderPreviewDataUrl, dpiWarning } from "@/lib/renderPreview";
import { Check, AlertTriangle } from "lucide-react";

const ALL_CATEGORIES = [
  "Teddy / Baby", "Floral", "Minimalist",
  "Fan art / K-pop", "Anime OC", "Graduation",
  "Pre-wedding / Couple", "Family & Travel", "Corporate / Logo",
] as const;

export function Customizer({ product }: { product: Product }) {
  const { lang, addToCart } = useStore();
  const navigate = useNavigate();

  const CATEGORIES = ALL_CATEGORIES;
  const [cat, setCat] = useState<(typeof ALL_CATEGORIES)[number]>(
    (product.defaultCategory as (typeof ALL_CATEGORIES)[number]) ?? "Family & Travel"
  );
  const [templateId, setTemplateId] = useState<string | undefined>();
  const [slot, setSlot] = useState<PhotoSlotValue>({ src: undefined, transform: DEFAULT_TRANSFORM });
  const [designNote, setDesignNote] = useState("");
  const [sizeId, setSizeId] = useState<string | undefined>(product.sizes?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [optState, setOptState] = useState<Record<string, string | boolean>>(() => {
    const init: Record<string, string | boolean> = {};
    product.options?.forEach((o) => { init[o.id] = o.type === "toggle" ? false : o.choices[0].label; });
    return init;
  });

  const tplsInCat = TEMPLATES.filter((tpl) => tpl.category === cat);
  const template = TEMPLATES.find((tpl) => tpl.id === templateId);
  const art = slot.src ?? template?.image;

  const sizePrice = product.sizes?.find((s) => s.id === sizeId)?.price ?? product.basePrice;
  const selectedSize = product.sizes?.find((s) => s.id === sizeId);
  const warning = slot.src ? dpiWarning(slot.naturalWidth, slot.naturalHeight, selectedSize?.dims, 150) : null;

  const layoutOpt = product.options?.find((o) => o.id === "layout");
  const layoutChoice = layoutOpt && layoutOpt.type === "select"
    ? layoutOpt.choices.find((c) => c.label === optState.layout) : undefined;

  const unitPrice = useMemo(() => {
    let p = sizePrice;
    product.options?.forEach((o) => {
      const v = optState[o.id];
      if (o.type === "toggle" && v === true) p += o.priceDelta;
      if (o.type === "select") {
        const c = o.choices.find((c) => c.label === v);
        if (c?.priceDelta) {
          if (o.id === "layout") p = sizePrice * c.priceDelta;
          else p += c.priceDelta;
        }
      }
    });
    return Math.round(p * 100) / 100;
  }, [sizePrice, optState, product.options]);

  const previewLayout: "single" | "triptych" | "grid" | "gallery" =
    layoutChoice?.label?.startsWith("Triptych") ? "triptych" :
    layoutChoice?.label?.startsWith("Grid") ? "grid" :
    layoutChoice?.label?.startsWith("Gallery") ? "gallery" : "single";

  async function handleAdd(goToCart: boolean) {
    if (!art) { alert(t("Pick a template or upload a photo first.", "សូមជ្រើសរើសម៉ូឌែលឬផ្ទុករូបថត។", lang)); return; }
    setBusy(true);
    // Composite the on-screen preview into a flat image when we have an uploaded photo
    let previewSrc = art;
    if (slot.src) {
      const rendered = await renderPreviewDataUrl(product, slot.src, slot.transform, designNote || undefined);
      if (rendered) previewSrc = rendered;
    }
    const optsLabel = product.options?.map((o) => {
      const v = optState[o.id];
      if (o.type === "toggle") return v ? o.label : null;
      return `${o.label}: ${v}`;
    }).filter(Boolean).join(" · ") ?? "";
    addToCart({
      productId: product.id,
      productName: product.name,
      line: product.line,
      templateId,
      templateName: template?.name ?? (slot.src ? "Your photo" : undefined),
      size: product.sizes?.find((s) => s.id === sizeId)?.label,
      optionsSummary: optsLabel,
      qty,
      unitPrice,
      preview: previewSrc,
      designNote: designNote || undefined,
    });
    setBusy(false);
    if (goToCart) navigate({ to: "/cart" });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <PreviewMockup
          mockup={product.mockup}
          art={art}
          artTransform={slot.src ? slot.transform : undefined}
          printArea={product.printArea}
          layout={previewLayout}
          framed={product.line === "metal"}
          line={product.line}
          productId={product.id}
          note={designNote || undefined}
        />
        <p className="mt-3 text-xs text-muted-foreground">
          {t("Live preview — final print color may vary slightly.", "មើលជាមុន — ពណ៌បោះពុម្ពពិតប្រាកដអាចខុសគ្នាបន្តិច។", lang)}
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("01 — Pick a template", "០១ — ជ្រើសម៉ូឌែល", lang)}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${cat === c ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {tplsInCat.map((tpl) => (
              <button key={tpl.id} onClick={() => { setTemplateId(tpl.id); }}
                className={`group relative overflow-hidden rounded-lg border ${templateId === tpl.id ? "border-foreground ring-2 ring-foreground" : "border-border"}`}>
                <img src={tpl.image} alt={tpl.name} className="aspect-square w-full object-cover transition group-hover:scale-105" />
                {templateId === tpl.id && (
                  <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-foreground text-background">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("02 — Your photo", "០២ — រូបថតរបស់អ្នក", lang)}
          </h3>
          <div className="mt-3">
            <PhotoSlot
              value={slot}
              onChange={setSlot}
              aspect={product.printArea ? product.printArea.width / product.printArea.height : 1}
              rounded={product.printArea?.rounded ?? 8}
              helper={t(
                "Drag to reposition · scroll or pinch to zoom. Phone photos welcome.",
                "អូសដើម្បីផ្លាស់ទី · រមូរឬចាប់ដើម្បីពង្រីក។",
                lang,
              )}
            />
            {warning && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{warning}</span>
              </div>
            )}
          </div>
        </section>

        {product.sizes && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("03 — Size", "០៣ — ទំហំ", lang)}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {product.sizes.map((s) => (
                <button key={s.id} onClick={() => setSizeId(s.id)}
                  className={`rounded-lg border px-3 py-3 text-left transition ${sizeId === s.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent"}`}>
                  <div className="text-sm font-semibold">{s.label}</div>
                  {s.dims && <div className="text-xs opacity-70">{s.dims}</div>}
                  <div className="mt-1 text-xs">${s.price}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {product.options && product.options.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("04 — Options", "០៤ — ជម្រើស", lang)}
            </h3>
            <div className="mt-3 space-y-3">
              {product.options.map((o) => o.type === "toggle" ? (
                <label key={o.id} className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border p-3">
                  <div>
                    <div className="text-sm font-medium">{o.label} <span className="text-xs text-muted-foreground">+${o.priceDelta.toFixed(2)}</span></div>
                    {o.hint && <div className="text-xs text-muted-foreground">{o.hint}</div>}
                  </div>
                  <input type="checkbox" checked={Boolean(optState[o.id])}
                    onChange={(e) => setOptState((s) => ({ ...s, [o.id]: e.target.checked }))}
                    className="mt-1 h-5 w-5 accent-signal" />
                </label>
              ) : (
                <div key={o.id}>
                  <div className="mb-2 text-sm font-medium">{o.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {o.choices.map((c) => (
                      <button key={c.label} onClick={() => setOptState((s) => ({ ...s, [o.id]: c.label }))}
                        className={`rounded-full border px-3 py-1.5 text-xs ${optState[o.id] === c.label ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent"}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("05 — Add a note to your design", "០៥ — បន្ថែមកំណត់ចំណាំ", lang)}
          </h3>
          <input
            value={designNote}
            onChange={(e) => setDesignNote(e.target.value.slice(0, 80))}
            placeholder={t("e.g. HARU · my baby · please brighten faces", "ឧ. HARU", lang)}
            className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {t("Names, captions or special instructions — we'll see it with your order.", "ឈ្មោះ ឬការណែនាំពិសេស — យើងនឹងឃើញវាជាមួយការបញ្ជាទិញ។", lang)}
          </p>
        </section>

        <section className="space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Quantity", "ចំនួន", lang)}</span>
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-sm">−</button>
                <span className="min-w-8 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5 text-sm">+</button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{t("Unit", "តម្លៃ", lang)}</div>
              <div className="text-2xl font-black tracking-tight">${unitPrice.toFixed(2)}</div>
            </div>
          </div>
          {product.bulkNote && (
            <p className="text-xs text-muted-foreground">{t("Bulk 50+:", "បញ្ជាទិញច្រើន ៥០+៖", lang)} {product.bulkNote}</p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button onClick={() => handleAdd(false)} disabled={busy} className="flex-1 rounded-full border border-foreground px-5 py-3 text-sm font-semibold hover:bg-accent disabled:opacity-50">
              {busy ? t("Saving…", "កំពុង…", lang) : t("Add to cart", "បន្ថែមទៅរទេះ", lang)}
            </button>
            <button onClick={() => handleAdd(true)} disabled={busy} className="flex-1 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              {busy ? t("Saving…", "កំពុង…", lang) : t("Buy now", "ទិញឥឡូវ", lang)}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}