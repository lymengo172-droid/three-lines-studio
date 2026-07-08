import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { useStore, t } from "@/lib/store";
import { useState } from "react";
import { X } from "lucide-react";
import imgAcrylic from "@/assets/cover-acrylic.jpg";
import imgMetal from "@/assets/cover-metal.jpg";
import imgMerch from "@/assets/cover-merch.jpg";
import imgPanel from "@/assets/mock-acrylic-panel.jpg";
import imgBlock from "@/assets/mock-acrylic-block.jpg";
import imgStandee from "@/assets/mock-acrylic-standee.jpg";
import imgTshirt from "@/assets/mock-tshirt.jpg";
import imgTote from "@/assets/mock-tote.jpg";
import imgMug from "@/assets/mock-mug.jpg";
import imgCap from "@/assets/mock-cap.jpg";
import imgBottle from "@/assets/mock-bottle.jpg";
import imgGlass from "@/assets/mock-glass.jpg";
import imgPen from "@/assets/mock-pen.jpg";
import imgKeychain from "@/assets/mock-keychain.jpg";
import imgMagnet from "@/assets/mock-magnet.jpg";
import imgShaker from "@/assets/mock-shaker.jpg";

const TILES = [
  imgAcrylic, imgMetal, imgMerch, imgPanel, imgBlock, imgStandee,
  imgTshirt, imgTote, imgMug, imgCap, imgBottle, imgGlass,
  imgPen, imgKeychain, imgMagnet, imgShaker,
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kiri Studio" },
      { name: "description", content: "Recent custom prints, engravings, and personalized creations from Kiri Studio in Phnom Penh." },
      { property: "og:title", content: "Gallery — Kiri Studio" },
      { property: "og:description", content: "A look at recent work from our Phnom Penh studio." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { lang } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Gallery", "វិចិត្រសាល", lang)}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          {t("Pieces that have left the studio.", "ស្នាដៃដែលចេញពីស្ទូឌីយោ។", lang)}
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">
          {t("Product close-ups, lifestyle shots, packaging, and customer photos.", "ផលិតផល ការវេចខ្ចប់ និងរូបអតិថិជន។", lang)}
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {TILES.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(src)}
              className="tls-zoom block w-full overflow-hidden rounded-2xl bg-secondary"
              style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 4 === 0 ? "1 / 1" : "4 / 5" }}
            >
              <img src={src} alt="Studio work" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-6 tls-fade-in" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <img src={open} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </Shell>
  );
}
