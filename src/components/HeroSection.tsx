export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6">
      <div className="w-full max-w-[541px] flex flex-col gap-6 sm:gap-[36px]" style={{ paddingTop: "229px" }}>
        {/* Main heading — Fix 3: updated text; Fix 2: responsive size */}
        <h1
          className="leading-tight sm:leading-[56px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            color: "var(--text-primary)",
            fontSize: "clamp(32px, 5vw, 48px)",
          }}
        >
          Designing clarity for complex products
        </h1>

        {/* Subheading — Fix 3: updated text; Fix 2: responsive size */}
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
            fontSize: "clamp(16px, 2.5vw, 20px)",
          }}
        >
          Product designer focused on enterprise platforms, data visualization, and scalable design systems.
        </p>
      </div>
    </section>
  );
}
