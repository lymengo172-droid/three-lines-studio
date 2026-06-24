import { STUDIO } from "@/lib/catalog";
import { useStore, t } from "@/lib/store";

export function Footer() {
  const { lang } = useStore();
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-black tracking-tight">{STUDIO.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{STUDIO.tagline}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("Showroom", "បង្ហាញផលិតផល", lang)}
          </h4>
          <p className="mt-2 text-sm">{STUDIO.showroom}</p>
          <p className="text-sm text-muted-foreground">{t("Open Mon–Sat, 9am–7pm", "ច័ន្ទ–សៅរ៍ ៩:០០–១៩:០០", lang)}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Follow", "តាមដាន", lang)}</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="hover:underline" href={STUDIO.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a className="hover:underline" href={STUDIO.tiktok} target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a className="hover:underline" href={STUDIO.telegram} target="_blank" rel="noreferrer">Telegram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Payment", "ការទូទាត់", lang)}</h4>
          <p className="mt-2 text-sm">ABA Pay · KHQR · COD · Bank transfer</p>
          <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} {STUDIO.name}</p>
        </div>
      </div>
    </footer>
  );
}