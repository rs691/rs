"use client"

import Link from "next/link"
import { Quote } from "lucide-react"

import { SectionHeading } from "@/components/sections/section-heading"
import { BorderBeam } from "@/components/ui/border-beam"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { cn } from "@/lib/utils"
import { reviews, siteConfig, type Review } from "@/lib/site-config"

const blurLayers = [
  { blur: "backdrop-blur-[0.5px]", stops: "transparent 0%, black 25%, black 50%, transparent 75%" },
  { blur: "backdrop-blur-[1px]", stops: "transparent 25%, black 50%, black 75%, transparent 100%" },
  { blur: "backdrop-blur-[3px]", stops: "transparent 50%, black 75%, black 100%" },
  { blur: "backdrop-blur-[8px]", stops: "transparent 60%, black 100%" },
]

const beamColors = [
  { colorFrom: "#ff2975", colorTo: "#00FFF1" },
  { colorFrom: "#a855f7", colorTo: "#22d3ee" },
  { colorFrom: "#f97316", colorTo: "#ec4899" },
  { colorFrom: "#00a3bd", colorTo: "#ff00aa" },
] as const

function ReviewCard({
  quote,
  name,
  context,
  colorIndex = 0,
}: Review & { colorIndex?: number }) {
  const beam = beamColors[colorIndex % beamColors.length]

  return (
    <Card
      size="sm"
      className={cn(
        "relative w-72 shrink-0 overflow-hidden rounded-2xl border-black/10 md:w-96 dark:border-white/10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_28px_-10px_rgba(0,0,0,.14),0_22px_44px_-18px_rgba(0,0,0,.1)]",
        "dark:shadow-none",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:z-10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_36px_-12px_rgba(0,0,0,.2),0_28px_52px_-20px_rgba(0,0,0,.14)]",
        "active:-translate-y-1",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <BorderBeam
        size={80}
        duration={8}
        borderWidth={1}
        delay={colorIndex * 0.6}
        initialOffset={colorIndex * 18}
        colorFrom={beam.colorFrom}
        colorTo={beam.colorTo}
      />
      <CardContent className="relative flex flex-col gap-3">
        <Quote className="size-5 text-muted-foreground" />
        <p className="text-base leading-relaxed">{quote}</p>
      </CardContent>
      <CardFooter className="relative mt-auto flex-col items-start gap-0.5">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{context}</span>
      </CardFooter>
    </Card>
  )
}

function BottomFadeBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] md:h-[50%]"
    >
      {blurLayers.map(({ blur, stops }) => (
        <div
          key={blur}
          className={cn("absolute inset-0", blur)}
          style={{
            maskImage: `linear-gradient(to bottom, ${stops})`,
            WebkitMaskImage: `linear-gradient(to bottom, ${stops})`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 via-55% to-background dark:via-background/25" />
    </div>
  )
}

function ContactStrip() {
  const { email, links, secondaryCta } = siteConfig.footer
  const items = [
    { label: "Email", href: `mailto:${email}` },
    { label: secondaryCta.label, href: secondaryCta.href, external: true },
    ...links
      .filter((link) => link.label !== "Portfolio")
      .map((link) => ({ ...link, external: true })),
  ]

  return (
    <div
      id="contact"
      className="relative z-20 mx-auto flex max-w-3xl scroll-mt-16 flex-col items-center gap-3 px-5 pb-10 text-center md:pb-14"
    >
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-base text-muted-foreground">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
    </div>
  )
}

export function Reviews() {
  const { heading, description } = siteConfig.reviews
  const half = Math.ceil(reviews.length / 2)
  const rows = [reviews.slice(0, half), reviews.slice(half)]
  const hasReviews = reviews.length > 0

  return (
    <section id="reviews" className="scroll-mt-16">
      {hasReviews ? (
        <>
          <SectionHeading heading={heading} description={description} />

          <div className="relative mt-10 md:mt-14">
            <div className="flex flex-col gap-2 pb-36 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:overflow-x-auto motion-reduce:mask-none md:pb-44">
              <VelocityMarquee
                pauseOnHover
                baseSpeed={22}
                boostSpeed={28}
                gap="1rem"
                className="md:hidden"
              >
                {reviews.map((review, i) => (
                  <ReviewCard key={i} {...review} colorIndex={i} />
                ))}
              </VelocityMarquee>
              {rows.map((row, i) => (
                <VelocityMarquee
                  key={i}
                  pauseOnHover
                  reverse={i === 1}
                  baseSpeed={20}
                  boostSpeed={26}
                  gap="1.5rem"
                  className="max-md:hidden"
                >
                  {row.map((review, j) => (
                    <ReviewCard
                      key={j}
                      {...review}
                      colorIndex={i * row.length + j}
                    />
                  ))}
                </VelocityMarquee>
              ))}
            </div>

            <BottomFadeBlur />
            <div className="absolute inset-x-0 bottom-0">
              <ContactStrip />
            </div>
          </div>
        </>
      ) : (
        <div className="relative pt-8">
          <ContactStrip />
        </div>
      )}
    </section>
  )
}
