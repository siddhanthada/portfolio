"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      className={cn("relative flex flex-col", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y: any;
  title?: string | React.ReactNode;
}) => {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{ top: y, left: x }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {/* SVG cursor arrow */}
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-5 w-5 -translate-x-[10px] -translate-y-[8px] -rotate-[70deg] stroke-[var(--accent-indigo)] text-[var(--accent-indigo)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>

      {/* Label pill */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="ml-2 mt-1 rounded-full bg-[var(--accent-indigo)] px-3 py-1 text-[12px] text-white whitespace-nowrap min-w-max"
        style={{ fontFamily: "var(--font-chivo-mono), monospace", fontWeight: 400 }}
      >
        {title ?? "View Project"}
      </motion.div>
    </motion.div>
  );
};
