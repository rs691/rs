"use client"

/**
 * First focusable control — jumps keyboard users past chrome into main.
 * Client boundary keeps this stable under ThemeProvider / Lenis html class updates.
 */
export function SkipLink() {
  return (
    <a href="#top" className="skip-link">
      Skip to main content
    </a>
  )
}
