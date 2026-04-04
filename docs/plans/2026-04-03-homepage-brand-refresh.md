# Homepage Brand Refresh Implementation Plan

> For Hermes: use this plan to refresh the homepage so it matches the new church logo before broader site-wide updates.

Goal: Translate the current homepage into the new visual identity defined by the updated church logo: charcoal, gold, white, reverent, modern, and minimal.

Architecture: Keep the current homepage information architecture and existing dynamic functionality, but replace the blue/purple/high-saturation styling with a consistent brand system. Start by defining homepage-facing brand tokens, then update shared homepage sections in a controlled order so the redesign feels intentional rather than piecemeal.

Tech stack: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase-backed data.

---

## Brand direction extracted from the new logo

Visual mood:
- Reverent
- Minimal
- Elegant
- Modern
- Calm and confident

Core palette proposal:
- Brand charcoal: #1F1F1F
- Soft charcoal: #2A2A2A
- Deep background: #141414
- Brand gold: #C8A96B
- Muted gold: #B79252
- Warm ivory: #F7F3EA
- Soft gray text: #B8B1A6
- Border gray: #3A3936

Design principles:
- Use gold as an accent, not a dominant fill everywhere
- Prefer dark hero/section anchors with warm light content blocks
- Replace colorful gradients with restrained charcoal-to-gold or charcoal-to-transparent treatments
- Favor thin borders, subtle shadows, and strong spacing over flashy effects
- Remove “startup app” energy from homepage CTAs and card treatments

---

## Findings from current homepage

Homepage entry:
- `src/app/page.tsx`

Homepage sections currently rendered:
- `src/components/hero.tsx`
- `src/components/announcements.tsx`
- `src/components/welcomesection.tsx`
- `src/components/miracle.tsx`
- `src/components/valueblocks.tsx`
- `src/components/prayer-wall.tsx`

Current mismatch with new logo:
- Hero uses vivid blue, purple, rose, and orange animated gradients
- Welcome section uses purple/pink dividers and bright multi-color buttons
- Value cards use three separate saturated palettes
- Miracle section uses blue/purple gradients and light card styling
- Overall homepage palette feels colorful and energetic rather than reverent and refined
- Global theme tokens in `src/app/globals.css` are generic shadcn defaults, not church-brand aligned

---

## Recommended implementation order

### Task 1: Define homepage brand tokens

Objective: Establish a reusable homepage palette so redesign decisions are consistent.

Files:
- Modify: `src/app/globals.css`
- Optional modify later: `tailwind.config.ts`

Changes:
- Add homepage-safe CSS variables or utility-friendly comments for:
  - charcoal backgrounds
  - gold accent
  - ivory text/background
  - muted border color
- Do not fully re-theme the entire app yet; focus on values needed by homepage sections first

Verification:
- Brand color values exist in one obvious location
- Future homepage changes can reuse them instead of hardcoding random colors

### Task 2: Redesign the hero first

Objective: Turn the hero into the brand anchor for the whole homepage.

Files:
- Modify: `src/components/hero.tsx`

Changes:
- Replace vivid gradient text effects with cleaner typography
- Keep the background image if it still supports the church identity
- Use a darker overlay, likely charcoal/black with subtle gold accenting
- Introduce the new logo if available as an asset
- Reframe the heading block to feel more formal and composed
- Reduce animation intensity; keep motion subtle if any remains

Visual target:
- Dark, cinematic, welcoming
- Strong white heading text
- Gold accent on one key phrase or divider line
- More “identity statement” than “animated web hero”

### Task 3: Refresh the welcome section

Objective: Make the welcome block feel warm and pastoral, not like a startup landing page.

Files:
- Modify: `src/components/welcomesection.tsx`

Changes:
- Replace purple/pink accents with gold/charcoal accents
- Replace bright CTA gradients with:
  - primary button: charcoal or gold-accented dark button
  - secondary button: outlined gold or ivory-on-dark treatment
- Simplify icon/divider styling
- Keep content and CTA structure, but align tone with the new logo

### Task 4: Unify the “What We Hope For” section

Objective: Keep the content pillars while removing the three-competing-palettes problem.

Files:
- Modify: `src/components/valueblocks.tsx`

Changes:
- Replace amber/blue/emerald split identity with one shared brand system
- Use consistent card backgrounds, borders, and hover states
- Let icon treatment vary slightly if needed, but avoid rainbow branding
- Consider subtle gold top borders or icon halos instead of loud gradients

### Task 5: Rework sermon highlight styling

Objective: Make the sermon area feel premium and consistent with the new brand.

Files:
- Modify: `src/components/miracle.tsx`

Changes:
- Replace purple/blue gradients with charcoal/gold styling
- Restyle cards so they look calmer and more editorial
- Reassess the series image framing so it feels integrated into the new visual system
- Keep sermon functionality unchanged

### Task 6: Re-theme prayer wall for consistency

Objective: Ensure the final homepage section doesn’t feel visually disconnected from the new homepage.

Files:
- Modify: `src/components/prayer-wall.tsx`

Changes:
- Update section background and card treatment to match brand tokens
- Restyle primary/outline buttons for the new palette
- Keep functionality intact
- Make the section feel spiritually warm and readable, not cold or app-like

### Task 7: Tune homepage spacing and section rhythm

Objective: Make the page feel like one cohesive experience instead of stacked components from different design eras.

Files:
- Modify as needed:
  - `src/components/hero.tsx`
  - `src/components/welcomesection.tsx`
  - `src/components/valueblocks.tsx`
  - `src/components/miracle.tsx`
  - `src/components/prayer-wall.tsx`

Changes:
- Normalize section padding
- Normalize heading spacing
- Reuse the same divider language across sections
- Reduce visual clutter and over-animation

---

## Non-goals for the first pass

Do not do these in the homepage-first pass unless necessary:
- Rebuild admin/member pages
- Change backend logic or Supabase structure
- Introduce a full CMS
- Reorganize site routes
- Replace all assets across the whole site at once

The goal is a homepage-first rebrand, not a full rewrite.

---

## Exact files most likely to change in phase 1

Primary homepage files:
- `src/components/hero.tsx`
- `src/components/welcomesection.tsx`
- `src/components/valueblocks.tsx`
- `src/components/miracle.tsx`
- `src/components/prayer-wall.tsx`
- `src/app/globals.css`

Possible secondary file:
- `src/components/announcements.tsx`

Reference files:
- `src/app/page.tsx`
- `src/lib/supabase-image.ts`
- `tailwind.config.ts`

---

## Suggested first implementation slice

Start with only these files:
- `src/app/globals.css`
- `src/components/hero.tsx`
- `src/components/welcomesection.tsx`

Why:
- They set the emotional tone of the homepage fastest
- They deliver the highest visible impact with the least architectural risk
- They create the design language the rest of the homepage can follow

---

## Visual acceptance criteria

The homepage refresh should feel:
- obviously aligned with the new logo
- darker, cleaner, and more elegant
- less saturated and less playful
- more pastoral and intentional
- still welcoming and readable

A viewer should be able to see the homepage and say:
“This belongs to the same identity system as the new logo.”

---

## Recommended next execution step

Implement the first slice only:
1. Add homepage brand tokens in `globals.css`
2. Redesign `hero.tsx`
3. Redesign `welcomesection.tsx`
4. Review visually before touching the rest of the homepage
