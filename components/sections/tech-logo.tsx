import { cn } from "@/lib/utils"
import type { MarqueeIcon } from "@/lib/site-config"

export function TechLogo({
  icon: Icon,
  variant,
  wordmark,
  scale = 1,
  className,
}: Pick<MarqueeIcon, "icon" | "variant" | "wordmark"> & {
  scale?: number
  className?: string
}) {
  if (variant === "outline") {
    return (
      <Icon
        className={cn("relative", className)}
        size={`${42 * scale}%`}
        strokeWidth={1.5}
      />
    )
  }

  return (
    <Icon
      size={`${(wordmark ? 80 : 48) * scale}%`}
      fill={variant === "mono" ? "currentColor" : undefined}
      className={cn(
        "relative",
        variant === "mono" && "[&_*]:fill-current",
        className
      )}
    />
  )
}
