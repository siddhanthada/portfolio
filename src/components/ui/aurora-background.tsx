"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      {/* Aurora layer — absolutely fills the container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            // Base gradient layers: white stripe + colour aurora
            "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]",
            "[background-image:var(--white-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            // Blur + invert so colours show through white background
            "blur-[10px] invert",
            // Animated after-layer for shimmer
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--white-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora",
            "after:[background-attachment:fixed]",
            "after:mix-blend-difference",
            // Positioning
            "absolute -inset-[10px] opacity-50 will-change-transform",
            // aurora-inner — targeted by [data-theme="dark"] .aurora-inner in globals.css
            // to remove `invert` and switch blend mode for dark backgrounds
            "aurora-inner",
            // Optional radial mask to concentrate glow top-right
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        />
      </div>

      {/* Content renders on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
