import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

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

export function HeroText({ showCtas = false }: { showCtas?: boolean }) {
  const { headline, description, name, role } = siteConfig

  return (
    <>
      <h1 className="max-w-4xl animate-in font-heading text-3xl font-semibold tracking-tight text-balance duration-700 fade-in slide-in-from-top-4 fill-mode-both xs:text-[2.5rem] xs:leading-tight md:text-[min(3.75rem,9svh)] md:leading-none 3xl:max-w-5xl 3xl:text-[min(4.5rem,9svh)]">
        {headline}
      </h1>

      <p className="mt-4 max-w-2xl animate-in text-base text-balance text-muted-foreground delay-150 duration-700 fade-in slide-in-from-top-2 fill-mode-both xs:text-lg 3xl:max-w-3xl 3xl:text-xl">
        {description}
      </p>

      <p className="mt-3 animate-in font-mono text-xs tracking-widest text-muted-foreground uppercase delay-300 duration-700 fade-in fill-mode-both">
        {name} &middot; {role}
      </p>

      {showCtas ? (
        <HeroCtas className="mt-6 animate-in delay-450 duration-700 fade-in fill-mode-both" />
      ) : null}
    </>
  )
}

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 pb-4 text-center md:pt-14">
      <HeroText showCtas />
    </section>
  )
}
