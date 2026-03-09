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
      className="relative h-[403px] overflow-hidden w-full group"
      style={{ background: "var(--bg-secondary)", cursor: reduceMotion ? "pointer" : "none" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* "View Project" custom cursor — spring-smooth, respects reduced-motion */}
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
      {/* Floating preview image */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[547px] h-[316px] rounded-t-[6px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top scale-110 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Orange badge */}
      <div
        className="absolute top-4 left-4 px-2 py-1"
        style={{ background: "var(--accent-amber)" }}
      >
        <span
          className="text-[12px] uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-chivo-mono), monospace",
            fontWeight: 400,
            color: "var(--text-cta)",
          }}
        >
          case study
        </span>
      </div>

      {/* Bottom info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 px-9 pt-12 pb-9"
        style={{
          background: "linear-gradient(1.82deg, var(--bg-secondary) 38%, transparent 131%)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="flex gap-6 items-end">
          {/* Title + description */}
          <div className="flex flex-col gap-2 w-[428px] shrink-0">
            <h3
              className="text-[24px]"
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h3>
            <p
              className="text-[16px] leading-snug"
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                color: "var(--text-secondary)",
              }}
            >
              {description}
            </p>
          </div>

          {/* Metadata */}
          <div
            className="flex gap-12 items-center text-[16px]"
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              color: "var(--text-secondary)",
            }}
          >
            <p className="w-[144px]">{skills}</p>
            <p className="w-20">{duration}</p>
            <p className="w-[166px]">{impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-[185px] flex flex-col gap-[80px]">
      {caseStudies.map((cs) => (
        <CaseStudyCard key={cs.id} {...cs} />
      ))}
    </section>
  );
}
