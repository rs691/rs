"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { Mail } from "lucide-react"

import { SectionHeading } from "@/components/sections/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { VideoText } from "@/components/ui/video-text"
import { assetPath } from "@/lib/paths"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/** Full end-page contact closer — title optically centered, actions stay low. */
export function ContactPanel({ className }: { className?: string }) {
  const { heading, videoText, email, links } = siteConfig.footer
  const videoRef = useRef<HTMLDivElement>(null)
  const nearView = useInView(videoRef, { once: true, margin: "400px" })

  return (
    <footer
      id="contact"
      className={cn(
        "relative flex min-h-svh flex-col overflow-hidden border-t bg-background",
        className
      )}
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

      {/* Title sits on the viewport midline; VideoText hangs just above it. */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <div className="relative flex w-full max-w-5xl flex-col items-center">
          <div
            ref={videoRef}
            className="absolute bottom-full left-1/2 mb-1 w-full -translate-x-1/2 h-24 xs:mb-2 xs:h-32 md:mb-3 md:h-44 lg:h-52"
          >
            {nearView ? (
              <VideoText
                src={assetPath("/tunnelBack.mp4")}
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
          <SectionHeading heading={heading} className="px-0" />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-4 pb-10 text-center md:pb-14">
        <a
          href={`mailto:${email}`}
          className={cn(buttonVariants({ size: "lg" }), "gap-2")}
        >
          <Mail data-icon="inline-start" aria-hidden />
          {email}
        </a>
        <nav
          aria-label="Footer"
          className="mt-8 flex w-full flex-wrap items-center justify-evenly gap-y-2 text-sm text-muted-foreground md:mt-10 md:text-base"
        >
          <a
            href={siteConfig.footer.secondaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-foreground"
          >
            {siteConfig.footer.secondaryCta.label}
          </a>
          {links
            .filter((link) => link.label !== "Portfolio")
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
        </nav>
        <p className="mt-8 text-sm text-muted-foreground">
          &copy; 2026 {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
