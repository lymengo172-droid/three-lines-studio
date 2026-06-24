import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "km";

export type CartItem = {
  id: string; // line id
  productId: string;
  productName: string;
  line: string;
  templateId?: string;
  templateName?: string;
  size?: string;
  optionsSummary: string;
  qty: number;
  unitPrice: number;
  preview: string;
};

type StoreCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tls_cart");
      if (raw) setCart(JSON.parse(raw));
      const l = localStorage.getItem("tls_lang") as Lang | null;
      if (l === "en" || l === "km") setLang(l);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("tls_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem("tls_lang", lang); } catch {}
  }, [lang]);

  const value = useMemo<StoreCtx>(() => ({
    lang, setLang,
    cart,
    addToCart: (item) => setCart((c) => [...c, { ...item, id: crypto.randomUUID() }]),
    removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
    updateQty: (id, qty) => setCart((c) => c.map((x) => x.id === id ? { ...x, qty: Math.max(1, qty) } : x)),
    clearCart: () => setCart([]),
    subtotal: cart.reduce((s, x) => s + x.unitPrice * x.qty, 0),
    count: cart.reduce((s, x) => s + x.qty, 0),
  }), [lang, cart]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}

export function t(en: string, km: string | undefined, lang: Lang) {
  if (lang === "km" && km) return km;
  return en;
}