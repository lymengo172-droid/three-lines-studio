import type { CSSProperties } from "react";

export type PrintArea = { top: number; left: number; width: number; height: number; rounded?: number };

type Props = {
  mockup: string;
  art?: string;
  printArea?: PrintArea;
  layout?: "single" | "triptych" | "grid" | "gallery";
  className?: string;
  framed?: boolean;
};

const DEFAULT_AREA: PrintArea = { top: 30, left: 30, width: 40, height: 40, rounded: 4 };

/**
 * Composites art onto a single product mockup using an explicit print area.
 * For multi-piece metal displays, lays out N framed prints on a wall background.
 */
export function PreviewMockup({ mockup, art, printArea, layout = "single", className, framed }: Props) {
  const area = printArea ?? DEFAULT_AREA;
  const tiles = layout === "triptych" ? 3 : layout === "grid" ? 4 : layout === "gallery" ? 6 : 1;

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
            boxShadow: framed ? "0 6px 18px rgba(0,0,0,0.18)" : undefined,
          }}
        >
          {art ? (
            <img src={art} alt="" className="h-full w-full object-cover" />
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