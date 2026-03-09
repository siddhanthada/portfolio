"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const STAGE_KEY = "plant_stage";
const VISIT_KEY = "plant_visits";
const MAX_STAGE = 5;

type Droplet = { id: number; x: number; delay: number };

/* ── Pot – always visible, sits in front of plant stems ─────────────── */
function Pot() {
  return (
    <g>
      {/* Rim */}
      <rect x="58" y="207" width="84" height="12" rx="3" fill="#9b6b3a" />
      {/* Body (trapezoid) */}
      <polygon points="68,219 132,219 122,268 78,268" fill="#c2855a" />
      {/* Sheen */}
      <polygon points="68,219 84,219 79,268 78,268" fill="rgba(255,255,255,0.12)" />
      {/* Shadow stripe */}
      <line
        x1="124" y1="233" x2="120" y2="260"
        stroke="#9b6b3a" strokeWidth="1.5" strokeOpacity="0.3"
      />
      {/* Soil */}
      <ellipse cx="100" cy="213" rx="32" ry="7" fill="#6b4226" />
      <ellipse cx="89"  cy="213" rx="9"  ry="3"   fill="#55311b" fillOpacity="0.5"  />
      <ellipse cx="112" cy="212" rx="7"  ry="2.5" fill="#55311b" fillOpacity="0.35" />
    </g>
  );
}

/* ── Cumulative plant content per stage ──────────────────────────────── */
function PlantContent({ stage }: { stage: number }) {
  if (stage < 2) return null;

  return (
    <>
      {/* ── Stage 2 — sprout ── */}
      <path
        d="M100 213 Q101.5 197 100 183"
        stroke="#3d7a52" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />
      {/* left leaf */}
      <path
        d="M100 189 C88 185 79 177 77 168 C83 174 91 182 100 186 Z"
        fill="#52a06a"
      />
      {/* right leaf */}
      <path
        d="M100 192 C112 188 121 180 123 171 C117 177 109 185 100 189 Z"
        fill="#4a9060"
      />

      {/* ── Stage 3 — small plant ── */}
      {stage >= 3 && (
        <>
          <path
            d="M100 183 Q103 165 100 148"
            stroke="#3d7a52" strokeWidth="2.5" fill="none" strokeLinecap="round"
          />
          {/* mid-right leaf */}
          <path
            d="M100 171 C115 164 127 153 128 140 C121 149 110 160 100 167 Z"
            fill="#52a06a"
          />
          {/* mid-left leaf */}
          <path
            d="M100 165 C84 158 72 147 71 134 C78 143 89 154 100 161 Z"
            fill="#4a9060"
          />
        </>
      )}

      {/* ── Stage 4 — medium plant ── */}
      {stage >= 4 && (
        <>
          {/* stem extension */}
          <path
            d="M100 148 Q104 130 100 115"
            stroke="#3d7a52" strokeWidth="3" fill="none" strokeLinecap="round"
          />
          {/* right branch */}
          <path
            d="M100 148 Q118 138 130 128"
            stroke="#3d7a52" strokeWidth="2" fill="none" strokeLinecap="round"
          />
          {/* left branch */}
          <path
            d="M100 142 Q82 132 70 122"
            stroke="#3d7a52" strokeWidth="2" fill="none" strokeLinecap="round"
          />
          {/* right branch leaf */}
          <path
            d="M130 128 C138 118 140 104 135 93 C132 105 129 118 122 127 Z"
            fill="#52a06a"
          />
          {/* left branch leaf */}
          <path
            d="M70 122 C62 112 60 98 65 87 C68 99 71 112 78 121 Z"
            fill="#4a9060"
          />
          {/* upper-right leaf */}
          <path
            d="M100 128 C116 120 128 107 129 93 C122 104 111 117 100 124 Z"
            fill="#52a06a"
          />
          {/* upper-left leaf */}
          <path
            d="M100 122 C84 114 72 101 71 87 C78 98 89 111 100 118 Z"
            fill="#4a9060"
          />
        </>
      )}

      {/* ── Stage 5 — full bloom ── */}
      {stage >= 5 && (
        <>
          {/* stem to top */}
          <path
            d="M100 115 Q104 100 100 85"
            stroke="#3d7a52" strokeWidth="3" fill="none" strokeLinecap="round"
          />
          {/* upper-right branch */}
          <path
            d="M100 108 Q116 100 126 92"
            stroke="#3d7a52" strokeWidth="2" fill="none" strokeLinecap="round"
          />
          {/* upper-left branch */}
          <path
            d="M100 102 Q84 94 74 86"
            stroke="#3d7a52" strokeWidth="2" fill="none" strokeLinecap="round"
          />
          {/* upper-right leaf */}
          <path
            d="M126 92 C133 82 134 69 129 58 C127 70 124 82 118 91 Z"
            fill="#52a06a"
          />
          {/* upper-left leaf */}
          <path
            d="M74 86 C67 76 66 63 71 52 C73 64 76 76 82 85 Z"
            fill="#4a9060"
          />
          {/* flower petals */}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            const px = 100 + Math.cos(rad) * 12;
            const py = 72 + Math.sin(rad) * 12;
            return (
              <ellipse
                key={a}
                cx={px} cy={py} rx="5" ry="8"
                transform={`rotate(${a + 90}, ${px}, ${py})`}
                fill="#fcd34d"
              />
            );
          })}
          {/* flower centre */}
          <circle cx="100" cy="72" r="7"  fill="#f59e0b" />
          <circle cx="100" cy="72" r="3.5" fill="#d97706" />
        </>
      )}
    </>
  );
}

