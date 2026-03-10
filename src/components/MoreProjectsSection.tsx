"use client";

import { useState } from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const imgListingPageWithInfoCard1 = "https://www.figma.com/api/mcp/asset/2bc8762e-8710-4f47-95b7-49635b43d905";
const imgListingPageMobileDefault1 = "https://www.figma.com/api/mcp/asset/f0001fbd-2f97-40ea-95f9-fed6a34ee039";
const imgV41 = "https://www.figma.com/api/mcp/asset/6cee1a9b-51f6-4860-b977-f77da6cd9986";
const img360WithAllWidgets1 = "https://www.figma.com/api/mcp/asset/d3bafa26-49ef-4e01-8d85-5136eb7ecc94";
const imgRightIcon1 = "https://www.figma.com/api/mcp/asset/061c2ea4-2161-4ec6-8499-7ba4f3a33b73";

type Project = {
  id: number;
  tags: { label: string; filled?: boolean }[];
  title: string;
  description: string;
  preview: React.ReactNode;
};

const projects: Project[] = [
  {
    id: 1,
    tags: [{ label: "case study", filled: true }, { label: "Personal" }],
    title: 'Rethink "Contacts Table"',
    description:
      "Revamped the experience and UI of a Contacts Directory in a CRM application to cater needs of different personas.",
    preview: (
      <div className="relative h-[150px] flex">
        <div className="border border-[var(--border-primary)] overflow-hidden" style={{ width: "207px" }}>
          <img src={imgListingPageWithInfoCard1} alt="Contacts Table desktop" className="w-full h-full object-cover object-left" />
        </div>
        <div className="border border-[var(--border-primary)] overflow-hidden" style={{ width: "69px" }}>
          <img src={imgListingPageMobileDefault1} alt="Contacts Table mobile" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    tags: [{ label: "case study" }, { label: "Company" }],
    title: "Login Page",
    description: "Updating login page to leverage the space for upsell, cross-sell or educational purpose.",
    preview: (
      <div className="border border-[var(--border-primary)] h-[150px] w-full overflow-hidden">
        <img src={imgV41} alt="Login page" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 3,
    tags: [{ label: "case study" }, { label: "Company" }],
    title: "Customer 360",
    description: "Customer 360 consolidates customer data from various sources into a unified view.",
    preview: (
      <div className="border border-[var(--border-primary)] h-[150px] w-full overflow-hidden">
        <img src={img360WithAllWidgets1} alt="Customer 360" className="w-full h-full object-cover" />
      </div>
    ),
  },
];

function Tag({ label, filled }: { label: string; filled?: boolean }) {
  return (
    <div
      className="flex items-center justify-center px-3 py-1 border"
      style={{ borderColor: "var(--accent-amber)", background: filled ? "var(--surface-card)" : "transparent" }}
    >
      <span
        className="text-[12px] uppercase"
        style={{ fontFamily: "var(--font-chivo-mono), monospace", fontWeight: 400, color: "var(--accent-amber)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ tags, title, description, preview }: Project) {
  return (
    <div
      className="flex flex-col gap-6 p-6 border border-[var(--accent-indigo-soft)] min-w-0 h-full"
      style={{
        borderColor: "var(--accent-indigo-soft)",
        background: "linear-gradient(180deg, var(--accent-slate-soft) 0%, var(--bg-primary) 33%)",
      }}
    >
      <div className="w-full shrink-0">{preview}</div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 flex-wrap">
          {tags.map((tag) => <Tag key={tag.label} {...tag} />)}
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <h3
            className="text-[16px] overflow-hidden"
            style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 500, color: "var(--text-primary)", wordBreak: "break-word" }}
          >
            {title}
          </h3>
          <p
            className="text-[16px] leading-normal overflow-hidden"
            style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 400, color: "var(--text-secondary)", wordBreak: "break-word" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function NavButton({ flipped }: { flipped?: boolean }) {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center shrink-0"
      style={{ background: "var(--accent-indigo)" }}
    >
      <img
        src={imgRightIcon1}
        alt={flipped ? "Previous" : "Next"}
        className="w-5 h-5"
        style={{ transform: flipped ? "rotate(180deg)" : undefined }}
      />
    </button>
  );
}

export default function MoreProjectsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[185px]">
      <h2
        className="text-center mb-[48px]"
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          color: "var(--text-primary)",
          fontSize: "clamp(26px, 4vw, 36px)",
          lineHeight: "56px",
        }}
      >
        More projects
      </h2>

      <div className="flex flex-col gap-5 items-end w-full">
        {/* Fix 2: 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 w-full">
          {projects.map((project) => (
            <FollowerPointerCard key={project.id} title={project.title} className="min-w-0">
              <ProjectCard {...project} />
            </FollowerPointerCard>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-3 items-center">
          <NavButton flipped />
          <NavButton />
        </div>
      </div>
    </section>
  );
}
