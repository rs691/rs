"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type UseInViewOptions,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

type MarginType = UseInViewOptions["margin"]

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

interface StaggerRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  /** Scroll-triggered once. When false, animates on mount. */
  inView?: boolean
  inViewMargin?: MarginType
  delayChildren?: number
  staggerChildren?: number
}

export function StaggerReveal({
  children,
  className,
  inView = false,
  inViewMargin = "-80px",
  delayChildren = 0,
  staggerChildren = 0.12,
  ...props
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const reduced = useReducedMotion()
  const isVisible = reduced || !inView || inViewResult

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : staggerChildren,
            delayChildren: reduced ? 0 : delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span"
}

export function StaggerItem({
  children,
  className,
  as = "div",
  ...props
}: StaggerItemProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={cn(className)}
      variants={reduced ? reducedVariants : itemVariants}
      {...props}
    >
      {children}
    </Component>
  )
}
