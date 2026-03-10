import GrowingPlant from "@/components/GrowingPlant";

const imgImage56 = "https://www.figma.com/api/mcp/asset/026639a3-2ce4-4808-82b8-b0a514c2844b";
const imgImage55 = "https://www.figma.com/api/mcp/asset/b378f591-c788-4459-a214-1c77e3589af6";
const imgImage57 = "https://www.figma.com/api/mcp/asset/8d560883-1f84-4e64-83b0-a74cb4384736";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/e7c69df2-bf38-46e3-8ed9-6a2a6c942abc";

type ContactLink = {
  icon: string;
  label: string;
  href: string;
};

const contacts: ContactLink[] = [
  { icon: imgImage56, label: "hadasiddhant@gmail.com", href: "mailto:hadasiddhant@gmail.com" },
  { icon: imgImage55, label: "https://www.linkedin.com/in/siddhanthada/", href: "https://www.linkedin.com/in/siddhanthada/" },
  { icon: imgImage57, label: "https://medium.com/@hadasiddhant", href: "https://medium.com/@hadasiddhant" },
];

function ContactRow({ icon, label, href }: ContactLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2 items-center p-6 border-b last:border-b-0 hover:bg-[var(--bg-secondary)] transition-colors min-w-0"
      style={{ borderColor: "var(--border-primary)" }}
    >
      <div className="w-7 h-7 overflow-hidden shrink-0 flex items-center justify-center">
        <img src={icon} alt="" className="w-5 h-5 object-contain" />
      </div>
      <span
        className="flex-1 text-[14px] sm:text-[16px] truncate min-w-0"
        style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 400, color: "var(--text-primary)" }}
      >
        {label}
      </span>
      <div className="w-5 h-5 shrink-0">
        <img src={imgFrame4} alt="Open link" className="w-full h-full object-contain" />
      </div>
    </a>
  );
}

export default function ContactSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[185px]">
      {/* Fix 2: stack on mobile, side-by-side on lg+ */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[88px] items-start">

        {/* Left — contact info */}
        <div className="flex flex-col gap-8 w-full lg:w-[479px] lg:shrink-0">
          <div className="flex flex-col gap-1">
            <h2
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                color: "var(--text-primary)",
                fontSize: "clamp(26px, 4vw, 36px)",
                lineHeight: "56px",
              }}
            >
              Get in touch
            </h2>
            <p
              className="text-[16px] leading-normal"
              style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 400, color: "var(--text-secondary)" }}
            >
              Let&apos;s build something together. Open to interesting opportunities.
            </p>
          </div>

          <div className="border flex flex-col" style={{ borderColor: "var(--border-primary)" }}>
            {contacts.map((contact) => (
              <ContactRow key={contact.href} {...contact} />
            ))}
          </div>
        </div>

        {/* Right — interactive growing plant */}
        <GrowingPlant />
      </div>
    </section>
  );
}
