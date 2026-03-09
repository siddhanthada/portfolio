import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import AboutSection from "@/components/AboutSection";
import ProfessionalSection from "@/components/ProfessionalSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import MoreProjectsSection from "@/components/MoreProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Navbar ───────────────────────────────────────────────────────────
          Kept at page root so position:sticky z-50 works for the full page.
          Background is transparent when not scrolled → aurora shows through. */}
      <Navbar />

      {/* ── Hero region ──────────────────────────────────────────────────────
          position:relative is the containing block for the absolute aurora.
          Contains: hero content + 118 px transparent spacer (gap to social proof).
          The aurora is anchored here and must NOT affect document flow. */}
      <div className="relative">

        {/* Aurora: position:absolute, z-index:0.
            top:-131px  → extends 131 px above this container (= behind navbar).
            height:calc(100% + 131px) → fills the full container height (hero + 118 px
            spacer) PLUS 131 px upward, so it spans from page y=0 to exactly the
            top edge of the Social Proof bar. pointer-events:none — decorative only. */}
        <AuroraBackground
  className="absolute left-0 w-full pointer-events-none"
  style={{ top: "-131px", height: "calc(100% + 131px)", zIndex: 0 }}
>
  <></>
</AuroraBackground>

        {/* Hero content: relative z-1 so it sits above the aurora */}
        <div className="relative" style={{ zIndex: 1 }}>
          <HeroSection />
        </div>

        {/* 118 px transparent spacer — the gap between hero and Social Proof.
            No background: aurora (z-0) shows through here.
            After this spacer the aurora ends and bg-white takes over. */}
        <div style={{ height: "118px" }} />

      </div>

      {/* ── All sections below hero ───────────────────────────────────────────
          bg-white starts here → covers the aurora completely.
          Social Proof is the first child (no padding-top needed; the spacer
          above already provides the 118 px gap).
          gap-[118px] separates each subsequent section. */}
      <div
        className="relative flex flex-col gap-[118px]"
        style={{ zIndex: 1, background: "var(--bg-primary)" }}
      >
        <SocialProofSection />

        <CaseStudiesSection />

        <div className="flex flex-col gap-[99px] w-full">
          <AboutSection />
          <ProfessionalSection />
        </div>

        <WorkProcessSection />

        <MoreProjectsSection />

        <ContactSection />

        <Footer />

      </div>
    </div>
  );
}
