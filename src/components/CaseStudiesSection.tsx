"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// Case study preview images
const imgImage45 = "https://www.figma.com/api/mcp/asset/a3174b42-b14d-41ba-8f19-6154daf732c6";

const caseStudies = [
  {
    id: 1,
    title: "Customer 360",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    skills: "Research, design, testing, ai",
    duration: "4 months",
    impact: "improved resolution time by 40 percent",
    image: imgImage45,
  },
  {
    id: 2,
    title: "Customer 360",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    skills: "Research, design, testing, ai",
    duration: "4 months",
    impact: "improved resolution time by 40 percent",
    image: imgImage45,
  },
  {
    id: 3,
    title: "Customer 360",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    skills: "Research, design, testing, ai",
    duration: "4 months",
    impact: "improved resolution time by 40 percent",
    image: imgImage45,
  },
];

function CaseStudyCard({
  title,
  description,
  skills,
  duration,
  impact,
  image,
}: (typeof caseStudies)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 500, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 500, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      rawX.set(e.clientX - rect.left - 40);
      rawY.set(e.clientY - rect.top - 40);
    }
  }

  return (
    <div
      ref={ref}
      className="group relative w-full overflow-hidden xl:h-[403px]"
      style={{
        background: "var(--bg-secondary)",
        borderRadius: 0,
        cursor: reduceMotion ? "pointer" : "none",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* "View Project" custom cursor — unchanged */}
      {!reduceMotion && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute pointer-events-none z-50 flex items-center justify-center w-[80px] h-[80px] rounded-full"
              style={{
                x: springX,
                y: springY,
                background: "var(--text-primary)",
                opacity: 0.88,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.88 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <span
                className="text-[11px] font-medium text-center leading-tight"
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  color: "var(--bg-primary)",
                }}
              >
                View<br />Project
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* CASE STUDY amber badge — position: absolute, top-left */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "#D97706",
          padding: "4px",
          width: "100px",
          borderRadius: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-chivo-mono), monospace",
            fontWeight: 400,
            fontSize: "12px",
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
          }}
        >
          case study
        </span>
      </div>

      {/*
        Image area:
          mobile (<768px)  — full width, 200px tall, in flow
          tablet (768-1279px) — 547×316px, centered (mx-auto), in flow
          desktop (>=1280px) — absolute: left 261px, top 32px, 547×316px
      */}
      <div
        className={[
          "overflow-hidden w-full h-[200px]",
          "md:mx-auto md:w-[547px] md:h-[316px]",
          "xl:absolute xl:top-8 xl:left-[261px] xl:mx-0",
        ].join(" ")}
        style={{ borderRadius: "6px 6px 0 0" }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/*
        Bottom text panel:
          mobile/tablet — in flow, below image
          desktop (xl+) — absolute: bottom 0, left 0, full width
        Gradient background goes from var(--bg-secondary) at bottom to transparent at top.
      */}
      <div
        className="xl:absolute xl:bottom-0 xl:left-0 xl:w-full"
        style={{
          padding: "48px 36px 36px 36px",
          background:
            "linear-gradient(to top, var(--bg-secondary) 60%, transparent 100%)",
          backdropFilter: "blur(15px)",
        }}
      >
        {/*
          Inner row:
            mobile/tablet — flex column
            desktop (xl+) — flex row, gap 24px, align-items flex-end
        */}
        <div
          className="flex flex-col xl:flex-row xl:items-end"
          style={{ gap: "24px", width: "100%" }}
        >
          {/* Left column: title + description — 428px on desktop, full width on mobile */}
          <div
            className="flex flex-col"
            style={{ gap: "8px", minWidth: 0, flex: "0 0 auto" }}
          >
            <div style={{ width: "428px", maxWidth: "100%" }}>
              <h3
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "var(--text-primary)",
                  lineHeight: "1.3",
                }}
              >
                {title}
              </h3>
            </div>
            <div style={{ width: "428px", maxWidth: "100%" }}>
              <p
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                }}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Right column: three metadata items — stacked on mobile, row on desktop */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center"
            style={{ gap: "16px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--text-secondary)",
                minWidth: "144px",
              }}
            >
              {skills}
            </span>
            <span
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--text-secondary)",
                minWidth: "80px",
              }}
            >
              {duration}
            </span>
            <span
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--text-secondary)",
                minWidth: "166px",
              }}
            >
              {impact}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  return (
    /* Figma spec: max-width 1070px, centered, flex col, gap 80px, no section bg */
    <section className="w-full">
      <div
        className="mx-auto px-4 sm:px-8 flex flex-col"
        style={{ maxWidth: "1070px", gap: "80px" }}
      >
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} {...cs} />
        ))}
      </div>
    </section>
  );
}
