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
        "grid w-full grid-cols-1 gap-4 *:min-w-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
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
      "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card",
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div
      aria-hidden
      className="relative min-h-64 flex-1 overflow-hidden mask-[linear-gradient(to_bottom,black_80%,transparent)]"
    >
      {background}
    </div>

    <div className="relative z-10 flex flex-col gap-1.5 p-6 pt-0">
      <Icon className="mb-1 size-8 origin-left text-muted-foreground transition-transform duration-300 ease-in-out group-hover:scale-90" />
      {eyebrow && (
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </span>
      )}
      <h3 className="font-heading text-2xl font-semibold tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
      {href && cta && (
        <Button
          variant="link"
          size="sm"
          className="mt-1 self-start p-0"
          render={<a href={href} target="_blank" rel="noreferrer" />}
          nativeButton={false}
        >
          {cta}
          <ArrowRight data-icon="inline-end" />
        </Button>
      )}
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-foreground/[0.02]" />
  </div>
)

export { BentoCard, BentoGrid }
