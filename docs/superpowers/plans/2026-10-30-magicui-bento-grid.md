# Magic UI Bento Grid Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Match Magic UI bento-grid shell and demo animation framing on portfolio project cards.

**Architecture:** Rewrite `BentoCard` to Magic UI structure while keeping portfolio props; retune visual wrappers in `project-visuals.tsx` only.

**Tech Stack:** React, Tailwind, existing Button / Lucide icons

## Global Constraints

- Keep `eyebrow`, `children`, optional `href`/`cta`
- Use Base UI Button `render={<a />}` pattern (not `asChild`)
- Do not change project copy or span map

---

### Task 1: Rewrite `bento-grid.tsx`

**Files:**
- Modify: `components/ui/bento-grid.tsx`

- [ ] Replace card shell classes with Magic UI glass styles (`bg-background`, shadows, dark border/inset)
- [ ] Render `{background}` without absolute inset wrapper
- [ ] Content block: `p-4`, icon `h-12 w-12`, hover `-translate-y-10`
- [ ] Dual CTA (mobile inline / desktop absolute bottom hover)
- [ ] Hover veil matching Magic UI

### Task 2: Align project visuals

**Files:**
- Modify: `components/sections/project-visuals.tsx`

- [ ] ProductCard → `w-32` + Magic glass figure classes + `blur-[1px]`
- [ ] Checkins / Tenants / Calendar positioning to Magic demo classes
- [ ] Leave bingo board intrinsic tile size; keep clipping via card overflow

### Task 3: Verify

- [ ] Visual check in browser / lint on touched files
