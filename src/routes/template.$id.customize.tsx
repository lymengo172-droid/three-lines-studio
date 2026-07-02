import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { templateById } from "@/lib/collections";
import { STUDIO } from "@/lib/catalog";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Upload, Send } from "lucide-react";

export const Route = createFileRoute("/template/$id/customize")({
  head: ({ params }) => {
    const t = templateById(params.id);
    return { meta: [
      { title: t ? `Customize ${t.title} — Three Lines Studio` : "Customize — Three Lines Studio" },
      { name: "description", content: "Personalize your template in a few simple steps." },
    ]};
  },
  component: CustomizePage,
});

const SIZES = [
  { id: "s", label: "Small", dims: "5×5cm", delta: 0 },
  { id: "m", label: "Medium", dims: "7×7cm", delta: 2 },
  { id: "l", label: "Large", dims: "9×9cm", delta: 4 },
];
const FINISHES = [
  { id: "clear", label: "Clear", desc: "Crystal-clear acrylic with polished edge.", delta: 0 },
  { id: "frosted", label: "Frosted", desc: "Soft matte finish, premium feel.", delta: 1 },
  { id: "mirror", label: "Mirror", desc: "Reflective acrylic, statement piece.", delta: 2 },
];

const STEPS = ["Size", "Finish", "Photo", "Text", "Review", "Send"] as const;

function CustomizePage() {
  const { id } = useParams({ from: "/template/$id/customize" });
  const tpl = templateById(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [size, setSize] = useState(SIZES[1].id);
  const [finish, setFinish] = useState(FINISHES[0].id);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [text, setText] = useState("");

  if (!tpl) {
    return <Shell><div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-display text-3xl font-bold">Template not found</h1><Link to="/collections" className="mt-4 inline-block underline">Browse collections</Link></div></Shell>;
  }

  const sizeSel = SIZES.find((s) => s.id === size)!;
  const finishSel = FINISHES.find((f) => f.id === finish)!;
  const unitPrice = tpl.priceFrom + sizeSel.delta + finishSel.delta;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const sendOrder = () => {
    const lines = [
      `*Three Lines Studio — Custom Order*`,
      `Template: ${tpl.title} (${tpl.category})`,
      `Size: ${sizeSel.label} (${sizeSel.dims})`,
      `Finish: ${finishSel.label}`,
      photoName ? `Photo: ${photoName}` : `Photo: (none)`,
      text ? `Text: ${text}` : `Text: (none)`,
      `Estimated unit price: $${unitPrice}`,
    ];
    const url = `https://t.me/${STUDIO.telegramUsername}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-5 pt-24 pb-32 sm:pt-32">
        <div className="flex items-center justify-between">
          <Link to="/template/$id" params={{ id: tpl.id }} className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Back to template
          </Link>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Step {step + 1} of {STEPS.length}</div>
        </div>

        {/* Progress */}
        <div className="mt-6 grid grid-cols-6 gap-1.5">
          {STEPS.map((s, i) => (
            <div key={s} className={["h-1 rounded-full", i <= step ? "bg-gold" : "bg-border"].join(" ")} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{STEPS[step]}</h1>
          <p className="text-sm text-muted-foreground">{tpl.title} · est. ${unitPrice}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Live preview */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl bg-secondary">
              {tpl.placeholder || !tpl.image ? (
                <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-secondary p-8 text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{tpl.category}</span>
                  <span className="font-display text-2xl font-semibold tracking-tight">{tpl.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Upload your photo to preview</span>
                </div>
              ) : (
                <img src={tpl.image} alt={tpl.title} className="aspect-[4/5] w-full object-cover" />
              )}
            </div>
            {text && (
              <p className="mt-3 text-center font-display text-lg font-semibold">"{text}"</p>
            )}
          </div>

          {/* Step content */}
          <div className="order-1 lg:order-2">
            {step === 0 && (
              <Choices items={SIZES.map((s) => ({ id: s.id, label: s.label, desc: s.dims, badge: s.delta ? `+$${s.delta}` : "Included" }))} value={size} onChange={setSize} />
            )}
            {step === 1 && (
              <Choices items={FINISHES.map((f) => ({ id: f.id, label: f.label, desc: f.desc, badge: f.delta ? `+$${f.delta}` : "Included" }))} value={finish} onChange={setFinish} />
            )}
            {step === 2 && (
              <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-border p-10 text-center transition hover:border-gold hover:bg-secondary">
                <Upload className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-3 font-display text-lg font-semibold">Upload photo or logo</p>
                <p className="mt-1 text-xs text-muted-foreground">Optional · JPG / PNG / PDF / AI</p>
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? null)} />
                {photoName && <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background"><Check className="h-3 w-3" /> {photoName}</p>}
              </label>
            )}
            {step === 3 && (
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Custom text (optional)</label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. HARU, Class of 2026, Sothea & Dara"
                  maxLength={40}
                  className="mt-3 h-14 w-full rounded-2xl border border-border bg-background px-4 font-display text-lg outline-none transition focus:border-gold"
                />
                <p className="mt-2 text-xs text-muted-foreground">{text.length}/40</p>
              </div>
            )}
            {step === 4 && (
              <ReviewBlock rows={[
                ["Template", tpl.title],
                ["Size", `${sizeSel.label} (${sizeSel.dims})`],
                ["Finish", finishSel.label],
                ["Photo", photoName ?? "(none)"],
                ["Text", text || "(none)"],
                ["Estimated unit price", `$${unitPrice}`],
              ]} />
            )}
            {step === 5 && (
              <div className="rounded-3xl border border-border p-8">
                <p className="font-display text-xl font-bold">Send to studio</p>
                <p className="mt-2 text-sm text-muted-foreground">We'll confirm size, finish and total within hours. No upfront payment.</p>
                <button onClick={sendOrder} className="tls-lift mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:bg-gold">
                  <Send className="h-4 w-4" /> Send via Telegram
                </button>
                <Link to="/b2b" className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold sm:ml-2">
                  Request formal quote
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex items-center justify-between">
          <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="tls-lift inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background hover:bg-gold">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => navigate({ to: "/collections/$slug", params: { slug: tpl.collection } })} className="text-sm font-medium text-muted-foreground underline hover:text-foreground">
              Back to collection
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Choices({ items, value, onChange }: { items: { id: string; label: string; desc: string; badge: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="grid gap-3">
      {items.map((it) => {
        const on = value === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={["flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition", on ? "border-gold bg-gold/5" : "border-border hover:border-foreground"].join(" ")}
          >
            <div>
              <div className="font-display text-base font-bold">{it.label}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{it.desc}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">{it.badge}</span>
              <span className={["grid h-6 w-6 place-items-center rounded-full border", on ? "border-gold bg-gold text-white" : "border-border"].join(" ")}>
                {on && <Check className="h-3 w-3" />}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ReviewBlock({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="overflow-hidden rounded-2xl border border-border">
      {rows.map(([k, v], i) => (
        <div key={k} className={["grid grid-cols-[140px_1fr] gap-4 p-4 text-sm", i % 2 ? "bg-secondary/60" : ""].join(" ")}>
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}