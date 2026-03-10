"use client";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="px-4 sm:px-12 lg:px-[185px] py-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-0"
      style={{ background: "var(--accent-indigo-soft)" }}
    >
      <p
        className="text-[14px] leading-normal text-center sm:text-left sm:w-[240px]"
        style={{ fontFamily: "var(--font-chivo-mono), monospace", fontWeight: 400, color: "var(--text-secondary)" }}
      >
        Designed and developed by me using Figma, Claude, Cursor
      </p>

      <p
        className="text-[14px]"
        style={{ fontFamily: "var(--font-chivo-mono), monospace", fontWeight: 400, color: "var(--text-secondary)" }}
      >
        © Siddhant Hada 2026
      </p>

      <button
        onClick={scrollToTop}
        className="text-[14px] text-center sm:text-right sm:w-[240px] hover:underline"
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
