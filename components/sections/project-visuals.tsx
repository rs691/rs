"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"
import {
  Backpack,
  BookOpen,
  Check,
  Coffee,
  Footprints,
  Glasses,
  Grid3x3,
  Headphones,
  KeyRound,
  Mail,
  Pizza,
  Shield,
  Shirt,
  Sparkles,
  Store,
  Trophy,
  Watch,
  type LucideIcon,
} from "lucide-react"

import { AnimatedBeam } from "@/components/ui/animated-beam"
import { AnimatedList } from "@/components/ui/animated-list"
import { Marquee } from "@/components/ui/marquee"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/site-config"

const neon = { from: "#ff2975", to: "#00b8d4" }

/** Counts up every `ms` while the element is on screen, unless reduced motion is on. */
function useTicker(ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "100px" })
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => setTick((t) => t + 1), ms)
    return () => clearInterval(id)
  }, [inView, reduced, ms])

  return { ref, tick, reduced }
}

/* YourOpoly: live check-in feed */

const checkins: {
  title: string
  detail: string
  points?: number
  icon: LucideIcon
  color: string
}[] = [
  { title: "Maple Street Coffee", detail: "QR check-in", points: 50, icon: Coffee, color: "#f59e0b" },
  { title: "Riverside Books", detail: "Promo redeemed", points: 120, icon: BookOpen, color: "#10b981" },
  { title: "Jordan took #1", detail: "Leaderboard", icon: Trophy, color: "#ff2975" },
  { title: "Old Market Pizza", detail: "QR check-in", points: 75, icon: Pizza, color: "#06b6d4" },
  { title: "Weekly digest ready", detail: "Gemini insights", icon: Sparkles, color: "#8b5cf6" },
]

