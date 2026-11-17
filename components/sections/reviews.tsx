"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { ContactPanel } from "@/components/sections/contact"
import {
  SectionHeading,
  sectionBodyClass,
} from "@/components/sections/section-heading"
import { reviews, siteConfig, type Review } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const QUOTE_COUNT = 3
/** Progress 0 → this band is split evenly across quotes (same scroll each). */
const QUOTE_BAND = 0.54
/** Fraction of each slot spent fading in (rest is a clear hold). */
const FADE_RATIO = 0.42
/**
 * Footer starts during the last quote and finishes soon after —
 * no long dead scroll to “complete” the page.
 */
const FOOTER_RISE = [0.4, 0.72] as const

function quoteFade(index: number) {
  const slot = QUOTE_BAND / QUOTE_COUNT
  const start = index * slot
  const clear = start + slot * FADE_RATIO
  return { start, clear }
}

/**
 * Cloud placements in the upper/mid band — bottom clear for the closer.
 */
const cloudLayouts = [
  {
    className:
      "right-[3%] top-[2%] max-w-[15rem] text-right xs:max-w-xs md:right-[6%] md:top-[4%] md:max-w-sm",
    quoteClass:
      "font-heading text-base font-semibold tracking-tight text-balance xs:text-lg md:text-xl md:leading-snug",
    align: "items-end text-right",
  },
  {
    className:
      "left-[3%] top-[24%] max-w-[14rem] text-left xs:max-w-xs md:left-[5%] md:top-[26%] md:max-w-sm",
    quoteClass:
      "font-heading text-base font-semibold tracking-tight text-balance xs:text-lg md:text-xl md:leading-snug",
    align: "items-start text-left",
  },
  {
    className:
      "left-1/2 top-[44%] max-w-[16rem] -translate-x-1/2 text-center xs:max-w-sm md:top-[42%] md:max-w-md",
    quoteClass:
      "font-heading text-lg font-semibold tracking-tight text-balance xs:text-xl md:text-2xl md:leading-snug",
    align: "items-center text-center",
  },
] as const

function ScrubQuote({
  review,
  index,
  progress,
}: {
  review: Review
  index: number
  progress: MotionValue<number>
}) {
  const { start, clear } = quoteFade(index)
  const opacity = useTransform(progress, [start, clear, 1], [0, 1, 1])
  // Soft parallax lift as each block arrives
  const y = useTransform(progress, [start, clear, 1], [22, 0, 0])
  const layout = cloudLayouts[index % cloudLayouts.length]

  return (
    <motion.figure
      style={{ opacity, y }}
      className={cn(
        "pointer-events-none absolute flex flex-col gap-2 px-3 will-change-transform",
        layout.className,
        layout.align
      )}
    >
      <blockquote className={layout.quoteClass}>
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-foreground md:text-sm">
          {review.name}
        </span>
        <span className="text-[0.65rem] text-muted-foreground md:text-xs">
          {review.context}
        </span>
      </figcaption>
    </motion.figure>
  )
}

function StaticQuotes({ items }: { items: Review[] }) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-12 px-6",
        sectionBodyClass
      )}
    >
      {items.map((review, i) => {
        const layout = cloudLayouts[i % cloudLayouts.length]
        return (
          <figure
            key={review.name}
            className="flex flex-col items-center gap-2 text-center"
          >
            <blockquote className={layout.quoteClass}>
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="flex flex-col gap-0.5">
              <span className="font-medium">{review.name}</span>
              <span className="text-sm text-muted-foreground">
                {review.context}
              </span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

/**
 * Tutoring end-screen:
 * 1. Title locks below the STOP band.
 * 2. Three equal scroll beats for quotes (fluid spring scrub).
 * 3. Closer rises during the last beat and settles without a long dead scroll.
 */
export function Reviews() {
  const { heading, description } = siteConfig.reviews
  const items = reviews.slice(0, QUOTE_COUNT)
  const reduced = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  })

  const footerY = useTransform(
    progress,
    [FOOTER_RISE[0], FOOTER_RISE[1]],
    ["100%", "0%"]
  )

  if (items.length === 0) return null

  return (
    <section id="reviews" className="scroll-mt-24">
      {reduced ? (
        <>
          <SectionHeading heading={heading} description={description} />
          <StaticQuotes items={items} />
          <ContactPanel className="mt-16" />
        </>
      ) : (
        <div
          ref={track}
          data-snap-align="end"
          className="relative h-[180vh] md:h-[190vh]"
        >
          <div
            className={cn(
              "sticky top-0 flex h-svh flex-col overflow-hidden bg-background",
              "pt-16 md:pt-24"
            )}
          >
            <SectionHeading heading={heading} description={description} />
            <div className="relative mt-4 min-h-0 flex-1 md:mt-6">
              <div className="absolute inset-x-0 top-0 bottom-[40%]">
                {items.map((review, i) => (
                  <ScrubQuote
                    key={review.name}
                    review={review}
                    index={i}
                    progress={progress}
                  />
                ))}
              </div>
            </div>

            <motion.div
              style={{ y: footerY }}
              className="absolute inset-0 z-30 will-change-transform"
            >
              <ContactPanel className="h-full border-t-0" />
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}
