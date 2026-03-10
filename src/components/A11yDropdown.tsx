"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type TogglesState = {
  highContrast: boolean;
  largeText: boolean;
  reduceTransparency: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  lineSpacing: boolean;
  srLabels: boolean;
  tabOrder: boolean;
};

const initialToggles: TogglesState = {
  highContrast: false,
  largeText: false,
  reduceTransparency: false,
  reduceMotion: false,
  dyslexiaFont: false,
  lineSpacing: false,
  srLabels: false,
  tabOrder: false,
};

function applyTabOrderAttributes(enabled: boolean) {
  if (typeof document === "undefined") return;
  if (enabled) {
    const focusable = document.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    let counter = 1;
    focusable.forEach((el) => {
      el.setAttribute("data-tab-order", String(counter++));
    });
  } else {
    document.querySelectorAll("[data-tab-order]").forEach((el) => {
      el.removeAttribute("data-tab-order");
    });
  }
}

// Pure display component — no click handler
function ToggleSwitch({ isOn }: { isOn: boolean }) {
  return (
    <div
      style={{
        width: "28px",
        height: "16px",
        borderRadius: 0,
        background: isOn ? "var(--accent-indigo)" : "var(--a11y-toggle-off)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        transition: "background 150ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: isOn ? "14px" : "2px",
          width: "12px",
          height: "12px",
          borderRadius: 0,
          background: "#FFFFFF",
          transition: "left 150ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "8px",
            lineHeight: 1,
            color: "var(--accent-indigo)",
            fontWeight: 700,
            opacity: isOn ? 1 : 0,
            transition: "opacity 150ms ease",
            userSelect: "none",
          }}
        >
          ✓
        </span>
      </span>
    </div>
  );
}

function DropdownSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: "8px", paddingBottom: "8px", width: "100%" }}>
      <p
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          color: "var(--text-primary)",
          marginBottom: "2px",
          lineHeight: "normal",
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", paddingLeft: "8px", paddingRight: "8px" }}>
        {children}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  isOn,
  onToggle,
}: {
  label: string;
  isOn: boolean;
  onToggle: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "7px",
        paddingBottom: "7px",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "var(--text-secondary)",
          whiteSpace: "nowrap",
          lineHeight: "normal",
        }}
      >
        {label}
      </p>
      <ToggleSwitch isOn={isOn} />
    </div>
  );
}

interface A11yDropdownProps {
  isOpen: boolean;
  panelRef?: React.RefObject<HTMLDivElement | null>;
}

export default function A11yDropdown({ isOpen, panelRef }: A11yDropdownProps) {
  const [toggles, setToggles] = useState<TogglesState>(initialToggles);

  // Auto-enable reduce-motion if OS setting is on
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setToggles((s) => ({ ...s, reduceMotion: true }));
    }
  }, []);

  // Apply CSS classes whenever toggle state changes
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("a11y-high-contrast", toggles.highContrast);
    html.classList.toggle("a11y-large-text", toggles.largeText);
    html.classList.toggle("a11y-reduce-transparency", toggles.reduceTransparency);
    html.classList.toggle("a11y-reduce-motion", toggles.reduceMotion);
    html.classList.toggle("a11y-dyslexia-font", toggles.dyslexiaFont);
    html.classList.toggle("a11y-line-spacing", toggles.lineSpacing);
    html.classList.toggle("a11y-sr-labels", toggles.srLabels);
    html.classList.toggle("a11y-tab-order", toggles.tabOrder);
    applyTabOrderAttributes(toggles.tabOrder);
  }, [toggles]);

  const handleToggle = (key: keyof TogglesState) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToggles(initialToggles);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "280px",
            background: "var(--surface-card)",
            border: "1px solid var(--border-primary)",
            boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "4px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "16px",
          }}
        >
          <DropdownSection title="Visual">
            <ToggleRow label="High Contrast" isOn={toggles.highContrast} onToggle={handleToggle("highContrast")} />
            <ToggleRow label="Large Text" isOn={toggles.largeText} onToggle={handleToggle("largeText")} />
            <ToggleRow label="Reduce Transparency" isOn={toggles.reduceTransparency} onToggle={handleToggle("reduceTransparency")} />
          </DropdownSection>

          <DropdownSection title="Motion">
            <ToggleRow label="Reduce Motion" isOn={toggles.reduceMotion} onToggle={handleToggle("reduceMotion")} />
          </DropdownSection>

          <DropdownSection title="Reading">
            <ToggleRow label="Dyslexia-Friendly Font" isOn={toggles.dyslexiaFont} onToggle={handleToggle("dyslexiaFont")} />
            <ToggleRow label="Increased Line Spacing" isOn={toggles.lineSpacing} onToggle={handleToggle("lineSpacing")} />
          </DropdownSection>

          <DropdownSection title="Annotations">
            <ToggleRow label="Screen Reader Labels" isOn={toggles.srLabels} onToggle={handleToggle("srLabels")} />
            <ToggleRow label="Tab Order" isOn={toggles.tabOrder} onToggle={handleToggle("tabOrder")} />
          </DropdownSection>

          {/* Divider */}
          <div style={{ width: "100%", height: "1px", background: "var(--border-primary)", marginTop: "8px", marginBottom: "8px" }} />

          {/* Reset all */}
          <button
            onClick={resetAll}
            style={{
              fontFamily: "var(--font-chivo-mono), monospace",
              fontWeight: 400,
              fontSize: "12px",
              color: "var(--text-tertiary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            reset all
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
