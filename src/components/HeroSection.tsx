export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-[98px]">
      <div className="max-w-[541px] flex flex-col gap-[36px]">
        {/* Main heading */}
        <h1
          className="text-[48px] leading-[56px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          This is the Title of header section
        </h1>

        {/* Subheading */}
        <p
          className="text-[20px] leading-relaxed"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
        >
          A product designer converting challenges into inclusive and enjoyable resolutions.
        </p>
      </div>
    </section>
  );
}
