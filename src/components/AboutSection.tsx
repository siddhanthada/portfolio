"use client";

import { useTheme } from "@/contexts/ThemeContext";

// ─── Personal section SVG — full clothesline strip (swaps per theme) ──────────
// Each SVG contains the complete strip: rope, polaroid frames, photos,
// amber pins, and the "Personal" watermark text — 1440 × 268 px canvas.
const imgPersonalLight = "/assets/Personal section Light Theme.svg";
const imgPersonalDark  = "/assets/Personal section Dark Theme.svg";

// ---------------------------------------------------------------------------
export default function AboutSection() {
  const { isDark } = useTheme();

  return (
    // Fixed height to match Figma (title 56px + strip 268px = 324px)
    <div className="relative w-full h-[324px] overflow-hidden">

      {/* Title — centred on full-width canvas */}
      <p
        className="absolute top-0 text-center text-[36px] leading-[56px]"
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          color: "var(--text-primary)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "541px",
          whiteSpace: "nowrap",
        }}
      >
        A bit about me
      </p>

      {/* Photo strip — 268 px tall, pixel-precise 1440-px canvas centred */}
      <div className="absolute left-0 top-[56px] w-full h-[268px] overflow-hidden">
        <div
          className="absolute h-full"
          style={{ width: "1440px", left: "50%", transform: "translateX(-50%)" }}
        >
          {/* Single theme-swappable SVG — replaces all individual rope/polaroid/pin elements */}
          <img
            src={isDark ? imgPersonalDark : imgPersonalLight}
            alt=""
            className="absolute block w-full h-full"
          />

          {/* Left fade — colour matches parent --bg-primary */}
          <div
            className="absolute left-0 top-0 h-full w-[184px] pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 h-full w-[184px] pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
          />
        </div>
      </div>
    </div>
  );
}
