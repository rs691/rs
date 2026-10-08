import { NumberTicker } from "@/components/ui/number-ticker"
import { stats } from "@/lib/site-config"

export function Stats() {
  return (
    <section aria-label="By the numbers" className="px-5 md:px-6">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <dt className="order-last max-w-40 text-sm text-balance text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="font-heading text-5xl font-semibold tracking-tight md:text-6xl">
              <NumberTicker
                value={stat.countDown ? 100 : stat.value}
                startValue={stat.countDown ? stat.value : 0}
                direction={stat.countDown ? "down" : "up"}
                className="tracking-tight text-foreground dark:text-foreground"
              />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