const stageLabels = [
  "",
  "Newly planted.",
  "A sprout appeared!",
  "Growing nicely.",
  "Almost there!",
  "Fully bloomed! 🌸",
];

/* ── Main component ─────────────────────────────────────────────────── */
export default function GrowingPlant() {
  const [stage, setStage]     = useState(1);
  const [visits, setVisits]   = useState(1);
  const [watering, setWatering] = useState(false);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const reduceMotion = useReducedMotion();

  /* Read localStorage on mount */
  useEffect(() => {
    const v = parseInt(localStorage.getItem(VISIT_KEY) ?? "0", 10);
    const newVisits = (isNaN(v) ? 0 : v) + 1;
    localStorage.setItem(VISIT_KEY, String(newVisits));
    setVisits(newVisits);

    const s = parseInt(localStorage.getItem(STAGE_KEY) ?? "1", 10);
    setStage(isNaN(s) ? 1 : Math.min(Math.max(s, 1), MAX_STAGE));
  }, []);

  /* Water / grow */
  const handleWater = useCallback(() => {
    if (watering || stage >= MAX_STAGE) return;
    setWatering(true);

    if (!reduceMotion) {
      setDroplets([
        { id: 1, x: 74, delay: 0    },
        { id: 2, x: 89, delay: 0.12 },
        { id: 3, x: 104, delay: 0.24 },
        { id: 4, x: 83, delay: 0.36 },
      ]);
    }

    setTimeout(() => {
      setStage((prev) => {
        const next = Math.min(prev + 1, MAX_STAGE);
        localStorage.setItem(STAGE_KEY, String(next));
        return next;
      });
      setDroplets([]);
      setWatering(false);
    }, reduceMotion ? 50 : 700);
  }, [watering, stage, reduceMotion]);

  /* Reset */
  const handleReset = useCallback(() => {
    localStorage.removeItem(STAGE_KEY);
    localStorage.removeItem(VISIT_KEY);
    setStage(1);
    setVisits(1);
    setDroplets([]);
    setWatering(false);
  }, []);

  return (
    <div
      className="flex-1 h-[368px] relative overflow-hidden flex flex-col items-center justify-center gap-2"
      style={{ border: "1px solid var(--border-primary)" }}
    >
      {/* Visit counter */}
      <p
        className="absolute top-4 left-4 text-[11px] uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-tertiary)",
        }}
      >
        visit #{visits}
      </p>

      {/* Stage indicator */}
      <p
        className="absolute top-4 right-4 text-[11px] uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-tertiary)",
        }}
      >
        stage {stage}/{MAX_STAGE}
      </p>

      {/* ── Plant + droplet layer ── */}
      <div className="relative flex-shrink-0" style={{ width: 180, height: 252 }}>

        {/* Plant content — behind the pot */}
        <AnimatePresence>
          <motion.svg
            key={stage}
            viewBox="0 0 200 280"
            width="180"
            height="252"
            className="absolute inset-0"
            style={{ zIndex: 0 }}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PlantContent stage={stage} />
          </motion.svg>
        </AnimatePresence>

        {/* Pot — always visible, in front of plant */}
        <svg
          viewBox="0 0 200 280"
          width="180"
          height="252"
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          <Pot />
        </svg>

        {/* Water droplets */}
        <AnimatePresence>
          {droplets.map((d) => (
            <motion.div
              key={d.id}
              className="absolute pointer-events-none"
              style={{ left: d.x, top: 0, zIndex: 20 }}
              initial={{ y: -10, opacity: 1 }}
              animate={{ y: 215, opacity: [1, 0.9, 0] }}
              transition={{ duration: 0.65, delay: d.delay, ease: "easeIn" }}
            >
              <svg viewBox="0 0 8 12" width="7" height="10">
                <path
                  d="M4 0 C4 0 8 5 8 7.5 C8 10 6.2 12 4 12 C1.8 12 0 10 0 7.5 C0 5 4 0 4 0 Z"
                  fill="#60a5fa"
                  opacity="0.85"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          className="text-[13px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
          initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {stageLabels[stage]}
        </motion.p>
      </AnimatePresence>

      {/* Stage-5 CTA */}
      <AnimatePresence>
        {stage >= MAX_STAGE && (
          <motion.p
            className="text-[12px] text-center px-6"
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              color: "var(--text-secondary)",
            }}
            initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Let&apos;s build something together!
          </motion.p>
        )}
      </AnimatePresence>

      {/* Water button */}
      {stage < MAX_STAGE && (
        <button
          onClick={handleWater}
          disabled={watering}
          className="px-4 py-1.5 text-[12px] uppercase tracking-wider transition-opacity disabled:opacity-40"
          style={{
            fontFamily: "var(--font-chivo-mono), monospace",
            fontWeight: 400,
            border: "1px solid var(--border-primary)",
            color: "var(--text-secondary)",
            background: "transparent",
            cursor: watering ? "not-allowed" : "pointer",
          }}
        >
          {watering ? "Watering…" : "Water plant 💧"}
        </button>
      )}

      {/* Start over */}
      <button
        onClick={handleReset}
        className="text-[11px] uppercase tracking-wider transition-opacity hover:opacity-60"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-tertiary)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        start over
      </button>
    </div>
  );
}
