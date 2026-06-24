import type { CSSProperties } from "react";

type Props = {
  mockup: string;
  art?: string;
  layout?: "single" | "triptych" | "grid" | "gallery";
  className?: string;
  framed?: boolean;
};

export function PreviewMockup({ mockup, art, layout = "single", className, framed }: Props) {
  const tiles =
    layout === "triptych" ? 3 :
    layout === "grid" ? 4 :
    layout === "gallery" ? 6 : 1;

  const gridCols = tiles === 1 ? "grid-cols-1" : tiles === 3 ? "grid-cols-3" : tiles === 4 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`relative isolate overflow-hidden rounded-2xl bg-neutral-100 ${className ?? ""}`}
         style={{ aspectRatio: "1 / 1" } as CSSProperties}>
      <img src={mockup} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
      <div className={`relative grid h-full w-full gap-2 p-6 sm:p-10 ${gridCols}`}>
        {Array.from({ length: tiles }).map((_, i) => (
          <div key={i}
               className={`relative overflow-hidden ${framed ? "ring-1 ring-black/20 shadow-xl" : ""}`}
               style={{ borderRadius: framed ? 4 : 12 }}>
            {art ? (
              <img src={art} alt="" className="h-full w-full object-cover mix-blend-multiply" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/70 text-xs text-muted-foreground">
                Pick a template
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}