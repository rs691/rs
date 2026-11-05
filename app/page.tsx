import { Experience } from "@/components/sections/experience"
import { Hero, HeroText } from "@/components/sections/hero"
import { IconMarquee } from "@/components/sections/icon-marquee"
import { Projects } from "@/components/sections/projects"
import { Reviews } from "@/components/sections/reviews"
import { Stats } from "@/components/sections/stats"
import { ThemeToggleCorner } from "@/components/sections/theme-toggle-corner"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <ThemeToggleCorner />
      <main id="top" className="flex flex-1 flex-col gap-20 md:gap-24">
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
        <Reviews />
      </main>
    </div>
  )
}
