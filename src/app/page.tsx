import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import PullQuote from "@/components/sections/PullQuote";
import Stack from "@/components/sections/Stack";
import CTAFooter from "@/components/sections/CTAFooter";
import Marquee from "@/components/Marquee";

const PROJECTS_MARQUEE_TEXT =
  "ROBOTICS · R&D · SOFTWARE · EMBEDDED · ROS 2 · CAN BUS · MOTION · ";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Hero />
      <Intro />
      <Stats />

      <div className="bg-ink py-6">
        <Marquee
          text={PROJECTS_MARQUEE_TEXT}
          duration={36}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none text-amber"
        />
      </div>

      <Projects />
      <PullQuote />
      <Stack />
      <CTAFooter />
    </main>
  );
}
