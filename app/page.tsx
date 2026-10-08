import { Contact } from "@/components/sections/contact"
import { DockNav } from "@/components/sections/dock-nav"
import { Experience } from "@/components/sections/experience"
import { Hero, HeroText } from "@/components/sections/hero"
import { IconMarquee } from "@/components/sections/icon-marquee"
import { Projects } from "@/components/sections/projects"
import { Stats } from "@/components/sections/stats"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <main
        id="top"
        className="flex flex-1 flex-col gap-20 pb-20 md:gap-24 md:pb-24"
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
      </main>
      <Contact />
      <DockNav />
    </div>
  )
}
