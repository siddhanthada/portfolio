"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
  wrap,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  wrap?: boolean;
}) => {
  const [isInside, setIsInside] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      className={cn("relative flex flex-col", className)}
    >
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isInside && (
              <FollowPointer
                x={mousePos.x}
                y={mousePos.y}
                title={title}
                wrap={wrap}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  wrap,
}: {
  x: number;
  y: number;
  title?: string | React.ReactNode;
  wrap?: boolean;
}) => {
  return (
    <>
      {/* Cursor icon at exact mouse position */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: x,
          top: y,
          zIndex: 9999,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          style={{
            width: "24px",
            height: "24px",
            color: "var(--accent-indigo)",
            transform: "rotate(-70deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      </motion.div>
      {/* Label box offset 12px from cursor */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: x + 20,
          top: y + 20,
          zIndex: 9999,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
      >
        <div
          style={{
            background: "var(--accent-indigo)",
            color: "white",
            padding: "8px 12px",
            borderRadius: 0,
            fontFamily: "var(--font-chivo-mono), monospace",
            fontWeight: 400,
            fontSize: "12px",
            ...(wrap
              ? {
                  width: "200px",
                  whiteSpace: "normal" as const,
                  wordBreak: "break-word" as const,
                }
              : {
                  whiteSpace: "nowrap" as const,
                }),
          }}
        >
          {title ?? "View Project"}
        </div>
      </motion.div>
    </>
  );
};
