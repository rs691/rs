"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { cn } from "@/lib/utils"

const subscribe = () => () => {}

export function ThemeToggleCorner() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return (
    <div className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50">
      <AnimatedThemeToggler
        theme={
          mounted ? (resolvedTheme === "dark" ? "dark" : "light") : undefined
        }
        onThemeChange={setTheme}
        aria-label="Toggle theme"
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-black/12 bg-card text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,1),0_6px_18px_-4px_rgba(0,0,0,.2)] backdrop-blur-md transition-colors",
          "hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-background/70 dark:shadow-sm",
          "[&_svg]:size-5"
        )}
      />
    </div>
  )
}
