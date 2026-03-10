// Skill icons from Figma
const imgFrame88 = "https://www.figma.com/api/mcp/asset/195164d3-3532-4646-b540-8c3d00efaffc";
const imgFrame89 = "https://www.figma.com/api/mcp/asset/1072da87-3418-4420-b7be-f89875e8ee55";
const imgFrame90 = "https://www.figma.com/api/mcp/asset/76fd12f8-b4cf-4046-b3b0-f550b7ad1d96";
const imgFrame91 = "https://www.figma.com/api/mcp/asset/da26cdd3-6164-4095-96b1-a50012244d8f";
const imgFrame92 = "https://www.figma.com/api/mcp/asset/1fa7956f-72c9-4183-a4d8-41b1bf314143";

type Skill = {
  icon: string;
  title: string;
  description: React.ReactNode;
};

const skills: Skill[] = [
  {
    icon: imgFrame88,
    title: "Systems Design",
    description: (
      <>
        Designing at scale —{" "}
        <strong>icon libraries</strong>,{" "}
        <strong>component systems</strong>,{" "}
        <strong>platform-wide UI</strong>,{" "}
        <strong>complex UX.</strong>
      </>
    ),
  },
  {
    icon: imgFrame89,
    title: "AI in design",
    description: (
      <>
        Research, prototyping in <strong>Figma Make</strong>, code in{" "}
        <strong>claude</strong> + <strong>cursor</strong>,{" "}
        <strong>nano banana</strong> for images etc.
      </>
    ),
  },
  {
    icon: imgFrame90,
    title: "Data-Heavy UX",
    description: (
      <>
        <strong>Charts</strong>, <strong>Gantt</strong>,{" "}
        <strong>dense workflows</strong>. Clarity where complexity is the default.
      </>
    ),
  },
  {
    icon: imgFrame91,
    title: "Accessibility",
    description: (
      <>
        <strong>WCAG 2.1</strong> across core workflows — keyboard, contrast,
        screen reader.
      </>
    ),
  },
  {
    icon: imgFrame92,
    title: "Cross-functional Collaboration",
    description: (
      <>
        Embedded with PMs, engineering, and <strong>Fortune 100</strong>{" "}
        customer teams.
      </>
    ),
  },
];

function SkillCard({ icon, title, description }: Skill) {
  return (
    <div
      className="flex flex-col items-start gap-5 hover:bg-[var(--bg-secondary)] transition-colors duration-200 min-w-0"
      style={{ padding: "24px" }}
    >
      <div className="w-[30px] h-[30px] shrink-0 overflow-hidden">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-2 min-w-0">
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
    </div>
  );
}

export default function ProfessionalSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[185px]">
      <h2
        className="text-[24px] mb-6"
        style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          color: "var(--text-primary)",
        }}
      >
        Professional
      </h2>

      {/* Fix 2: 2-col on mobile, 3-col on lg+ */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </div>
    </section>
  );
}
