import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { TechLogo } from "@/components/sections/tech-logo"
import { buttonVariants } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { marqueeRows, siteConfig, type MarqueeIcon } from "@/lib/site-config"

const blurLayers = [
  { blur: "backdrop-blur-[0.5px]", stops: "transparent 0%, black 25%, black 50%, transparent 75%" },
  { blur: "backdrop-blur-[1px]", stops: "transparent 25%, black 50%, black 75%, transparent 100%" },
  { blur: "backdrop-blur-[3px]", stops: "transparent 50%, black 75%, black 100%" },
  { blur: "backdrop-blur-[6px]", stops: "transparent 75%, black 100%" },
]

const edgeFade =
  "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"

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
        "tile-depth relative flex size-(--tile) shrink-0 items-center justify-center rounded-2xl border bg-card transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-current opacity-[0.06]"
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

function MarqueeRows({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {marqueeRows.map((row, i) => (
        <Marquee
          key={i}
          reverse={row.reverse}
          repeat={6}
          className="py-[calc(var(--gap)/2)] [--gap:0.375rem]"
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
  const { heading, description, cta } = siteConfig.marquee

  return (
    <div
      className={cn(
        "z-10 flex flex-col items-center px-6 text-center",
        className
      )}
    >
      <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance xs:text-4xl md:text-5xl 3xl:max-w-4xl 3xl:text-6xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-lg text-base text-balance xs:text-lg text-muted-foreground md:text-lg 3xl:max-w-2xl 3xl:text-xl">
        {description}
      </p>
      <Link
        href={cta.href}
        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
      >
        {cta.label}
        <ArrowRight data-icon="inline-end" />
      </Link>
    </div>
  )
}

export function IconMarquee({ top }: { top?: React.ReactNode }) {
  if (top) {
    return (
      <section
        id="stack"
        className="flex flex-1 flex-col justify-center overflow-hidden pt-16 [--overlap:4.5rem] [--tile:clamp(3.5rem,min(10svh,20vw),10rem)] md:pt-24 md:[--overlap:clamp(3rem,9svh,8rem)]"
      >
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {top}
        </div>
        <div className={cn("relative -my-(--overlap) w-full", edgeFade)}>
          <MarqueeRows />
          <ProgressiveBlur side="top" className="h-[50%] md:h-[42%]" />
          <ProgressiveBlur side="bottom" className="h-[50%] md:h-[42%]" />
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
        <div className={edgeFade}>
          <MarqueeRows className="pb-24 md:pb-28" />
        </div>
        <ProgressiveBlur side="bottom" className="h-3/4" />
        <BottomText className="absolute inset-x-0 bottom-0 pb-8" />
      </div>
    </section>
  )
}
