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
import FloatingGoToTop from "@/components/FloatingGoToTop";

export default function Home() {
  return (
    /* Fix 2: overflow-x:hidden prevents horizontal scroll at all viewports */
    <div className="min-h-screen overflow-x-hidden">

      <Navbar />

      <div className="relative">
        <AuroraBackground
          className="absolute left-0 w-full pointer-events-none"
          style={{ top: "-131px", height: "calc(100% + 131px)", zIndex: 0 }}
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <HeroSection />
        </div>
        <div style={{ height: "118px" }} />
      </div>

      <div
        className="relative flex flex-col gap-[60px] sm:gap-[118px]"
        style={{ zIndex: 1, background: "var(--bg-primary)" }}
      >
        {/* Fix 7: section IDs for scroll anchors */}
        <SocialProofSection />

        <div id="work">
          <CaseStudiesSection />
        </div>

        <div id="about" className="flex flex-col gap-[60px] sm:gap-[99px] w-full">
          <AboutSection />
          <ProfessionalSection />
        </div>

        <div id="process">
          <WorkProcessSection />
        </div>

        <MoreProjectsSection />

        <div id="contact">
          <ContactSection />
        </div>

        <Footer />
      </div>

      {/* Fix 6: Floating Go To Top button */}
      <FloatingGoToTop />
    </div>
  );
}
