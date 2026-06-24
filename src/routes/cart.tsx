import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { useStore, t } from "@/lib/store";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Three Lines, One Studio" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateQty, subtotal, lang } = useStore();
  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-5 pt-12 sm:pt-20">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{t("Your cart", "រទេះរបស់អ្នក", lang)}</h1>
        {cart.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">{t("Nothing here yet.", "មិនទាន់មានរបស់អ្វីទេ។", lang)}</p>
            <Link to="/" className="mt-4 inline-block rounded-full border border-foreground px-5 py-2 text-sm font-semibold hover:bg-accent">
              {t("Start designing", "ចាប់ផ្តើមរចនា", lang)}
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {cart.map((it) => (
                <li key={it.id} className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-4 py-5 sm:grid-cols-[96px_minmax(0,1fr)_auto_auto]">
                  <img src={it.preview} alt="" className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{it.productName}</div>
                    <div className="text-xs text-muted-foreground">
                      {[it.templateName, it.size, it.optionsSummary].filter(Boolean).join(" · ")}
                    </div>
                    <div className="mt-2 flex items-center gap-2 sm:hidden">
                      <QtyCtrl qty={it.qty} onChange={(q) => updateQty(it.id, q)} />
                      <button onClick={() => removeFromCart(it.id)} className="text-muted-foreground hover:text-foreground"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="hidden sm:block"><QtyCtrl qty={it.qty} onChange={(q) => updateQty(it.id, q)} /></div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">${(it.unitPrice * it.qty).toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">${it.unitPrice.toFixed(2)} ea</div>
                    <button onClick={() => removeFromCart(it.id)} className="mt-1 hidden text-muted-foreground hover:text-foreground sm:inline-block"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-end gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-muted-foreground">{t("Subtotal", "សរុបរង", lang)}</span>
                <span className="text-3xl font-black tracking-tight">${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="rounded-full bg-signal px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                {t("Checkout", "ទូទាត់", lang)}
              </Link>
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}

function QtyCtrl({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center rounded-full border border-border">
      <button onClick={() => onChange(Math.max(1, qty - 1))} className="px-3 py-1.5 text-sm">−</button>
      <span className="min-w-8 text-center text-sm font-medium">{qty}</span>
      <button onClick={() => onChange(qty + 1)} className="px-3 py-1.5 text-sm">+</button>
    </div>
  );
}
