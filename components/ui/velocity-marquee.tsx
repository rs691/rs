"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

interface VelocityMarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  /** Idle speed in px/s. @default 22 */
  baseSpeed?: number
  /** Extra px/s at full scroll boost. @default 28 */
  boostSpeed?: number
  /** |scrollY| velocity that maps to full boost. @default 2400 */
  velocityScale?: number
  gap?: string
  style?: CSSProperties
}

/**
 * One-direction strip that eases speed from scroll |velocity|.
 * Transform + rAF — no CSS duration thrashing.
 */
export function VelocityMarquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  baseSpeed = 22,
  boostSpeed = 28,
  velocityScale = 2400,
  gap = "1.25rem",
  style,
}: VelocityMarqueeProps) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const speedRef = useRef(baseSpeed)
  const targetSpeedRef = useRef(baseSpeed)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const [paused, setPaused] = useState(false)

  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 120,
    damping: 40,
    mass: 0.8,
  })

  useMotionValueEvent(smoothVelocity, "change", (v) => {
    if (reduced) {
      targetSpeedRef.current = 0
      return
    }
    const t = Math.min(1, Math.abs(v) / velocityScale)
    targetSpeedRef.current = baseSpeed + t * boostSpeed
  })

  const tick = useCallback(
    (ts: number) => {
      const track = trackRef.current
      if (!track) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      if (!lastTsRef.current) lastTsRef.current = ts
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000)
      lastTsRef.current = ts

      if (!reduced && !pausedRef.current) {
        speedRef.current +=
          (targetSpeedRef.current - speedRef.current) * Math.min(1, dt * 3)

        const half = track.scrollWidth / 2
        if (half > 0) {
          const dir = reverse ? 1 : -1
          offsetRef.current += dir * speedRef.current * dt
          while (offsetRef.current <= -half) offsetRef.current += half
          while (offsetRef.current > 0) offsetRef.current -= half
          track.style.transform = `translate3d(${offsetRef.current}px,0,0)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    },
    [reduced, reverse]
  )

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    if (reduced) {
      targetSpeedRef.current = 0
      speedRef.current = 0
      return
    }
    targetSpeedRef.current = baseSpeed
    speedRef.current = baseSpeed
    lastTsRef.current = 0
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [baseSpeed, reduced, tick])

  return (
    <div
      className={cn("group flex overflow-hidden p-2", className)}
      style={{ ...style, ["--gap" as string]: gap }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex w-max shrink-0 will-change-transform"
        style={{ gap: "var(--gap)" }}
      >
        <div className="flex shrink-0" style={{ gap: "var(--gap)" }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: "var(--gap)" }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
