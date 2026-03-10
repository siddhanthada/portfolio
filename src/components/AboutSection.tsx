"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Personal section SVG — full clothesline strip (swaps per theme)
const imgPersonalLight = "/assets/Personal section Light Theme.svg";
const imgPersonalDark  = "/assets/Personal section Dark Theme.svg";

// Polaroid photo bounding boxes within the 1439×268 SVG canvas (left to right)
// Derived from SVG path coordinates
const polaroidPhotos = [
  {
    id: 1,
    title: "One of my favorite pastimes. ~900 Elo. Challenge me on Chess.com: its_Siddhant.",
    left: 185, top: 39, width: 146, height: 210,
  },
  {
    id: 2,
    title: "Motorcycle enthusiast. I ride a Himalayan 450. Always up for a ride.",
    left: 415, top: 63, width: 134, height: 203,
  },
  {
    id: 3,
    title: "Still searching for a decent photo of myself. Consider this a placeholder.",
    left: 657, top: 71, width: 125, height: 197,
  },
  {
    id: 4,
    title: "I sketch sometimes. Occasionally they even become stickers.",
    left: 890, top: 57, width: 133, height: 202,
  },
  {
    id: 5,
    title: "Always yes for chai. Also building something for fellow chai lovers.",
    left: 1109, top: 32, width: 146, height: 210,
  },
];

export default function AboutSection() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full overflow-hidden">

      {/* Title — responsive width, no horizontal overflow */}
      <p
        className="text-center py-2 sm:py-0 sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2"
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          color: "var(--text-primary)",
          fontSize: "clamp(26px, 4vw, 36px)",
          lineHeight: "56px",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        A bit about me
      </p>

      {/* Photo strip */}
      <div
        className="relative w-full overflow-hidden mt-2 sm:mt-0 sm:absolute sm:left-0 sm:top-[56px]"
        style={{ height: "268px" }}
      >
        {/* Mobile (< sm): SVG scaled to full width — no overlay */}
        <img
          src={isDark ? imgPersonalDark : imgPersonalLight}
          alt=""
          className="block sm:hidden w-full h-full object-cover"
        />

        {/* sm+: 1440px canvas centred */}
        <div
          className="hidden sm:block absolute h-full"
          style={{ width: "1440px", left: "50%", transform: "translateX(-50%)" }}
        >
          <img
            src={isDark ? imgPersonalDark : imgPersonalLight}
            alt=""
            className="absolute block w-full h-full"
          />

          {/* Following Pointer overlays — transparent hit areas over each photo */}
          {polaroidPhotos.map((photo) => (
            <div
              key={photo.id}
              className="absolute"
              style={{
                left: photo.left,
                top: photo.top,
                width: photo.width,
                height: photo.height,
                zIndex: 5,
              }}
            >
              <FollowerPointerCard title={photo.title} wrap className="w-full h-full">
                <div className="w-full h-full" />
              </FollowerPointerCard>
            </div>
          ))}

          {/* Left fade */}
          <div
            className="absolute left-0 top-0 h-full w-[184px] pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)", zIndex: 10 }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 h-full w-[184px] pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)", zIndex: 10 }}
          />
        </div>
      </div>

      {/* Height spacer for desktop (keeps section height = title + strip) */}
      <div className="hidden sm:block" style={{ height: "324px" }} />
    </div>
  );
}
