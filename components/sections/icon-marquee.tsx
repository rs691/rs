import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { TechLogo } from "@/components/sections/tech-logo"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { StaggerItem, StaggerReveal } from "@/components/ui/stagger-reveal"
import { cn } from "@/lib/utils"
import { marqueeRows, siteConfig, type MarqueeIcon } from "@/lib/site-config"

const blurLayers = [
  { blur: "backdrop-blur-[0.5px]", stops: "transparent 0%, black 25%, black 50%, transparent 75%" },
  { blur: "backdrop-blur-[1px]", stops: "transparent 25%, black 50%, black 75%, transparent 100%" },
  { blur: "backdrop-blur-[3px]", stops: "transparent 50%, black 75%, black 100%" },
  { blur: "backdrop-blur-[6px]", stops: "transparent 75%, black 100%" },
]

/**
 * Dial cylinder illusion: soft fade on the left, deeper plunge into blur on the right.
 * Mobile keeps gentler masks so icons stay readable.
 */
const dialTrackMask = {
  maskImage:
    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 8%, rgba(0,0,0,1) 24%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 94%)",
  WebkitMaskImage:
    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 8%, rgba(0,0,0,1) 24%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 94%)",
} as const

const rightBlurMask = {
  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage:
    "linear-gradient(to left, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 100%)",
} as const

const leftBlurMask = {
  maskImage: "linear-gradient(to right, rgba(0,0,0,1) 18%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, rgba(0,0,0,1) 18%, rgba(0,0,0,0) 100%)",
} as const

function IconTile({
  icon: Icon,
  label,
  className,
  variant,
  wordmark,
}: MarqueeIcon) {
  return (
    <div
      title={label}
      className={cn(
        "tile-depth relative flex size-(--tile) shrink-0 items-center justify-center rounded-2xl border border-black/12 bg-card transition-transform duration-300 hover:-translate-y-1.5 dark:border-transparent dark:bg-card/80",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-current opacity-[0.12] dark:opacity-[0.14]"
      />
      <TechLogo icon={Icon} variant={variant} wordmark={wordmark} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

function ProgressiveBlur({
  side,
  className,
}: {
  side: "top" | "bottom"
  className?: string
}) {
  const direction = side === "bottom" ? "to bottom" : "to top"

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0",
        side === "bottom" ? "bottom-0" : "top-0",
        className
      )}
    >
      {blurLayers.map(({ blur, stops }) => (
        <div
          key={blur}
          className={cn("absolute inset-0", blur)}
          style={{
            maskImage: `linear-gradient(${direction}, ${stops})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${stops})`,
          }}
        />
      ))}
      <div
        className={cn(
          "absolute inset-0 from-transparent via-background/30 via-60% to-background/90 dark:via-background/15 dark:to-background/80",
          side === "bottom" ? "bg-linear-to-b" : "bg-linear-to-t"
        )}
      />
    </div>
  )
}

function DialBlurWalls() {
  return (
    <>
      {/* A — heavy right blur (icons wrap away into the cylinder) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10",
          "w-[clamp(28%,calc(18%+6vw),38%)] bg-linear-to-l from-background via-background/80 to-transparent backdrop-blur-lg",
          "via-background/84 md:via-background/88 md:backdrop-blur-2xl"
        )}
        style={rightBlurMask}
      />
      {/* B — left fade: soft blur dissolve instead of a hard vertical cut */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10",
          "w-[clamp(22%,calc(14%+5vw),30%)] bg-linear-to-r from-background via-background/80 to-transparent backdrop-blur-md",
          "via-background/84 md:via-background/88 md:backdrop-blur-xl"
        )}
        style={leftBlurMask}
      />
    </>
  )
}

/**
 * Fluid dial pose keyed to viewport width (no lg/xl jumps).
 * Soft on mobile → peaks around the ≤1023 sweet spot → eases off on wide
 * screens so the same yaw doesn't look crooked on a wider band.
 */
