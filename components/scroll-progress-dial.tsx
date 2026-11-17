"use client"

import { useEffect, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"
import { cn } from "@/lib/utils"

/**
 * Floating measuring dial — page scroll depth.
 * Bottom-right column under the theme toggle so both read as chrome.
 */
export function ScrollProgressDial() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, {
    stiffness: reduced ? 500 : 90,
    damping: reduced ? 50 : 28,
    mass: 0.35,
  })
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(smooth, "change", (latest) => {
    setValue(Math.round(latest * 100))
  })

  useEffect(() => {
    setValue(Math.round(smooth.get() * 100))
  }, [smooth])

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0.9]
  )

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVisible(latest > 0.02)
  })

  const positionClass = cn(
    "pointer-events-none fixed z-50",
    // Same right column as theme toggle; lifted off the edge so it doesn’t feel stuck
    "right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
    "md:right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-[max(2rem,env(safe-area-inset-bottom))]"
  )

  if (reduced) {
    return (
      <div
        className={cn(positionClass, !visible && "opacity-0")}
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <DialChrome value={value} />
      </div>
    )
  }

  return (
    <motion.div
      style={{ opacity }}
      className={positionClass}
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <DialChrome value={value} />
    </motion.div>
  )
}

function DialChrome({ value }: { value: number }) {
  return (
    <div
      className={cn(
        "flex size-16 items-center justify-center rounded-full border border-black/12 bg-card/95 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_28px_-6px_rgba(0,0,0,.28)] backdrop-blur-md md:size-[4.5rem]",
        "dark:border-white/10 dark:bg-background/80 dark:shadow-[0_10px_28px_-6px_rgba(0,0,0,.45)]"
      )}
    >
      <AnimatedCircularProgressBar
        value={value}
        min={0}
        max={100}
        gaugePrimaryColor="#a855f7"
        gaugeSecondaryColor="color-mix(in oklch, var(--muted-foreground) 35%, transparent)"
        className="size-12 text-xs font-mono font-semibold tabular-nums text-foreground md:size-14 md:text-sm"
      />
    </div>
  )
}
