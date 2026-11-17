"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import Snap from "lenis/snap"
import { useReducedMotion } from "motion/react"

const SNAP_TARGETS = [
  { selector: "#top", align: "start" as const },
  { selector: "#projects", align: "start" as const },
  { selector: "#experience", align: "start" as const },
  { selector: "#reviews", align: "start" as const },
  /** Reviews track end — closer fully settled in view. */
  { selector: "[data-snap-align=end]", align: "end" as const },
] as const

/**
 * Root Lenis smooth scroll + proximity snaps at major section edges.
 * Imperative mount keeps the React tree identical on server and client
 * (avoids hydration mismatches from swapping in ReactLenis after mount).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      syncTouch: false,
    })

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "40%",
      debounce: 160,
      lerp: 0.1,
    })

    const unsubs: Array<() => void> = []
    for (const { selector, align } of SNAP_TARGETS) {
      const el = document.querySelector(selector)
      if (!(el instanceof HTMLElement)) continue
      unsubs.push(snap.addElement(el, { align, ignoreSticky: true }))
    }

    const onResize = () => snap.resize()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      for (const unsub of unsubs) unsub()
      snap.destroy()
      lenis.destroy()
    }
  }, [reduced])

  return children
}
