import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore, t } from "@/lib/store";
import { STUDIO } from "@/lib/catalog";

export function Header() {
  const { lang, setLang, count } = useStore();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/acrylic", label: t("Acrylic", "អាគ្រីលីច", lang) },
    { to: "/metal", label: t("Metal", "លោហៈ", lang) },
    { to: "/merch", label: t("Merch", "ទំនិញ", lang) },
    { to: "/bulk", label: t("B2B / Bulk", "បញ្ជាទិញច្រើន", lang) },
    { to: "/about", label: t("About", "អំពីយើង", lang) },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <Link to="/" className="min-w-0 truncate text-base font-black tracking-tight">
          <span className="gold-text">Three Lines,</span> <span>One Studio</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-foreground/80 transition hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "km" : "en")}
            className="rounded-full gold-hairline px-3 py-1.5 text-xs font-medium hover:bg-accent"
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN · ខ្មែរ" : "ខ្មែរ · EN"}
          </button>
          <Link to="/cart" className="relative rounded-full gold-hairline p-2 hover:bg-accent" aria-label="Cart">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-noir">
                {count}
              </span>
            )}
          </Link>
          <button className="rounded-full border border-border p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}