function CheckinsVisual() {
  const feed = Array.from({ length: 8 }, (_, round) =>
    checkins.map((item) => ({ ...item, key: `${round}-${item.title}` }))
  ).flat()

  return (
    <AnimatedList
      delay={1600}
      className="absolute inset-x-4 top-4 mx-auto h-[300px] max-w-xl transition-transform duration-300 group-hover:scale-[1.02] md:inset-x-6"
    >
      {feed.map(({ key, title, detail, points, icon: Icon, color }) => (
        <figure
          key={key}
          className="flex w-full items-center gap-3 rounded-2xl border bg-background/80 p-3 shadow-sm backdrop-blur-sm"
        >
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}22`, color }}
          >
            <Icon className="size-5" />
          </span>
          <figcaption className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">{title}</span>
            <span className="text-xs text-muted-foreground">{detail}</span>
          </figcaption>
          {points && (
            <span className="font-mono text-sm font-semibold" style={{ color }}>
              +{points}
            </span>
          )}
        </figure>
      ))}
    </AnimatedList>
  )
}

/* Good Life Bingo: squares get marked until a line wins */

const bingoLines = [
  [0, 6, 12, 18, 24],
  [10, 11, 12, 13, 14],
  [2, 7, 12, 17, 22],
  [4, 8, 12, 16, 20],
  [5, 6, 7, 8, 9],
]
const FREE = 12

function BingoVisual() {
  const { ref, tick, reduced } = useTicker(450)
  const cycle = 9
  const line = bingoLines[Math.floor(tick / cycle) % bingoLines.length]
  const step = reduced ? 5 : Math.min(tick % cycle, 5)
  const marked = new Set([FREE, ...line.slice(0, step)])
  const won = step === 5

  return (
    <div ref={ref} className="flex h-full items-start justify-center pt-5">
      <div className="grid grid-cols-5 gap-1.5">
        {"BINGO".split("").map((letter) => (
          <span
            key={letter}
            className="pb-1 text-center font-display text-sm font-bold text-muted-foreground"
          >
            {letter}
          </span>
        ))}
        {Array.from({ length: 25 }, (_, i) => {
          const isMarked = marked.has(i)
          const isWin = won && line.includes(i)
          return (
            <motion.span
              key={i}
              animate={{ scale: isMarked && i !== FREE ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-300",
                isMarked ? "border-transparent text-white" : "bg-background text-muted-foreground",
                isMarked && !isWin && "bg-foreground/70 dark:bg-foreground/30",
                isWin && "bg-linear-to-br from-[#ff2975] to-[#00b8d4]"
              )}
            >
              {i === FREE ? "★" : isMarked ? <Check className="size-4" /> : (i * 7) % 75 + 1}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

/* Admin platform: tenant products beam into one console */

function BeamNode({
  nodeRef,
  icon: Icon,
  label,
  large,
}: {
  nodeRef: RefObject<HTMLDivElement | null>
  icon: LucideIcon
  label: string
  large?: boolean
}) {
  return (
    <div className="z-10 flex flex-col items-center gap-1">
      <div
        ref={nodeRef}
        className={cn(
          "flex items-center justify-center rounded-full border bg-background shadow-[0_0_20px_-12px_rgb(0_0_0/0.8)]",
          large ? "size-16" : "size-11"
        )}
      >
        <Icon className={large ? "size-7" : "size-5"} />
      </div>
      <span className="text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

function TenantsVisual() {
  const container = useRef<HTMLDivElement>(null)
  const a = useRef<HTMLDivElement>(null)
  const b = useRef<HTMLDivElement>(null)
  const c = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const rbac = useRef<HTMLDivElement>(null)

  const beam = {
    containerRef: container,
    gradientStartColor: neon.from,
    gradientStopColor: neon.to,
    duration: 3,
  }

  return (
    <div
      ref={container}
      className="relative flex h-full min-h-64 items-center justify-between px-8 pt-4 pb-6"
    >
      <div className="flex flex-col gap-3">
        <BeamNode nodeRef={a} icon={Trophy} label="YourOpoly" />
        <BeamNode nodeRef={b} icon={Grid3x3} label="Bingo" />
        <BeamNode nodeRef={c} icon={Store} label="Partners" />
      </div>
      <BeamNode nodeRef={hub} icon={Shield} label="Admin" large />
      <BeamNode nodeRef={rbac} icon={KeyRound} label="RBAC" />

      <AnimatedBeam {...beam} fromRef={a} toRef={hub} curvature={-30} />
      <AnimatedBeam {...beam} fromRef={b} toRef={hub} delay={0.5} />
      <AnimatedBeam {...beam} fromRef={c} toRef={hub} curvature={30} delay={1} />
      <AnimatedBeam {...beam} fromRef={hub} toRef={rbac} delay={1.5} />
    </div>
  )
}

/* E-commerce: products scrolling past with checkout status */

const products: { name: string; price: string; icon: LucideIcon; color: string }[] = [
  { name: "Linen Shirt", price: "$48", icon: Shirt, color: "#f97316" },
  { name: "Field Watch", price: "$129", icon: Watch, color: "#0ea5e9" },
  { name: "Headphones", price: "$199", icon: Headphones, color: "#8b5cf6" },
  { name: "Trail Runners", price: "$89", icon: Footprints, color: "#10b981" },
  { name: "Day Pack", price: "$64", icon: Backpack, color: "#ef4444" },
  { name: "Sunglasses", price: "$35", icon: Glasses, color: "#eab308" },
]

function ProductCard({ name, price, icon: Icon, color }: (typeof products)[number]) {
  return (
    <figure className="flex w-44 flex-col gap-2 rounded-2xl border bg-background p-3 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <span
        className="flex h-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}1f`, color }}
      >
        <Icon className="size-6" />
      </span>
      <figcaption className="flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium">{name}</span>
        <span className="font-mono text-muted-foreground">{price}</span>
      </figcaption>
      <span className="flex items-center gap-1 text-[0.65rem] font-medium tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
        <Check className="size-3" /> Paid via Stripe
      </span>
    </figure>
  )
}

