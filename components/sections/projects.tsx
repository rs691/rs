import { ProjectVisual } from "@/components/sections/project-visuals"
import { SectionHeading } from "@/components/sections/section-heading"
import { TechLogo } from "@/components/sections/tech-logo"
import { Badge } from "@/components/ui/badge"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import { projects, siteConfig, techIcon } from "@/lib/site-config"

function StackLogos({ stack }: { stack: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {stack.map((name) => {
        const item = techIcon(name)
        if (!item) {
          return (
            <Badge key={name} variant="secondary">
              {name}
            </Badge>
          )
        }
        return (
          <span
            key={name}
            title={name}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border bg-background",
              item.className
            )}
          >
            <TechLogo
              icon={item.icon}
              variant={item.variant}
              wordmark={item.wordmark}
              scale={1.25}
            />
            <span className="sr-only">{name}</span>
          </span>
        )
      })}
    </div>
  )
}

/** Alternates wide/narrow so each row of three columns reads 2+1, 1+2, 2+1. */
const spans = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
]

export function Projects() {
  const { heading, description } = siteConfig.projects

  return (
    <section id="projects" className="scroll-mt-16">
      <SectionHeading heading={heading} description={description} />

      <BentoGrid className="mx-auto mt-12 max-w-6xl px-5 md:mt-16 md:grid-cols-2 md:gap-6 md:px-6 lg:grid-cols-3 3xl:max-w-7xl">
        {projects.map((project, i) => {
          const link = project.links?.[0]
          return (
            <BlurFade
              key={project.title}
              inView
              direction="up"
              offset={20}
              delay={(i % 2) * 0.08}
              className={spans[i % spans.length]}
            >
              <BentoCard
                name={project.title}
                eyebrow={project.status}
                description={project.description}
                Icon={project.icon}
                href={link?.href}
                cta={link?.label}
                background={<ProjectVisual visual={project.visual} />}
              >
                <StackLogos stack={project.stack} />
              </BentoCard>
            </BlurFade>
          )
        })}
      </BentoGrid>
    </section>
  )
}