const dialTransform =
  "rotateX(calc(4deg + 3deg * min(1, max(0, (100vw - 390px) / 480px)) - 1.5deg * min(1, max(0, (100vw - 1024px) / 500px)))) " +
  "rotateY(calc(-6deg - 10deg * min(1, max(0, (100vw - 390px) / 480px)) + 6deg * min(1, max(0, (100vw - 1024px) / 500px)))) " +
  "translateZ(calc(-4px - 10px * min(1, max(0, (100vw - 390px) / 480px)) + 5px * min(1, max(0, (100vw - 1024px) / 500px))))"

function DialTrack({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={cn(
          "w-full motion-reduce:[perspective:none]",
          "motion-reduce:[&>div]:[transform:none!important]"
        )}
        style={{
          // Wider viewports get more perspective so the band reads flatter
          perspective: "clamp(1200px, 110vw, 2200px)",
          // Bias left so the band still fills toward B while the right curves into A
          perspectiveOrigin: "42% 48%",
          ...dialTrackMask,
        }}
      >
        <div
          className="flex flex-col will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: dialTransform }}
        >
          <MarqueeRows />
        </div>
      </div>
      <DialBlurWalls />
    </div>
  )
}

function MarqueeRows({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {marqueeRows.map((row, i) => (
        <Marquee
          key={i}
          reverse={row.reverse}
          repeat={6}
          className="py-[calc(var(--gap)/2)] [--gap:0.65rem] md:[--gap:0.85rem]"
          style={{ "--duration": row.duration } as React.CSSProperties}
        >
          {row.icons.map((item) => (
            <IconTile key={item.label} {...item} />
          ))}
        </Marquee>
      ))}
    </div>
  )
}

function BottomText({ className }: { className?: string }) {
  const { heading, description } = siteConfig.marquee
  const { primary, secondary } = siteConfig.ctas

  return (
    <StaggerReveal
      inView
      className={cn(
        "z-10 flex flex-col items-center px-6 text-center",
        className
      )}
    >
      <StaggerItem
        as="h2"
        className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-balance text-foreground xs:text-3xl md:text-4xl"
      >
        {heading}
      </StaggerItem>
      <StaggerItem
        as="p"
        className="mt-3 max-w-md text-sm text-balance text-muted-foreground xs:text-base"
      >
        {description}
      </StaggerItem>
      <StaggerItem className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href={primary.href} className={cn(buttonVariants({ size: "lg" }))}>
          {primary.label}
          <ArrowRight data-icon="inline-end" />
        </Link>
        <Link
          href={secondary.href}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          {secondary.label}
        </Link>
      </StaggerItem>
    </StaggerReveal>
  )
}

function DialWithEntrance({ className }: { className?: string }) {
  return (
    <BlurFade duration={0.7} delay={0} blur="8px" offset={12} direction="up">
      <div className={cn("relative w-full", className)}>
        <DialTrack />
        <ProgressiveBlur side="top" className="h-[50%] md:h-[42%]" />
        <ProgressiveBlur side="bottom" className="h-[50%] md:h-[42%]" />
      </div>
    </BlurFade>
  )
}

export function IconMarquee({ top }: { top?: React.ReactNode }) {
  if (top) {
    return (
      <section
        id="stack"
        className="flex flex-1 flex-col justify-center overflow-hidden pt-14 [--overlap:4.5rem] [--tile:clamp(3.5rem,min(10svh,20vw),10rem)] md:pt-20 md:[--overlap:clamp(3rem,9svh,8rem)]"
      >
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {top}
        </div>
        <div className="relative -my-(--overlap) w-full">
          <DialWithEntrance />
        </div>
        <BottomText className="relative" />
      </section>
    )
  }

  return (
    <section
      id="stack"
      className="relative w-full scroll-mt-20 py-6 [--tile:clamp(4rem,9svh,6rem)]"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        <BlurFade duration={0.7} delay={0} blur="8px" offset={12} direction="up">
          <div className="relative pb-24 md:pb-28">
            <DialTrack />
            <ProgressiveBlur side="bottom" className="h-3/4" />
          </div>
        </BlurFade>
        <BottomText className="absolute inset-x-0 bottom-0 pb-8" />
      </div>
    </section>
  )
}
