"use client"

import React, { useRef, type PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import type { MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  /** Horizontal bar (default) or vertical side rail. */
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 flex w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md",
  {
    variants: {
      orientation: {
        horizontal: "mx-auto mt-8 h-[58px] flex-row",
        vertical: "h-max w-[58px] flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    const mouseAxis = useMotionValue(Infinity)
    const isVertical = orientation === "vertical"

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: isVertical ? undefined : mouseAxis,
            mouseY: isVertical ? mouseAxis : undefined,
            orientation,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseAxis.set(isVertical ? e.pageY : e.pageX)}
        onMouseLeave={() => mouseAxis.set(Infinity)}
        {...props}
        className={cn(dockVariants({ orientation, className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  mouseY?: MotionValue<number>
  orientation?: "horizontal" | "vertical"
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  mouseY,
  orientation = "horizontal",
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouse = useMotionValue(Infinity)
  const isVertical = orientation === "vertical"
  const mouse = (isVertical ? mouseY : mouseX) ?? defaultMouse

  const distanceCalc = useTransform(mouse, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
    if (isVertical) {
      return val - bounds.y - bounds.height / 2
    }
    return val - bounds.x - bounds.width / 2
  })

  const targetSize = disableMagnification ? size : magnification

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex size-full items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
