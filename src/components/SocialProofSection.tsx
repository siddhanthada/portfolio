"use client";

import { HoverTooltip } from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";

// Light theme logos (Figma assets)
const imgWestPharmaIconUpdated   = "https://www.figma.com/api/mcp/asset/892e96b8-10d4-4700-82a8-1d205ac1d741";
const imgLeadsquaredIconUpdated  = "https://www.figma.com/api/mcp/asset/27023ea9-0f6a-4449-9d59-6b997795e2e4";
const imgO9SolutionsIconUpdated  = "https://www.figma.com/api/mcp/asset/c8265a41-bee6-4dcd-8d38-0ef744152c1d";

// Dark theme logo SVGs (locally hosted)
const imgWestPharmaDark          = "/assets/West pharma icon dark.svg";
const imgLeadsquaredDark         = "/assets/Leadsquared icon dark.svg";
const imgO9SolutionsDark         = "/assets/o9 solutions icon dark.svg";

function Dot() {
  return (
    <span
      className="w-1 h-1 rounded-full shrink-0 inline-block"
      style={{ background: "var(--text-secondary)" }}
    />
  );
}

function CompanyTooltip({ period, location }: { period: string; location: string }) {
  return (
    <div className="flex flex-col gap-0.5 text-center">
      <span style={{ color: "var(--text-primary)" }}>{period}</span>
      <span style={{ color: "var(--text-tertiary)" }}>{location}</span>
    </div>
  );
}

export default function SocialProofSection() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative z-[20] border-t border-b flex items-center"
      style={{ borderColor: "var(--border-primary)", minHeight: "66px" }}
    >
      {/* Mobile: flex-col stacked | sm+: flex-row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center w-full py-3 sm:py-0">

        {/* Company logos */}
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap justify-center">
          <HoverTooltip
            content={<CompanyTooltip period="Aug 2021 – Apr 2024" location="Bangalore" />}
          >
            <img
              src={isDark ? imgWestPharmaDark : imgWestPharmaIconUpdated}
              alt="West Pharmaceutical Services"
              className="object-contain cursor-default"
              style={{ width: "60px", height: "25px" }}
            />
          </HoverTooltip>

          <HoverTooltip
            content={<CompanyTooltip period="Jun 2020 – Jul 2021" location="Bangalore" />}
          >
            <img
              src={isDark ? imgLeadsquaredDark : imgLeadsquaredIconUpdated}
              alt="LeadSquared"
              className="object-contain cursor-default"
              style={{ width: "120px", height: "26px" }}
            />
          </HoverTooltip>

          <HoverTooltip
            content={<CompanyTooltip period="May 2024 – Present" location="Bangalore" />}
          >
            <img
              src={isDark ? imgO9SolutionsDark : imgO9SolutionsIconUpdated}
              alt="o9 Solutions"
              className="object-contain cursor-default"
              style={{ width: "100px", height: "36px" }}
            />
          </HoverTooltip>
        </div>

        {/* Vertical divider — hidden on mobile */}
        <div className="hidden sm:block h-[40px] w-px shrink-0" style={{ background: "var(--border-primary)" }} />

        {/* Stats — wrap on mobile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {[
            { label: "6 years exp.", tip: "Just the beginning, long way to go. Learning something new everyday." },
            { label: "Fortune 100 clients", tip: "Apple, Google, Danone, Samsung and more." },
            { label: "Won MIT Hackathon", tip: "Built a VR application to help healthcare workers manage mental exhaustion." },
            { label: "Skills...", tip: "AI-integrated workflows · UX · Accessibility · Research · Collaboration · Agile · Figma" },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
              <HoverTooltip content={stat.tip}>
                <span
                  className="whitespace-nowrap cursor-default"
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    fontSize: "clamp(13px, 1.8vw, 18px)",
                  }}
                >
                  {stat.label}
                </span>
              </HoverTooltip>
              {i < arr.length - 1 && <Dot />}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fades */}
      <div
        className="absolute left-0 top-0 h-full w-[60px] sm:w-[184px] pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 h-full w-[60px] sm:w-[184px] pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
      />
    </section>
  );
}
