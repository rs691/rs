"use client"

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, useInView, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  /** How many newest items stay visible while the list cycles. */
  maxItems?: number
}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1000,
    maxItems = 4,
    ...props
  }: AnimatedListProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inView = useInView(containerRef, { margin: "100px" })
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )
    const count = childrenArray.length

    useEffect(() => {
      if (!inView || count === 0) return

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % count)
      }, delay)

      return () => clearTimeout(timeout)
    }, [index, delay, count, inView])

    const itemsToShow = useMemo(() => {
      if (count === 0) return []
      // Build a growing window that wraps so the feed never freezes.
      const visible: React.ReactNode[] = []
      const windowSize = Math.min(maxItems, count)
      for (let i = 0; i < windowSize; i++) {
        const itemIndex = (index - i + count) % count
        visible.push(childrenArray[itemIndex])
      }
      return visible
    }, [index, childrenArray, count, maxItems])

    return (
      <div
        ref={containerRef}
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
