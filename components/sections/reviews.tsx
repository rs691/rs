import { Quote } from "lucide-react"

import { SectionHeading } from "@/components/sections/section-heading"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Marquee } from "@/components/ui/marquee"
import { reviews, siteConfig, type Review } from "@/lib/site-config"

function ReviewCard({ quote, name, context }: Review) {
  return (
    <Card size="sm" className="w-72 shrink-0 md:w-96">
      <CardContent className="flex flex-col gap-3">
        <Quote className="size-5 text-muted-foreground" />
        <p className="text-base leading-relaxed">{quote}</p>
      </CardContent>
      <CardFooter className="mt-auto flex-col items-start gap-0.5">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{context}</span>
      </CardFooter>
    </Card>
  )
}

export function Reviews() {
  if (reviews.length === 0) return null

  const { heading, description } = siteConfig.reviews
  const half = Math.ceil(reviews.length / 2)
  const rows = [reviews.slice(0, half), reviews.slice(half)]

  return (
    <section id="reviews" className="scroll-mt-8 py-16 md:py-24">
      <SectionHeading heading={heading} description={description} />

      <div className="mt-10 flex flex-col gap-2 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:mt-14">
        <Marquee pauseOnHover className="[--duration:45s] [--gap:1rem] md:hidden">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </Marquee>
        {rows.map((row, i) => (
          <Marquee
            key={i}
            pauseOnHover
            reverse={i === 1}
            className="[--duration:40s] [--gap:1.5rem] max-md:hidden"
          >
            {row.map((review, j) => (
              <ReviewCard key={j} {...review} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
