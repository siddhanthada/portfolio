"use client";

import { useState } from "react";
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

// Assets (replace with hosted URLs before 7-day Figma expiry)
const imgMyLogoUpdated  = "https://www.figma.com/api/mcp/asset/abb293d4-40d1-49e0-aa97-b0273d29691f";
// Fix 1a — dark theme logo (local hosted SVG)
const imgMyLogoDark     = "/assets/My Logo dark.svg";
const imgSunIcon        = "https://www.figma.com/api/mcp/asset/41589f48-d868-40f3-8955-28fb77f3c5a0";
const imgMoonIcon       = "https://www.figma.com/api/mcp/asset/df708931-c827-419d-8882-eebc67e9f137";
const imgA11yIcon1      = "https://www.figma.com/api/mcp/asset/5b1dd8fa-9f83-4b1c-b6d5-696513173738";
const imgA11yIcon2      = "https://www.figma.com/api/mcp/asset/19169aec-9b40-471a-bfd3-9d512ce41f4d";

const navItems = [
  { name: "Work",    link: "#work"    },
  { name: "About",   link: "#about"   },
  { name: "Process", link: "#process" },
  { name: "Contact", link: "#contact" },
];

export default function PortfolioNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Controls = () => (
    <div
      className="flex items-center gap-3 shrink-0"
      style={{ width: "171px", justifyContent: "flex-end" }}
    >
      {/* Theme toggle — shows sun in dark mode (click → light), moon in light (click → dark) */}
      <button
        onClick={toggleTheme}
        className="w-[40px] h-[40px] flex items-center justify-center border hover:opacity-80 transition-opacity"
        style={{ borderColor: "var(--navbar-icon-btn-border)" }}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative shrink-0 w-5 h-5">
          <img
            src={isDark ? imgSunIcon : imgMoonIcon}
            alt=""
            className={`absolute block w-full h-full${isDark ? " navbar-sun-img" : ""}`}
          />
        </div>
      </button>

      {/* Accessibility */}
      <div
        className="flex items-center justify-center gap-1 border"
        style={{ borderColor: "var(--navbar-icon-btn-border)", padding: "10px" }}
        title="Accessibility options"
      >
        <div className="relative shrink-0 w-5 h-5">
          {/* Fix 1c — navbar-a11y-img gets brightness(0) invert(1) filter in dark mode */}
          <img src={imgA11yIcon1} alt="" className="absolute block w-full h-full navbar-a11y-img" />
        </div>
        <div className="relative shrink-0 w-5 h-5">
          <img src={imgA11yIcon2} alt="" className="absolute block w-full h-full navbar-a11y-img" />
        </div>
      </div>
    </div>
  );

  return (
    <Navbar>
      {/* ── Desktop ── */}
      <NavBody>
        {/* Logo — 51px tall, sets natural nav height at rest */}
        {/* Fix 1a — swap to dark logo SVG in dark theme */}
        <div className="shrink-0 h-[51px] w-[171px]">
          <img
            src={isDark ? imgMyLogoDark : imgMyLogoUpdated}
            alt="Siddhant.design"
            className="h-full w-full object-contain object-left"
          />
        </div>

        {/* Nav links — Aceternity layoutId hover animation, portfolio fonts */}
        <NavItems items={navItems} />

        <Controls />
      </NavBody>

      {/* ── Mobile ── */}
      <MobileNav>
        <MobileNavHeader>
          {/* Fix 1a — mobile: swap to dark logo SVG in dark theme */}
          <div className="shrink-0 h-[36px] w-[121px]">
            <img
              src={isDark ? imgMyLogoDark : imgMyLogoUpdated}
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
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2 uppercase text-[14px]"
              style={{
                fontFamily: "var(--font-chivo-mono), monospace",
                fontWeight: 400,
                color: "var(--text-tertiary)",
              }}
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
