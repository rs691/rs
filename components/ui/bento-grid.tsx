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
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "border border-black/10 bg-card",
      "[box-shadow:inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,.06),0_10px_20px_-8px_rgba(0,0,0,.12),0_28px_56px_-20px_rgba(0,0,0,.16)]",
      "transform-gpu transition-shadow duration-300 hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,.07),0_16px_32px_-10px_rgba(0,0,0,.14),0_36px_64px_-22px_rgba(0,0,0,.18)]",
      "dark:border-white/10 dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:hover:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="pointer-events-none absolute inset-0">{background}</div>

    <div className="relative z-10 mt-auto bg-gradient-to-t from-card via-card/95 to-transparent p-4 pt-12 dark:from-background dark:via-background/95">
      <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
        {eyebrow && (
          <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            {eyebrow}
          </span>
        )}
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-neutral-500 md:text-base dark:text-neutral-400">
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
