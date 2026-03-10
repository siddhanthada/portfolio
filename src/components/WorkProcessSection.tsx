const imgRocket = "https://www.figma.com/api/mcp/asset/019a025f-093a-4b9b-9c81-e27581f7ebae";

type Step = {
  number: number;
  title: string;
  description: string;
  shaded?: boolean;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Understand the System",
    description:
      "I align with PMs and stakeholders first, understanding the problem, the business context, and user needs before any design decisions are made.",
    shaded: true,
  },
  {
    number: 2,
    title: "Explore Before Committing",
    description:
      "I push multiple directions quickly before settling. Early directional reviews keep things on track and expectations aligned.",
    shaded: false,
  },
  {
    number: 3,
    title: "Design for Density",
    description:
      "I bring clarity to complex interfaces without stripping away power.",
    shaded: true,
  },
  {
    number: 4,
    title: "Accessibility Baked In",
    description:
      "WCAG as a design constraint from day one and not an audit at the end.",
    shaded: false,
  },
  {
    number: 5,
    title: "Handoff That Actually Works",
    description:
      "I mark pages dev-ready with specs, annotations, and edge cases documented, so nothing gets lost between design and engineering.",
    shaded: true,
  },
];

function ProcessCard({ number, title, description, shaded }: Step) {
  return (
    <div
      className={`flex flex-col justify-between min-h-[240px] sm:min-h-[302px] min-w-0 transition-colors duration-200 ${
        shaded
          ? "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)]"
          : "bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]"
      }`}
    >
      <div className="flex flex-col gap-2 pt-6 px-6">
        <p
          className="text-[16px] overflow-hidden"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            color: "var(--text-primary)",
            wordBreak: "break-word",
          }}
        >
          {title}
        </p>
        <p
          className="text-[16px] leading-normal overflow-hidden"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
            wordBreak: "break-word",
          }}
        >
          {description}
        </p>
      </div>

      <div className="h-[78px] flex items-center justify-end pr-4">
        <span
          className="text-[96px] leading-none font-medium"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            color: "var(--border-primary)",
          }}
        >
          {number}
        </span>
      </div>
    </div>
  );
}

export default function WorkProcessSection() {
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
        Work process
      </h2>

      {/* Fix 2: 1-col mobile, 2-col tablet, 3-col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step) => (
          <ProcessCard key={step.number} {...step} />
        ))}

        {/* Rocket — fills remaining grid cell */}
        <div className="flex items-center justify-center min-h-[240px] sm:min-h-[302px]">
          <div className="rotate-45">
            <img
              src={imgRocket}
              alt="Rocket"
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* AI in Workflow note */}
      <div className="mt-[48px] pt-6 px-6 flex flex-col gap-2">
        <p
          className="text-[16px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          AI in My Workflow
        </p>
        <p
          className="text-[16px] leading-normal"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
        >
          I use AI actively — prototyping with Figma Make, generating visuals with Midjourney, and
          leveraging Claude for documentation and design thinking.
        </p>
      </div>
    </section>
  );
}
