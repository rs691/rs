"use client"

import { useRef } from "react"
import { GraduationCap } from "lucide-react"
import { motion, useScroll, useSpring } from "motion/react"

import { SectionHeading } from "@/components/sections/section-heading"
import { BlurFade } from "@/components/ui/blur-fade"
import { education, experience, siteConfig } from "@/lib/site-config"

export function Experience() {
  const { heading, description } = siteConfig.experience
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 75%", "end 60%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="scroll-mt-16">
      <SectionHeading heading={heading} description={description} />

      <div className="mx-auto mt-12 max-w-3xl px-5 md:mt-16 md:px-6">
        <div className="relative pl-8 md:pl-12">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-border md:left-[11px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-[#ff2975] to-[#00a3bd] md:left-[11px] dark:to-[#00FFF1]"
          />
          <ol ref={list} className="flex flex-col gap-12">
            {experience.map((job) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-8 size-[15px] rounded-full border-2 border-background bg-foreground md:-left-12 md:size-[23px] md:border-4"
                />
                <BlurFade inView direction="up" offset={16}>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {job.period} · {job.location}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-lg text-muted-foreground">
                    {job.company}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2 text-base leading-relaxed">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>

        <BlurFade inView direction="up" offset={16}>
          <div className="mt-14 flex flex-col gap-3 rounded-2xl border border-black/10 bg-card p-6 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_28px_-10px_rgba(0,0,0,.14),0_24px_48px_-20px_rgba(0,0,0,.1)] md:flex-row md:items-center md:gap-8 dark:border-white/10 dark:shadow-none">
            <GraduationCap className="size-6 shrink-0 text-muted-foreground" />
            {education.map((item) => (
              <div key={item.degree} className="flex flex-col">
                <span className="font-medium">{item.degree}</span>
                <span className="text-sm text-muted-foreground">
                  {item.school} · {item.date}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
