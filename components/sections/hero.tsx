import { siteConfig } from "@/lib/site-config"

export function HeroText() {
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
    </>
  )
}

export function Hero() {
  return (
    <section
      className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 pb-4 text-center md:pt-14"
    >
      <HeroText />
    </section>
  )
}
