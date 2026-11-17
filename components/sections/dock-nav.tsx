"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { FileText, Handshake } from "lucide-react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
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
  side = "left",
  children,
}: {
  href: string
  label: string
  active?: boolean
  external?: boolean
  side?: "left" | "right" | "top" | "bottom"
  children: React.ReactNode
}) {
  const isHash = !external && href.startsWith("#")

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
            onClick={
              isHash
                ? (event) => {
                    const target = document.querySelector(href)
                    if (!(target instanceof HTMLElement)) return
                    event.preventDefault()
                    target.scrollIntoView({ behavior: "smooth" })
                  }
                : undefined
            }
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={10}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function DockNav() {
  const active = useActiveSection()
  const { resolvedTheme, setTheme } = useTheme()
  const reduced = useReducedMotion()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const github = siteConfig.footer.links.find((l) => l.label === "GitHub")
  const linkedin = siteConfig.footer.links.find((l) => l.label === "LinkedIn")
  const handshake = siteConfig.footer.links.find((l) => l.label === "Handshake")

  const { scrollYProgress } = useScroll()
  const floatY = useTransform(scrollYProgress, [0, 1], [0, 18])
  const springY = useSpring(floatY, { stiffness: 80, damping: 28 })

  return (
    <motion.nav
      aria-label="Sections"
      style={{ y: reduced ? 0 : springY }}
      className={cn(
        "pointer-events-none fixed z-50 hidden md:flex",
        "top-1/2 right-[max(0.75rem,env(safe-area-inset-right))] -translate-y-1/2"
      )}
    >
      <Dock
        orientation="vertical"
        iconSize={36}
        iconMagnification={48}
        iconDistance={100}
        className="pointer-events-auto mt-0 gap-1 bg-background/70 shadow-lg supports-backdrop-filter:bg-background/50"
      >
        {siteConfig.sections.map(({ label, href, icon: Icon }) => (
          <DockIcon key={href} className="p-0!">
            <DockLink href={href} label={label} active={active === href} side="left">
              <Icon />
            </DockLink>
          </DockIcon>
        ))}

        <Separator orientation="horizontal" className="mx-2 my-0.5 w-auto" />

        <DockIcon className="p-0!">
          <DockLink
            href={siteConfig.resumeHref}
            label="Resume"
            external
            side="left"
          >
            <FileText />
          </DockLink>
        </DockIcon>
        {github && (
          <DockIcon className="p-0!">
            <DockLink href={github.href} label="GitHub" external side="left">
              <GithubOriginal className="[&_*]:fill-current" />
            </DockLink>
          </DockIcon>
        )}
        {linkedin && (
          <DockIcon className="p-0!">
            <DockLink href={linkedin.href} label="LinkedIn" external side="left">
              <LinkedinPlain className="[&_*]:fill-current" />
            </DockLink>
          </DockIcon>
        )}
        {handshake && (
          <DockIcon className="p-0!">
            <DockLink
              href={handshake.href}
              label="Handshake"
              external
              side="left"
            >
              <Handshake />
            </DockLink>
          </DockIcon>
        )}

        <Separator orientation="horizontal" className="mx-2 my-0.5 w-auto" />

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
    </motion.nav>
  )
}
