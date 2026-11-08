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

/** Soft fade into the card title — Magic UI style (stronger dissolve at bottom). */
const fadeUp =
  "[mask-image:linear-gradient(to_top,transparent_0%,transparent_12%,#000_55%,#000_100%)]"

/** Nested glass panes used inside bento demos. */
const glassPane =
  "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md"

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

/* YourOpoly: live check-in feed (wide card — like Magic UI Notifications) */

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
  // Upper-pane feed — keep clear of the compact title band on narrow cards.
  const feed = checkins.map((item) => ({ ...item, key: item.title }))

  return (
    <AnimatedList
      delay={1600}
      maxItems={2}
      className={cn(
        "absolute inset-x-0 top-0 h-[52%] origin-top scale-[0.8] overflow-hidden border-none px-2 pt-3 transition-all duration-300 ease-out group-hover:scale-[0.88]",
        "[mask-image:linear-gradient(to_top,transparent_0%,transparent_18%,#000_70%,#000_100%)]"
      )}
    >
      {feed.map(({ key, title, detail, points, icon: Icon, color }) => (
        <figure
          key={key}
          className={cn(
            "relative mx-auto flex min-h-fit w-full max-w-[400px] items-center gap-3 overflow-hidden rounded-2xl p-3",
            "transform-gpu",
            glassPane
          )}
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: color, color: "#fff" }}
          >
            <Icon className="size-4" />
          </span>
          <figcaption className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium dark:text-white">
              {title}
            </span>
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

/* Good Life Bingo: narrow card — board clips into the rounded glass edge */

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
    <div
      ref={ref}
      className={cn(
        "absolute top-4 right-2 origin-top scale-75 transition-all duration-300 ease-out group-hover:scale-90 lg:right-8",
        fadeUp
      )}
    >
      <div className={cn("grid grid-cols-5 gap-1.5 rounded-xl border p-3", glassPane)}>
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
          large ? "size-14" : "size-10"
        )}
      >
        <Icon className={large ? "size-6" : "size-4"} />
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
      className={cn(
        "absolute top-4 right-2 flex h-[300px] w-full max-w-[600px] items-center justify-between overflow-hidden p-10 transition-all duration-300 ease-out group-hover:scale-105",
        "[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]"
      )}
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

/* E-commerce: marquee that bleeds past the rounded glass edges (yellow-arrow look) */

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
    <figure
      className={cn(
        "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
      )}
    >
      <span
        className="mb-2 flex h-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1f`, color }}
      >
        <Icon className="size-5" />
      </span>
      <figcaption className="flex items-center justify-between gap-1 text-sm">
        <span className="truncate font-medium">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{price}</span>
      </figcaption>
      <span className="mt-1 flex items-center gap-1 text-[0.6rem] font-medium tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
        <Check className="size-2.5" /> Paid
      </span>
    </figure>
  )
}

function StorefrontVisual() {
  return (
    <Marquee
      pauseOnHover
      className={cn(
        "absolute top-10 [--duration:20s]",
        "[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.name} {...p} />
      ))}
    </Marquee>
  )
}

/* Task board API */

function ApiVisual() {
  return (
    <Terminal
      className={cn(
        "absolute top-3 -right-6 w-[min(100%,22rem)] max-w-[340px] origin-top scale-[0.68] border transition-all duration-300 ease-out group-hover:scale-[0.78]",
        glassPane,
        "dark:bg-background/90",
        "[mask-image:linear-gradient(to_top,transparent_0%,transparent_22%,#000_75%,#000_100%)]"
      )}
    >
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
        ✖ 404 · hidden by query filter
      </AnimatedSpan>
      <TypingAnimation className="text-xs">{"$ dotnet test"}</TypingAnimation>
      <AnimatedSpan className="text-xs text-emerald-600 dark:text-emerald-400">
        ✔ Tenant isolation suite passed
      </AnimatedSpan>
    </Terminal>
  )
}

/* Reservations calendar — clips into the right glass edge like Magic UI */

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
    <div
      ref={ref}
      className={cn(
        "absolute top-10 right-0 flex origin-top scale-75 flex-col gap-3 rounded-md border p-3 transition-all duration-300 ease-out group-hover:scale-90",
        glassPane,
        "[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      )}
    >
      <div className="flex h-7 w-52 items-center justify-between">
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
      <div className="grid w-52 grid-cols-7 gap-1 text-center text-xs">
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
