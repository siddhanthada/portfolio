"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HoverTooltipProps {
  children: React.ReactNode;
  /** Content rendered inside the tooltip card */
  content: React.ReactNode;
  className?: string;
}

/**
 * Tooltip card — appears directly above the hovered trigger, centred.
 *
 * Positioning:  left:50% positions the left edge at the trigger centre;
 *               x:"-50%" (Framer Motion) translates the card back by half
 *               its own width, centring it.  This avoids mixing Tailwind
 *               transform classes with FM's transform system.
 *
 * Animation:    simple opacity + y fade-in (no rotation, no spring skew).
 * Styling:      white card, #E4E4DF border, 8px radius, soft shadow.
 * No arrow.
 */
export function HoverTooltip({ children, content, className }: HoverTooltipProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            /* Horizontal centring via FM's x — avoids Tailwind/FM transform
               conflict that previously caused the skewed appearance. */
            initial={{ opacity: 0, x: "-50%", y: 6 }}
            animate={{
              opacity: 1,
              x: "-50%",
              y: 0,
              transition: { duration: 0.14, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              x: "-50%",
              y: 6,
              transition: { duration: 0.1 },
            }}
            /* left-1/2 puts the left edge at the horizontal centre of the
               trigger; FM x:"-50%" shifts the card back by half its width. */
            className="absolute bottom-full left-1/2 z-50 pointer-events-none"
            style={{ marginBottom: "8px" }}
          >
            {/* Card — no arrow element */}
            <div
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-primary)",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                padding: "10px 14px",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "13px",
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                lineHeight: 1.5,
              }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
