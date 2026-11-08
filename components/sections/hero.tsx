"use client"

import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

import { AuroraText } from "@/components/ui/aurora-text"
import { buttonVariants } from "@/components/ui/button"
import { StaggerItem, StaggerReveal } from "@/components/ui/stagger-reveal"
import { cn } from "@/lib/utils"
import { auroraColors, siteConfig } from "@/lib/site-config"

export function HeroCtas({ className }: { className?: string }) {
  const { primary, secondary } = siteConfig.ctas

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      <Link href={primary.href} className={cn(buttonVariants({ size: "lg" }))}>
        <Mail data-icon="inline-start" />
        {primary.label}
      </Link>
      <Link
        href={secondary.href}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
      >
        {secondary.label}
        <ArrowRight data-icon="inline-end" />
      </Link>
    </div>
  )
}

function splitHeadline(headline: string): [string, string | null] {
  const comma = headline.indexOf(",")
  if (comma === -1) return [headline, null]
  return [headline.slice(0, comma + 1), headline.slice(comma + 1).trim()]
}

export function HeroText({ showCtas = false }: { showCtas?: boolean }) {
  const { headline, description, name, role } = siteConfig
  const [line1, line2] = splitHeadline(headline)

  return (
    <StaggerReveal
      delayChildren={0.3}
      className="flex w-full max-w-5xl flex-col items-center px-1"
    >
      {/* Display — largest on the page */}
      <StaggerItem
        as="h1"
        className="font-heading text-5xl font-semibold tracking-tight text-balance xs:text-6xl md:text-[clamp(3.5rem,9vw,5.5rem)] md:leading-[0.95]"
      >
        <AuroraText colors={auroraColors}>{name}</AuroraText>
      </StaggerItem>

      <StaggerItem
        as="p"
        className="mt-3 font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase md:text-xs"
      >
        {role}
      </StaggerItem>

      {/* Lead — clearly under the name */}
      <StaggerItem
        as="p"
        className="mt-7 max-w-3xl font-heading text-xl font-semibold tracking-tight text-balance xs:text-2xl md:mt-9 md:text-3xl md:leading-snug"
      >
        {line1}
        {line2 ? (
          <>
            {" "}
            {line2}
          </>
        ) : null}
      </StaggerItem>

      <StaggerItem
        as="p"
        className="mt-3 max-w-xl text-sm text-balance text-muted-foreground xs:text-base md:text-lg"
      >
        {description}
      </StaggerItem>

      {showCtas ? (
        <StaggerItem className="mt-6">
          <HeroCtas />
        </StaggerItem>
      ) : null}
    </StaggerReveal>
  )
}

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-10 pb-4 text-center md:pt-14">
      <HeroText showCtas />
    </section>
  )
}
