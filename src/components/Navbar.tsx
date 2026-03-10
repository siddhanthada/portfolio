"use client";

import { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { useTheme } from "@/contexts/ThemeContext";
import A11yDropdown from "@/components/A11yDropdown";

// Local SVG assets (placed in /public/assets/ before deploy)
const imgMyLogoDark = "/assets/My Logo dark.svg";
const imgMyLogoLight = "https://www.figma.com/api/mcp/asset/abb293d4-40d1-49e0-aa97-b0273d29691f";

// Fix 4: Use local SVGs for moon/sun icons
const imgMoonIcon = "/assets/moon icon.svg";
const imgSunIcon  = "/assets/sun icon.svg";

const navItems = [
  { name: "Work",    link: "#work"    },
  { name: "About",   link: "#about"   },
  { name: "Process", link: "#process" },
  { name: "Contact", link: "#contact" },
];

/** Fix 7: smooth scroll to section, offset by navbar height */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbarHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

// Standalone component — each instance (desktop + mobile) owns its state independently
function A11yControls() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const a11yPanelRef = useRef<HTMLDivElement>(null);
  const a11yButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!a11yOpen) return;
      const clickedInsidePanel = a11yPanelRef.current?.contains(e.target as Node);
      const clickedButton = a11yButtonRef.current?.contains(e.target as Node);
      if (!clickedInsidePanel && !clickedButton) {
        setA11yOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [a11yOpen]);

  useEffect(() => {
    if (!a11yOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setA11yOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [a11yOpen]);

  const handleA11yButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setA11yOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        ref={a11yButtonRef}
        onClick={handleA11yButtonClick}
        className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
        style={{
          padding: "10px",
          gap: "4px",
          border: "1px solid var(--navbar-icon-btn-border)",
          background: "none",
          cursor: "pointer",
          flexShrink: 0,
          height: "40px",
        }}
        aria-label="Accessibility options"
        aria-expanded={a11yOpen}
        aria-haspopup="true"
      >
        <img
          src="/assets/accessibility icon.svg"
          alt=""
          width={20}
          height={20}
          className="navbar-a11y-img"
          style={{ flexShrink: 0 }}
        />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            color: "var(--text-primary)",
            flexShrink: 0,
            transition: "transform 200ms",
            transform: a11yOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <A11yDropdown isOpen={a11yOpen} panelRef={a11yPanelRef} />
    </div>
  );
}

// Standalone theme toggle with spin-fade animation
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [displayDark, setDisplayDark] = useState(isDark);
  const [iconStyle, setIconStyle] = useState<{
    transform: string;
    opacity: number;
    transition?: string;
  }>({ transform: "rotate(0deg)", opacity: 1 });
  const animatingRef = useRef(false);

  // Sync display state if theme changes externally (e.g. SSR hydration)
  useEffect(() => {
    if (!animatingRef.current) setDisplayDark(isDark);
  }, [isDark]);

  const handleClick = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    // Phase 1: spin current icon out
    setIconStyle({
      transform: "rotate(180deg)",
      opacity: 0,
      transition: "transform 180ms ease-in, opacity 180ms ease-in",
    });

    setTimeout(() => {
      // Midpoint: swap icon + theme, snap new icon to entry position (no transition)
      setDisplayDark((prev) => !prev);
      toggleTheme();
      setIconStyle({ transform: "rotate(-180deg)", opacity: 0, transition: "none" });

      // Double rAF forces DOM to paint the snap state before animating in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Phase 2: spin new icon in
          setIconStyle({
            transform: "rotate(0deg)",
            opacity: 1,
            transition: "transform 180ms ease-out, opacity 180ms ease-out",
          });
          setTimeout(() => { animatingRef.current = false; }, 180);
        });
      });
    }, 180);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
      style={{
        padding: "10px",
        border: "1px solid var(--navbar-icon-btn-border)",
        background: "none",
        cursor: "pointer",
        position: "relative",
        width: "40px",
        height: "40px",
        flexShrink: 0,
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <img
        src={displayDark ? imgSunIcon : imgMoonIcon}
        alt=""
        className={displayDark ? "navbar-sun-img" : ""}
        style={{ position: "absolute", width: "20px", height: "20px", ...iconStyle }}
      />
    </button>
  );
}

export default function PortfolioNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inline Controls — rendered in both desktop and mobile header
  const Controls = () => (
    <div className="flex items-center shrink-0" style={{ gap: "12px" }}>

      <ThemeToggle />

      {/* Accessibility — self-contained per instance */}
      <A11yControls />
    </div>
  );

  return (
    <Navbar>
      {/* ── Desktop ── */}
      <NavBody>
        <div className="shrink-0 h-[51px] w-[171px]">
          <img
            src={isDark ? imgMyLogoDark : imgMyLogoLight}
            alt="Siddhant.design"
            className="h-full w-full object-contain object-left"
          />
        </div>

        {/* Fix 7: Use onItemClick with e.preventDefault + JS scroll */}
        <NavItems
          items={navItems}
          onItemClick={(e, item) => {
            e.preventDefault();
            const id = item.link.replace("#", "");
            scrollToSection(id);
          }}
        />

        <Controls />
      </NavBody>

      {/* ── Mobile ── */}
      <MobileNav>
        <MobileNavHeader>
          <div className="shrink-0 h-[36px] w-[121px]">
            <img
              src={isDark ? imgMyLogoDark : imgMyLogoLight}
              alt="Siddhant.design"
              className="h-full w-full object-contain object-left"
            />
          </div>
          <div className="flex items-center gap-3">
            <Controls />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Fix 7: mobile links use JS scroll + close menu */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                const id = item.link.replace("#", "");
                scrollToSection(id);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 uppercase text-[14px] text-left"
              style={{
                fontFamily: "var(--font-chivo-mono), monospace",
                fontWeight: 400,
                color: "var(--text-tertiary)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
