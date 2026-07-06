import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore, t } from "@/lib/store";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const { lang, setLang, count } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlay && !scrolled && !open;

  const nav = [
    { to: "/", label: t("Home", "ដើម", lang) },
    { to: "/collections", label: t("Collections", "បណ្ដុំ", lang) },
    { to: "/inspiration", label: t("Inspiration", "គំនិត", lang) },
    { to: "/b2b", label: t("Custom Orders", "បញ្ជាទិញ", lang) },
    { to: "/about", label: t("About", "អំពីយើង", lang) },
    { to: "/contact", label: t("Contact", "ទំនាក់ទំនង", lang) },
  ] as const;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        transparent
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-border bg-white/90 text-foreground backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <Link to="/" className="group flex min-w-0 flex-col leading-none">
          <span className="font-display text-[15px] font-extrabold uppercase tracking-[-0.03em]">
            Three Lines
          </span>
          <span
            className={[
              "mt-1 font-display text-[9px] font-light uppercase tracking-[0.4em] transition-colors",
              transparent ? "text-gold-bright" : "text-gold",
            ].join(" ")}
          >
            Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={[
                "text-[13px] font-medium tracking-wide transition",
                transparent ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground",
              ].join(" ")}
              activeProps={{ className: transparent ? "text-white font-semibold" : "text-foreground font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "km" : "en")}
            className={[
              "rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition",
              transparent
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground/70 hover:bg-accent hover:text-foreground",
            ].join(" ")}
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN" : "ខ្មែរ"}
          </button>
          <Link
            to="/favorites"
            aria-label="Favorites"
            className={[
              "rounded-full border p-2 transition",
              transparent
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground/70 hover:bg-accent hover:text-foreground",
            ].join(" ")}
          >
            <Heart className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className={[
              "relative rounded-full border p-2 transition",
              transparent
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground/70 hover:bg-accent hover:text-foreground",
            ].join(" ")}
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/b2b"
            className="hidden rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold tracking-wide text-background transition hover:bg-gold hover:text-white md:inline-flex"
          >
            {t("Request Quote", "សុំតម្លៃ", lang)}
          </Link>
          <button
            className={[
              "rounded-full border p-2 md:hidden",
              transparent ? "border-white/30 text-white" : "border-border text-foreground",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-foreground">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium hover:bg-accent"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/b2b"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
            >
              {t("Request Quote", "សុំតម្លៃ", lang)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}