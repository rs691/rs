"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { Mail } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { VideoText } from "@/components/ui/video-text"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function Contact() {
  const { heading, videoText, email, links } = siteConfig.footer
  const ref = useRef<HTMLDivElement>(null)
  const nearView = useInView(ref, { once: true, margin: "400px" })

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t pt-20 pb-32 md:pt-24"
    >
      <FlickeringGrid
        aria-hidden
        squareSize={4}
        gridGap={6}
        maxOpacity={0.2}
        flickerChance={0.1}
        color="rgb(110, 110, 110)"
        className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div ref={ref} className="relative h-28 w-full xs:h-36 md:h-56 lg:h-64">
        {nearView ? (
          <VideoText
            src="/tunnelBack.mp4"
            fontSize={16}
            fontWeight={900}
            fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
          >
            {videoText}
          </VideoText>
        ) : (
          <span className="sr-only">{videoText}</span>
        )}
      </div>

      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance xs:text-4xl md:text-5xl">
          {heading}
        </h2>
        <a
          href={`mailto:${email}`}
          className={cn(buttonVariants({ size: "lg" }), "gap-2")}
        >
          <Mail data-icon="inline-start" />
          {email}
        </a>
        <nav className="flex flex-wrap justify-center gap-x-8 text-base text-muted-foreground">
          {links
            .filter((link) => link.label !== "Portfolio")
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
