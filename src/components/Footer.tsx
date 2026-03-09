"use client";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="px-[185px] py-5 flex items-start justify-between"
      style={{ background: "var(--accent-indigo-soft)" }}
    >
      <p
        className="text-[14px] leading-normal w-[240px]"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-secondary)",
        }}
      >
        Designed and developed by me using Figma, Claude, Cursor
      </p>

      <p
        className="text-[14px]"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-secondary)",
        }}
      >
        © Siddhant Hada 2026
      </p>

      <button
        onClick={scrollToTop}
        className="text-[14px] text-right w-[240px] hover:underline"
        style={{
          fontFamily: "var(--font-chivo-mono), monospace",
          fontWeight: 400,
          color: "var(--text-secondary)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go to top
      </button>
    </footer>
  );
}
