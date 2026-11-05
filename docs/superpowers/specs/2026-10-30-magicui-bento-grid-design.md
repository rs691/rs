# Magic UI Bento Grid Match

**Goal:** Make portfolio project cards match Magic UI’s [bento-grid](https://magicui.design/docs/components/bento-grid) shell and demo animation framing.

## Scope

- Align `components/ui/bento-grid.tsx` with Magic UI registry structure/styles
- Align `components/sections/project-visuals.tsx` positioning/widths with Magic demo
- Keep project content, 6-card layout, `eyebrow` / stack logos / optional CTA

## Card shell

- `bg-background` + Magic light shadow / dark inset glow + border
- Background rendered as a sibling (not `absolute inset-0` wrapper)
- Bottom `p-4` content; icon `h-12 w-12`; `lg:group-hover:-translate-y-10`
- No gradient text wash over animations
- Mobile CTA always visible; desktop CTA absolute bottom, hover reveal
- Hover veil: `bg-black/3` / `dark:bg-neutral-800/10`

## Animation panes

- Marquee tiles: `w-32`, Magic glass border/bg, `blur-[1px]` → clear on hover
- Check-ins: `top-4 right-2 h-[300px] w-full scale-75` + top mask
- Beam: `top-4 right-2 h-[300px]` without extra full-bleed padding
- Calendar: `top-10 right-0 origin-top scale-75 rounded-md border` + mask
- Card `overflow-hidden` clips animations into rounded glass edges

## Out of scope

- Replacing project demos with Magic’s file/calendar demo content
- Changing grid column spans / max-width of the projects section
