"use client"

import { AuroraText } from "@/components/ui/aurora-text"
import { StaggerItem, StaggerReveal } from "@/components/ui/stagger-reveal"
import { auroraColors } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const sizes = {
  /** Standard section openers under the hero */
  default:
    "max-w-2xl font-heading text-2xl font-semibold tracking-tight text-balance xs:text-3xl md:text-4xl",
  /** Hierarchy reset — experience and other major beats */
  display:
    "max-w-4xl font-heading text-4xl font-semibold tracking-tight text-balance xs:text-5xl md:text-6xl md:leading-none",
} as const

export function SectionHeading({
  heading,
  description,
  size = "default",
  aurora = true,
}: {
  heading: string
  description?: string
  size?: keyof typeof sizes
  /** Aurora on solid page bg only — leave off over imagery */
  aurora?: boolean
}) {
  return (
    <StaggerReveal
      inView
      className="flex flex-col items-center px-6 text-center"
    >
      <StaggerItem as="h2" className={cn(sizes[size])}>
        {aurora ? (
          <AuroraText colors={auroraColors}>{heading}</AuroraText>
        ) : (
          heading
        )}
      </StaggerItem>
      {description ? (
        <StaggerItem
          as="p"
          className={cn(
            "mt-3 max-w-lg text-balance text-muted-foreground",
            size === "display"
              ? "text-base xs:text-lg md:max-w-xl"
              : "text-sm xs:text-base"
          )}
        >
          {description}
        </StaggerItem>
      ) : null}
    </StaggerReveal>
  )
}
