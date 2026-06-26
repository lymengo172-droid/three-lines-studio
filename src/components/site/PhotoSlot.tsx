import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Move, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export type SlotTransform = { x: number; y: number; scale: number };

export type PhotoSlotValue = {
  src?: string;
  transform: SlotTransform;
  naturalWidth?: number;
  naturalHeight?: number;
};

export const DEFAULT_TRANSFORM: SlotTransform = { x: 0, y: 0, scale: 1 };

type Props = {
  value: PhotoSlotValue;
  onChange: (v: PhotoSlotValue) => void;
  aspect?: number; // width / height of the slot
  rounded?: number;
  label?: string;
  helper?: string;
};

/** Single-slot crop/zoom editor. Drag to reposition, wheel/pinch to zoom. */
export function PhotoSlot({ value, onChange, aspect = 1, rounded = 8, label, helper }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  function pickFile() { fileRef.current?.click(); }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const src = String(r.result);
      const img = new Image();
      img.onload = () => onChange({ src, transform: DEFAULT_TRANSFORM, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
      img.src = src;
    };
    r.readAsDataURL(f);
  }

  function clampScale(s: number) { return Math.min(6, Math.max(0.5, s)); }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!value.src) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: value.transform.x, oy: value.transform.y };
    setDragging(true);
  }, [value.src, value.transform.x, value.transform.y]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    onChange({ ...value, transform: { ...value.transform, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy } });
  }, [value, onChange]);

  const onPointerUp = useCallback(() => { dragRef.current = null; setDragging(false); }, []);

  function onWheel(e: React.WheelEvent) {
    if (!value.src) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
    onChange({ ...value, transform: { ...value.transform, scale: clampScale(value.transform.scale * factor) } });
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      pinchRef.current = { dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), scale: value.transform.scale };
    }
  }
  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const [a, b] = [e.touches[0], e.touches[1]];
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const next = clampScale(pinchRef.current.scale * (d / pinchRef.current.dist));
      onChange({ ...value, transform: { ...value.transform, scale: next } });
    }
  }
  function onTouchEnd() { pinchRef.current = null; }

  // Prevent body scroll while dragging on touch
  useEffect(() => {
    if (!dragging) return;
    const prev = document.body.style.overscrollBehavior;
    document.body.style.overscrollBehavior = "none";
    return () => { document.body.style.overscrollBehavior = prev; };
  }, [dragging]);

  return (
    <div>
      {label && <div className="mb-2 text-xs font-medium text-muted-foreground">{label}</div>}
      <div
        ref={boxRef}
        className={`relative w-full select-none overflow-hidden bg-neutral-100 ${value.src ? "cursor-grab" : ""} ${dragging ? "cursor-grabbing" : ""}`}
        style={{ aspectRatio: `${aspect} / 1`, borderRadius: rounded, touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {value.src ? (
          <img
            src={value.src}
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 max-w-none"
            style={{
              transform: `translate(-50%,-50%) translate(${value.transform.x}px, ${value.transform.y}px) scale(${value.transform.scale})`,
              transformOrigin: "center center",
              height: "100%",
              width: "auto",
              willChange: "transform",
            }}
          />
        ) : (
          <button
            type="button"
            onClick={pickFile}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <Upload className="h-5 w-5" />
            Tap to upload a photo
          </button>
        )}
        {value.src && (
          <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            <Move className="h-3 w-3" /> drag · scroll/pinch to zoom
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={pickFile} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">
          {value.src ? "Replace photo" : "Upload photo"}
        </button>
        {value.src && (
          <>
            <button type="button" onClick={() => onChange({ ...value, transform: { ...value.transform, scale: clampScale(value.transform.scale * 1.15) } })}
              className="grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-accent" aria-label="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => onChange({ ...value, transform: { ...value.transform, scale: clampScale(value.transform.scale / 1.15) } })}
              className="grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-accent" aria-label="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => onChange({ ...value, transform: DEFAULT_TRANSFORM })}
              className="grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-accent" aria-label="Reset">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
      {helper && <p className="mt-2 text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}