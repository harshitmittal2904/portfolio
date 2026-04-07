# Portfolio Redesign — Design Spec

**Date:** 2026-04-07
**Owner:** Harshit Mittal
**Status:** Design locked, pending implementation plan

## Goal

Redesign harshitmittal.in to convert recruiters from three personas — Indian startups, global/FAANG, and AI-focused companies — into outreach. Mobile-first. Distinctive (not a generic dark+yellow AI portfolio template). Faster path from landing to "this person ships."

## Non-goals

- Resume parity. This is a portfolio, not a CV.
- Blog, case study CMS, or content marketing surface.
- Auth, backend, or any server-side state.
- Light-mode toggle.

## Audience & positioning

**Personas:**
1. Indian startup PM hiring managers — want speed of execution and ownership signals.
2. Global/FAANG recruiters — screen on outcome metrics and scope.
3. AI-focused company founders / hiring leads — screen on AI tool fluency and ability to ship without engineers.

**Core positioning line:**
> I don't just write PRDs. I ship prototypes.

**Subtitle:**
> Most PMs document. I use AI as execution infrastructure — Replit, Lovable, Bolt, Claude — to ship working products before the spec is written.

This is the weapon. Every other element on the page reinforces it.

## Information architecture

Single-page layout, top to bottom:

1. **Hero** — name, tagline, subtitle, outcome stats, "Built with" tool strip, primary CTAs (Email, Resume, LinkedIn)
2. **Projects** — three cards: Rapido Smart Commute (interactive prototype), SchemeWise (live), LabDecode (live)
3. **Recruiter CTA block** — "Looking for a PM who ships?" with Email / Resume / LinkedIn buttons
4. **Footer** — email, LinkedIn, GitHub

**Removed from previous version:** Experience section. Decision: portfolio is project-first, not resume-shaped. UKG outcomes surface as stats in the hero, not a section.

**Routing:** Each project card links to a dedicated detail page (`/projects/:id`). Detail pages are the second read for recruiters who are already interested. The Rapido card opens its interactive prototype; SchemeWise and LabDecode cards include a direct **"Try Live ↗"** CTA that bypasses the detail page entirely.

## Visual design

**Theme:** Elevated dark. Yellow used sparingly (2–3 accent points max), never as a wash.

**Tokens** (CSS custom properties):
```
--bg:        #09090b
--surface:   #111116
--border:    rgba(255,255,255,0.06)
--text-1:    #f4f4f5
--text-2:    #a1a1aa
--text-3:    #52525b
--accent:    #FFD400  (yellow)
--accent-2:  #FF8C00  (orange)
--green:     #4ade80  (live indicators)
```

**Typography:**
- Display: Sora (hero name, section headers)
- Body: DM Sans
- Mono: JetBrains Mono (stats, tool strip, ghost numerals)

**Card cover treatment:**
Each project card has a 140px cover area. SchemeWise and LabDecode (no native UI to screenshot) use **ghost numerals** — oversized 120px JetBrains Mono digits at 0.055 opacity (01 / 02 / 03) — as the primary visual. A 2px top accent bar carries the project's color: yellow→orange gradient (Rapido), orange (SchemeWise), teal→green (LabDecode). This solves the "no thumbnail" problem without stock images and reads as intentional editorial design.

**Hero layout:** Single column. Larger typography owns the space. No filler cards on the right. (Earlier 3-card preview was rejected.)

## Components

| Component | Purpose | Notes |
|---|---|---|
| `Hero` | Tagline, subtitle, stats row, tool strip, CTAs | Single-column, mobile-first |
| `StatRow` | 3 outcome stats | "2 live products", "−50% bugs · UKG Learning", "+22% CSAT · admin workflows" |
| `BuiltWithStrip` | AI tool fluency signal | Claude, Replit, Lovable, Bolt, Emergent, Cursor — colored dot + name |
| `ProjectCard` | Project teaser | Ghost numeral cover, title, company, one-line outcome, "Try Live ↗" badge if applicable |
| `RecruiterCTA` | Conversion block | "Looking for a PM who ships?" + Email / Resume / LinkedIn buttons |
| `Footer` | Minimal contact | Email, LinkedIn, GitHub |
| `ProjectDetail` | Per-project detail page | Existing detail components — to be re-themed in implementation phase |
| `MobilePrototype` (Rapido) | Interactive canvas-based mock | Existing component, kept as-is |

