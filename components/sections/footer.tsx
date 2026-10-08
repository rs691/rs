import Link from "next/link"
import { Mail } from "lucide-react"

import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const { heading, email, links } = siteConfig.footer

  return (
    <footer id="contact" className="scroll-mt-8 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-6 md:py-16 3xl:max-w-7xl">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">
            {heading}
          </h2>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-2 self-start text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-5" />
            {email}
          </a>
        </div>

        <nav className="flex flex-wrap gap-x-8 text-base text-muted-foreground md:text-lg">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-5 pt-5 pb-28 text-sm text-muted-foreground md:px-6">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
