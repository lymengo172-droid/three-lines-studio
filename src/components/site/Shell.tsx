import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Link } from "@tanstack/react-router";
import { useStore, t } from "@/lib/store";

export function Shell({ children, heroOverlay = false }: { children: ReactNode; heroOverlay?: boolean }) {
  const { lang } = useStore();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header overlay={heroOverlay} />
      <main className={heroOverlay ? "" : "pt-20"}>{children}</main>
      <Footer />
      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <Link
          to="/b2b"
          className="block w-full rounded-full bg-foreground py-3 text-center text-sm font-semibold tracking-wide text-background transition hover:bg-gold"
        >
          {t("Request Custom Quote", "សុំតម្លៃ", lang)}
        </Link>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}