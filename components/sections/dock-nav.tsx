"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { FileText } from "lucide-react"
import { useTheme } from "next-themes"
import GithubOriginal from "devicons-react/icons/GithubOriginal"
import LinkedinPlain from "devicons-react/icons/LinkedinPlain"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const subscribe = () => () => {}

const itemClass =
  "flex size-full items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-5"

function useActiveSection() {
  const [active, setActive] = useState(siteConfig.sections[0].href)

  useEffect(() => {
    const targets = siteConfig.sections.slice(1)
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = siteConfig.sections[0].href
      for (const { href } of targets) {
        const el = document.querySelector(href)
        if (el && el.getBoundingClientRect().top <= line) current = href
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      setActive(atBottom ? targets[targets.length - 1].href : current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return active
}

function DockLink({
  href,
  label,
  active,
  external,
  children,
}: {
  href: string
  label: string
  active?: boolean
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={href}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className={cn(itemClass, active && "bg-muted text-foreground")}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>{label}</TooltipContent>
    </Tooltip>
  )
}

export function DockNav() {
  const active = useActiveSection()
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const github = siteConfig.footer.links.find((l) => l.label === "GitHub")
  const linkedin = siteConfig.footer.links.find((l) => l.label === "LinkedIn")

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3"
    >
      <Dock
        iconSize={40}
        iconMagnification={56}
        className="pointer-events-auto mt-0 h-14 gap-1 bg-background/70 shadow-lg supports-backdrop-filter:bg-background/50 sm:gap-2"
      >
        {siteConfig.sections.map(({ label, href, icon: Icon }) => (
          <DockIcon key={href} className="p-0!">
            <DockLink href={href} label={label} active={active === href}>
              <Icon />
            </DockLink>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="mx-0.5 my-2" />

        <DockIcon className="p-0!">
          <DockLink href={siteConfig.resumeHref} label="Resume" external>
            <FileText />
          </DockLink>
        </DockIcon>
        {github && (
          <DockIcon className="p-0! max-sm:hidden">
            <DockLink href={github.href} label="GitHub" external>
              <GithubOriginal className="[&_*]:fill-current" />
            </DockLink>
          </DockIcon>
        )}
        {linkedin && (
          <DockIcon className="p-0! max-sm:hidden">
            <DockLink href={linkedin.href} label="LinkedIn" external>
              <LinkedinPlain className="[&_*]:fill-current" />
            </DockLink>
          </DockIcon>
        )}

        <Separator orientation="vertical" className="mx-0.5 my-2" />

        <DockIcon className="p-0!">
          <AnimatedThemeToggler
            theme={
              mounted ? (resolvedTheme === "dark" ? "dark" : "light") : undefined
            }
            onThemeChange={setTheme}
            aria-label="Toggle theme"
            className={itemClass}
          />
        </DockIcon>
      </Dock>
    </nav>
  )
}
