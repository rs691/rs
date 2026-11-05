import { ProjectVisual } from "@/components/sections/project-visuals"
import { SectionHeading } from "@/components/sections/section-heading"
import { TechLogo } from "@/components/sections/tech-logo"
import { Badge } from "@/components/ui/badge"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import { projects, siteConfig, techIcon, type Project } from "@/lib/site-config"

function StackLogos({ stack }: { stack: string[] }) {
  const shown = stack.slice(0, 5)
  const extra = stack.length - shown.length

  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      {shown.map((name) => {
        const item = techIcon(name)
        if (!item) {
          return (
            <Badge key={name} variant="secondary" className="text-[0.6rem]">
              {name}
            </Badge>
          )
        }
        return (
          <span
            key={name}
            title={name}
            className={cn(
              "flex size-6 items-center justify-center rounded-md border border-black/12 bg-card shadow-[0_2px_6px_-1px_rgba(0,0,0,.12)] dark:border-white/10 dark:bg-background dark:shadow-none",
              item.className
            )}
          >
            <TechLogo
              icon={item.icon}
              variant={item.variant}
              wordmark={item.wordmark}
              scale={1}
            />
            <span className="sr-only">{name}</span>
          </span>
        )
      })}
      {extra > 0 && (
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  )
}

/**
 * Asymmetric bento rhythm: 1+2, 2+1, 1+2 so the last row mirrors the first.
 */
const magicOrder: Project["visual"][] = [
  "checkins",
  "storefront",
  "tenants",
  "calendar",
  "api",
  "bingo",
]

const spans: Record<Project["visual"], string> = {
  checkins: "col-span-3 lg:col-span-1",
  storefront: "col-span-3 lg:col-span-2",
  tenants: "col-span-3 lg:col-span-2",
  calendar: "col-span-3 lg:col-span-1",
  api: "col-span-3 lg:col-span-1",
  bingo: "col-span-3 lg:col-span-2",
}

export function Projects() {
  const { heading, description } = siteConfig.projects
  const ordered = magicOrder
    .map((visual) => projects.find((p) => p.visual === visual))
    .filter((p): p is Project => Boolean(p))

  return (
    <section id="projects" className="scroll-mt-16">
      <SectionHeading heading={heading} description={description} />

      <div className="mx-auto mt-12 max-w-5xl px-5 md:mt-16 md:px-6">
        <BentoGrid>
          {ordered.map((project, i) => {
            const link = project.links?.[0]
            return (
              <BlurFade
                key={project.title}
                inView
                direction="up"
                offset={20}
                delay={(i % 2) * 0.08}
                className={cn("h-full min-h-0", spans[project.visual])}
              >
                <BentoCard
                  className="h-full"
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
      </div>
    </section>
  )
}
