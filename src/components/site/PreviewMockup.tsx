import type { CSSProperties } from "react";
import type { SlotTransform } from "./PhotoSlot";

export type PrintArea = { top: number; left: number; width: number; height: number; rounded?: number };

type Props = {
  mockup: string;
  art?: string;
  artTransform?: SlotTransform;
  printArea?: PrintArea;
  layout?: "single" | "triptych" | "grid" | "gallery";
  className?: string;
  framed?: boolean;
  line?: "acrylic" | "metal" | "merch";
  productId?: string;
  note?: string;
};

const DEFAULT_AREA: PrintArea = { top: 30, left: 30, width: 40, height: 40, rounded: 4 };

/**
 * Composites art onto a single product mockup using an explicit print area.
 * For multi-piece metal displays, lays out N framed prints on a wall background.
 */
export function PreviewMockup({ mockup, art, artTransform, printArea, layout = "single", className, framed, line, productId, note }: Props) {
  const area = printArea ?? DEFAULT_AREA;
  const tiles = layout === "triptych" ? 3 : layout === "grid" ? 4 : layout === "gallery" ? 6 : 1;
  const t = artTransform ?? { x: 0, y: 0, scale: 1 };
  // Per-product realism overlays
  const isAcrylic = line === "acrylic";
  const isMetal = line === "metal" || framed;
  const isMug = productId === "mug" || productId === "glass" || productId === "bottle";
  const isTshirt = productId === "tshirt" || productId === "tote" || productId === "cap";

  return (
    <div className={`relative isolate overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] ${className ?? ""}`}
         style={{ aspectRatio: "1 / 1" } as CSSProperties}>
      <img src={mockup} alt="" className="absolute inset-0 h-full w-full object-cover" />

      {tiles === 1 ? (
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${area.top}%`, left: `${area.left}%`,
            width: `${area.width}%`, height: `${area.height}%`,
            borderRadius: area.rounded ?? 4,
            boxShadow: isMetal
              ? "0 14px 30px rgba(0,0,0,0.35), inset 0 0 0 6px #1a1a1a, inset 0 0 0 8px rgba(212,175,55,0.55)"
              : isAcrylic
              ? "0 18px 40px -10px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.55)"
              : "0 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          {art ? (
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={art}
                alt=""
                draggable={false}
                className="absolute left-1/2 top-1/2 max-w-none"
                style={{
                  height: "100%", width: "auto",
                  transform: `translate(-50%,-50%) translate(${t.x * (area.width / 100)}px, ${t.y * (area.height / 100)}px) scale(${t.scale})`,
                  transformOrigin: "center center",
                }}
              />
              {/* Realism overlays */}
              {isAcrylic && (
                <div className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.18) 100%)",
                    mixBlendMode: "screen",
                  }} />
              )}
              {isMug && (
                <div className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 18%, rgba(255,255,255,0.12) 50%, rgba(0,0,0,0) 82%, rgba(0,0,0,0.45) 100%)",
                  }} />
              )}
              {isTshirt && (
                <div className="pointer-events-none absolute inset-0"
                  style={{ mixBlendMode: "multiply", opacity: 0.45,
                    backgroundImage:
                      "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.25), transparent 60%)" }} />
              )}
              {isMetal && (
                <div className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(0,0,0,0.18) 100%)",
                    mixBlendMode: "overlay",
                  }} />
              )}
              {note && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-sm bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {note}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/85 text-[10px] uppercase tracking-widest text-muted-foreground">
              Your design here
            </div>
          )}
        </div>
      ) : (
        // Multi-piece wall layout — use mockup as wall background, render N framed art tiles
        <div className="absolute inset-[12%] grid gap-3"
             style={{ gridTemplateColumns: tiles === 3 ? "repeat(3,1fr)" : tiles === 4 ? "repeat(2,1fr)" : "repeat(3,1fr)" }}>
          {Array.from({ length: tiles }).map((_, i) => (
            <div key={i} className="overflow-hidden bg-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] ring-1 ring-black/10"
                 style={{ borderRadius: 2 }}>
              {art ? <img src={art} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-neutral-200" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}