function StorefrontVisual() {
  return (
    <div className="flex h-full min-h-64 flex-col justify-center gap-1 py-2">
      <Marquee pauseOnHover className="[--duration:32s] [--gap:0.75rem]">
        {products.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:0.75rem]">
        {[...products].reverse().map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </Marquee>
    </div>
  )
}

/* Task board API: requests typed into a terminal */

function ApiVisual() {
  return (
    <Terminal className="absolute inset-x-4 top-4 mx-auto max-w-2xl bg-background/90 md:inset-x-6">
      <TypingAnimation className="text-xs">
        {"$ curl -H 'X-Tenant: acme' /api/tasks"}
      </TypingAnimation>
      <AnimatedSpan className="text-xs text-emerald-600 dark:text-emerald-400">
        ✔ 200 OK · 12 tasks for tenant acme
      </AnimatedSpan>
      <TypingAnimation className="text-xs">
        {"$ curl -H 'X-Tenant: globex' /api/tasks/42"}
      </TypingAnimation>
      <AnimatedSpan className="text-xs text-rose-600 dark:text-rose-400">
        ✖ 404 Not Found · hidden by global query filter
      </AnimatedSpan>
      <TypingAnimation className="text-xs">{"$ dotnet test"}</TypingAnimation>
      <AnimatedSpan className="text-xs text-emerald-600 dark:text-emerald-400">
        ✔ All passed · tenant isolation suite
      </AnimatedSpan>
      <TypingAnimation className="text-xs">{"$ git push origin main"}</TypingAnimation>
      <AnimatedSpan className="text-xs text-sky-600 dark:text-sky-400">
        ✔ GitHub Actions · deployed to Azure
      </AnimatedSpan>
    </Terminal>
  )
}

/* Reservations: days get booked, a double-booking is rejected */

const bookings: { day: number; conflict?: boolean }[] = [
  { day: 6 },
  { day: 9 },
  { day: 14 },
  { day: 14, conflict: true },
  { day: 20 },
  { day: 23 },
]
const FIRST_WEEKDAY = 4

function CalendarVisual() {
  const { ref, tick, reduced } = useTicker(1100)
  const step = reduced ? bookings.length : tick % (bookings.length + 2)
  const done = bookings.slice(0, step)
  const latest = done.at(-1)
  const booked = new Set(done.filter((b) => !b.conflict).map((b) => b.day))

  return (
    <div ref={ref} className="flex h-full flex-col items-center gap-3 pt-5">
      <div className="flex h-7 w-60 items-center justify-between">
        <span className="text-sm font-semibold">October 2026</span>
        <AnimatePresence mode="wait">
          {latest && (
            <motion.span
              key={done.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-medium",
                latest.conflict
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              )}
            >
              {latest.conflict ? (
                "Slot taken"
              ) : (
                <>
                  <Mail className="size-3" /> Confirmed
                </>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="grid w-60 grid-cols-7 gap-1 text-center text-xs">
        {"SMTWTFS".split("").map((d, i) => (
          <span key={i} className="pb-1 text-muted-foreground">
            {d}
          </span>
        ))}
        {Array.from({ length: FIRST_WEEKDAY }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1
          const isBooked = booked.has(day)
          const isConflict = latest?.conflict && latest.day === day
          return (
            <motion.span
              key={day}
              animate={isConflict ? { x: [0, -3, 3, -2, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex aspect-square items-center justify-center rounded-md transition-colors duration-300",
                isBooked && "bg-foreground font-semibold text-background",
                isConflict && "ring-2 ring-rose-500"
              )}
            >
              {day}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

const visuals: Record<Project["visual"], () => React.ReactNode> = {
  checkins: CheckinsVisual,
  bingo: BingoVisual,
  tenants: TenantsVisual,
  storefront: StorefrontVisual,
  api: ApiVisual,
  calendar: CalendarVisual,
}

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  const Visual = visuals[visual]
  return <Visual />
}