## Data

Project data structure (unchanged from current):
```js
{
  id: "schemewise",
  title: "SchemeWise",
  company: "Personal",
  color: "#FF6B2B",
  liveUrl: "https://schemewise-one.vercel.app/",
  outcome: "...",            // one-line outcome for the card
  number: "02",              // ghost numeral
  // detail page fields unchanged
}
```

Profile data adds:
```js
PROFILE.cta = {
  email: "...",
  linkedin: "...",
  resumeUrl: "/resume.pdf"   // file added later
}
```

## Responsive behavior

Mobile-first. Breakpoints:
- `<640px` — single column everything, hero stats stack vertically, cards full-width
- `640–1024px` — projects in 2-column grid, hero stats inline
- `≥1024px` — projects in 3-column grid, hero typography scales up

No fixed pixel minimum widths anywhere. No font sizes below 12px. Tap targets ≥44px.

## Tech approach

**Stack changes:**
- Add Tailwind CSS via the **Surgical Tailwind Migration** path (Option 1, approved):
  - Install Tailwind + PostCSS, configure with the design tokens above as theme extensions.
  - Migrate component-by-component: hero first, then project cards, then detail pages.
  - Inline-style code stays functional throughout the migration; no big-bang rewrite.
- Add **React Router** for `/`, `/projects/:id`. Replaces the current `useState`-based view switching. Enables shareable project URLs (critical for recruiter sharing).
- Add **OpenGraph meta tags** in `index.html` so links unfurl properly in LinkedIn/Slack/email.
- Analytics: defer (Plausible recommended when ready).

**File structure target** (post-migration):
```
src/
  App.jsx                  # router shell, ~50 lines
  pages/
    Home.jsx
    ProjectDetail.jsx
  components/
    Hero.jsx
    ProjectCard.jsx
    BuiltWithStrip.jsx
    RecruiterCTA.jsx
    Footer.jsx
    MobilePrototype.jsx    # existing, moved
    SimulatedMap.jsx       # existing, moved
  data/
    profile.js
    projects.js
  styles/
    tokens.css             # CSS custom properties
```

The current 1067-line `App.jsx` is split because it's doing too much — single-file works for v1 but blocks the Tailwind migration and makes the detail-page refactor painful.

## Error handling & edge cases

- Resume PDF missing → CTA button stays visible but links to `/resume.pdf`; spec ships without the file. Add file before launch.
- Live URLs go down → "Try Live" button still rendered (links are hardcoded); no runtime probing.
- JS disabled → no fallback. Acceptable for this audience.
- Slow network → fonts use `font-display: swap`; ghost numerals are text, not images.

## Testing

- Manual responsive QA at 375px / 768px / 1280px / 1920px
- Lighthouse pass: target ≥95 perf, ≥95 a11y on mobile
- Real-device check on iPhone Safari and Android Chrome
- Link unfurl check via LinkedIn Post Inspector after deploy
- No automated tests for this scope — it's a static portfolio

## Open questions (resolved)

- ~~Experience section?~~ Removed.
- ~~Hero right-side filler?~~ Single column only.
- ~~Card thumbnails?~~ Ghost numerals.
- ~~Resume link?~~ Add later, button ships now.
- ~~Tailwind?~~ Yes, surgical migration.

## Out of scope for this spec

- Detail page redesign content (the *layout* will follow the same token system; full detail-page content design is a follow-up if needed)
- Resume PDF creation
- Analytics integration
- Custom domain / DNS changes
