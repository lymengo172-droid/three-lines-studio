import type { Product } from "./catalog";
import type { SlotTransform } from "@/components/site/PhotoSlot";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Render the live preview to a flat JPEG dataURL we can save with the order.
 * Returns null if assets cross-origin taint the canvas.
 */
export async function renderPreviewDataUrl(
  product: Product,
  art: string | undefined,
  transform: SlotTransform | undefined,
  note?: string,
): Promise<string | null> {
  if (!art) return null;
  try {
    const mockup = await loadImage(product.mockup);
    const W = 1000;
    const H = 1000;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // mockup background (cover)
    const mr = Math.max(W / mockup.width, H / mockup.height);
    const mw = mockup.width * mr, mh = mockup.height * mr;
    ctx.drawImage(mockup, (W - mw) / 2, (H - mh) / 2, mw, mh);

    const area = product.printArea ?? { top: 30, left: 30, width: 40, height: 40, rounded: 4 };
    const ax = area.left / 100 * W;
    const ay = area.top / 100 * H;
    const aw = area.width / 100 * W;
    const ah = area.height / 100 * H;

    // clip to print area
    ctx.save();
    const r = (area.rounded ?? 4);
    if (typeof (ctx as unknown as { roundRect?: unknown }).roundRect === "function") {
      ctx.beginPath();
      (ctx as unknown as { roundRect: (x: number, y: number, w: number, h: number, r: number) => void }).roundRect(ax, ay, aw, ah, r);
      ctx.clip();
    } else {
      ctx.beginPath(); ctx.rect(ax, ay, aw, ah); ctx.clip();
    }

    const artImg = await loadImage(art);
    const t = transform ?? { x: 0, y: 0, scale: 1 };
    // Slot fits art by height; then apply transform (translate in px scaled to slot, then scale)
    const baseH = ah;
    const baseW = artImg.width * (baseH / artImg.height);
    const drawH = baseH * t.scale;
    const drawW = baseW * t.scale;
    // Transform.x/y are in CSS pixels of the on-screen slot. Scale them to canvas slot.
    const slotPxToCanvas = aw / Math.max(1, (typeof window !== "undefined" ? Math.min(window.innerWidth, 800) : 800)); // rough
    const tx = t.x * slotPxToCanvas + ax + aw / 2 - drawW / 2;
    const ty = t.y * slotPxToCanvas + ay + ah / 2 - drawH / 2;
    ctx.drawImage(artImg, tx, ty, drawW, drawH);
    ctx.restore();

    if (note) {
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      const pad = 10;
      ctx.font = "600 18px Inter, system-ui, sans-serif";
      const tw = ctx.measureText(note).width;
      const bx = ax + aw / 2 - (tw + pad * 2) / 2;
      const by = ay + ah - 36;
      ctx.fillRect(bx, by, tw + pad * 2, 28);
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "middle";
      ctx.fillText(note, bx + pad, by + 14);
      ctx.restore();
    }

    return canvas.toDataURL("image/jpeg", 0.85);
  } catch (e) {
    console.warn("renderPreviewDataUrl failed", e);
    return null;
  }
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(meta)?.[1] ?? "image/jpeg";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/** Compute a print-size DPI warning. Returns null if OK, else warning text. */
export function dpiWarning(naturalW: number | undefined, naturalH: number | undefined, dims: string | undefined, minDpi = 150): string | null {
  if (!naturalW || !naturalH || !dims) return null;
  const m = /(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)\s*cm/i.exec(dims);
  if (!m) return null;
  const cmW = parseFloat(m[1]);
  const cmH = parseFloat(m[2]);
  const needW = Math.round((cmW / 2.54) * minDpi);
  const needH = Math.round((cmH / 2.54) * minDpi);
  const px = Math.max(naturalW, naturalH);
  const need = Math.max(needW, needH);
  if (px >= need) return null;
  const actualDpi = Math.round((px / Math.max(cmW, cmH)) * 2.54);
  return `This photo is ${naturalW}×${naturalH}px (~${actualDpi} DPI at ${dims}). For sharp print we suggest ${need}px on the long edge (${minDpi} DPI). It will still print, but may look soft.`;
}