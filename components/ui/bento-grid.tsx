import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  eyebrow?: string
  href?: string
  cta?: string
  children?: ReactNode
  /** Narrow cards: less copy chrome so the animation keeps the upper pane. */
  compact?: boolean
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardCta({
  href,
  cta,
  className,
}: {
  href: string
  cta: string
  className?: string
}) {
  return (
    <Button
      variant="link"
      size="sm"
      className={cn("pointer-events-auto p-0", className)}
      render={<a href={href} target="_blank" rel="noreferrer" />}
      nativeButton={false}
    >
      {cta}
      <ArrowRight data-icon="inline-end" />
    </Button>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  eyebrow,
  href,
  cta,
  children,
  compact = false,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "border border-black/8 bg-card",
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.04),0_12px_24px_-8px_rgba(0,0,0,.08)]",
      "dark:border-white/10 dark:bg-neutral-950",
      "dark:[box-shadow:0_0_0_1px_rgba(255,255,255,.04),0_-20px_80px_-20px_#ffffff1f_inset,0_0_40px_-12px_rgba(255,255,255,.08)]",
      "transform-gpu transition-shadow duration-300",
      "hover:[box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_4px_8px_rgba(0,0,0,.05),0_16px_32px_-10px_rgba(0,0,0,.1)]",
      "dark:hover:[box-shadow:0_0_0_1px_rgba(255,255,255,.06),0_-20px_80px_-20px_#ffffff1f_inset,0_0_56px_-10px_rgba(255,255,255,.12)]",
      className
    )}
    {...props}
  >
    <div className="pointer-events-none absolute inset-0">{background}</div>

    <div
      className={cn(
        "relative z-10 mt-auto bg-gradient-to-t from-card to-transparent dark:from-neutral-950",
        compact
          ? "via-card/95 from-40% px-3 pt-16 pb-3 dark:via-neutral-950/95"
          : "via-card/90 p-4 pt-12 dark:via-neutral-950/90"
      )}
    >
      <div
        className={cn(
          "pointer-events-none flex transform-gpu flex-col transition-all duration-300 lg:group-hover:-translate-y-10",
          compact ? "gap-0.5" : "gap-1"
        )}
      >
        <Icon
          className={cn(
            "origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300",
            compact ? "h-8 w-8" : "h-12 w-12"
          )}
        />
        {eyebrow && (
          <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            {eyebrow}
          </span>
        )}
        <h3
          className={cn(
            "font-semibold text-neutral-800 dark:text-neutral-300",
            compact ? "text-lg" : "text-xl"
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "text-neutral-500 dark:text-neutral-400",
            compact
              ? "line-clamp-2 text-sm leading-snug"
              : "max-w-lg text-base"
          )}
        >
          {description}
        </p>
        {children}
      </div>

      {href && cta && (
        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          <CardCta href={href} cta={cta} />
        </div>
      )}
    </div>

    {href && cta && (
      <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
        <CardCta href={href} cta={cta} />
      </div>
    )}

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }
