import { Experience } from "@/components/sections/experience"
import { Hero, HeroText } from "@/components/sections/hero"
import { IconMarquee } from "@/components/sections/icon-marquee"
import { Projects } from "@/components/sections/projects"
import { Reviews } from "@/components/sections/reviews"
import { Stats } from "@/components/sections/stats"
import { ThemeToggleCorner } from "@/components/sections/theme-toggle-corner"
import { ScrollProgressDial } from "@/components/scroll-progress-dial"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <ThemeToggleCorner />
      <ScrollProgressDial />
      <main
        id="top"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-24 outline-none md:gap-32"
      >
        {siteConfig.heroLayout === "overlay" ? (
          <IconMarquee top={<HeroText />} />
        ) : (
          <>
            <Hero />
            <IconMarquee />
          </>
        )}
        <Projects />
        <Stats />
        <Experience />
        {/* Reviews owns the tutoring pin + footer overlay end sequence */}
        <Reviews />
      </main>
    </div>
  )
}
