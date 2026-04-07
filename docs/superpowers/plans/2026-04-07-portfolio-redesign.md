# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild harshitmittal.in as a recruiter-conversion-focused, mobile-first portfolio with the v5 design (project-first IA, ghost-numeral cards, "ship prototypes" positioning, recruiter CTAs, surgical Tailwind migration).

**Architecture:** Split the monolithic 1067-line `App.jsx` into a router shell with `pages/` and `components/` directories. Add Tailwind CSS configured against the design tokens from the spec. Add React Router for shareable `/projects/:id` URLs. Keep the existing `MobilePrototype` and `SimulatedMap` canvas components — only their containers get re-themed.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, React Router 6, custom CSS variables for tokens.

**Reference:**
- Spec: `docs/superpowers/specs/2026-04-07-portfolio-redesign-design.md`
- Locked mockup: `.superpowers/brainstorm/42491-1775496161/content/homepage-v5.html`

**Conventions:**
- No automated tests (per spec). Each task ends with a **manual visual check** at `http://localhost:5173` and a commit.
- Run `npm run dev` once at the start; Vite hot-reloads after each change.
- Commit after every task. No batching.

---

## Task 0: Baseline snapshot

**Files:** none (read-only)

- [ ] **Step 1: Confirm clean working tree**

Run: `git status`
Expected: `nothing to commit, working tree clean`. If not, stop and ask.

- [ ] **Step 2: Start dev server in background**

Run: `npm install && npm run dev`
Expected: Vite serves on `http://localhost:5173`. Open it in a browser and confirm the current portfolio loads. Leave the dev server running for the rest of the plan.

- [ ] **Step 3: Note the current `App.jsx` line count**

Run: `wc -l src/App.jsx`
Expected: ~1067 lines. Record the number — Task 11 will verify the file is gone or much smaller.

---

## Task 1: Install Tailwind CSS and React Router

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/styles/tokens.css`
- Create: `src/styles/index.css`
- Modify: `src/main.jsx`

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
npm install react-router-dom@^6.22.0
```
Expected: installs succeed, `package.json` updated.

- [ ] **Step 2: Generate Tailwind config**

Run: `npx tailwindcss init -p`
Expected: creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 3: Configure Tailwind content paths and theme tokens**

Replace `tailwind.config.js` with:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        surface: "#111116",
        border: "rgba(255,255,255,0.06)",
        "text-1": "#f4f4f5",
        "text-2": "#a1a1aa",
        "text-3": "#52525b",
        accent: "#FFD400",
        "accent-2": "#FF8C00",
        green: "#4ade80",
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create token CSS file**

Create `src/styles/tokens.css`:
```css
:root {
  --bg: #09090b;
  --surface: #111116;
  --border: rgba(255, 255, 255, 0.06);
  --text-1: #f4f4f5;
  --text-2: #a1a1aa;
  --text-3: #52525b;
  --accent: #FFD400;
  --accent-2: #FF8C00;
  --green: #4ade80;
}
```

- [ ] **Step 5: Create Tailwind entry CSS**

Create `src/styles/index.css`:
```css
@import "./tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    background: var(--bg);
    color: var(--text-1);
    font-family: '"DM Sans"', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body {
    margin: 0;
    min-height: 100vh;
  }
}
```

- [ ] **Step 6: Import the stylesheet from main.jsx**

Read `src/main.jsx`. Add this line at the top, after existing imports:
```js
import "./styles/index.css";
```

- [ ] **Step 7: Visual check**

Open `http://localhost:5173`. Page may look different (Tailwind preflight resets margins/fonts) but should still render. No console errors. Background should already be near-black.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tailwind.config.js postcss.config.js src/styles/ src/main.jsx
git commit -m "chore: add Tailwind CSS and React Router"
```

---

## Task 2: Add Google Fonts and OpenGraph meta tags

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Read current index.html**

Read `index.html` so the next edit is unique.

- [ ] **Step 2: Replace `<head>` content**

Replace the entire `<head>` block in `index.html` with:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Harshit Mittal — PM who ships prototypes</title>
  <meta name="description" content="Senior Product Manager using AI as execution infrastructure. I don't just write PRDs — I ship working prototypes." />

  <!-- OpenGraph -->
  <meta property="og:title" content="Harshit Mittal — PM who ships prototypes" />
  <meta property="og:description" content="Senior PM using Claude, Replit, Lovable, Bolt to ship working products before the spec is written." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://harshitmittal.in" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Harshit Mittal — PM who ships prototypes" />
  <meta name="twitter:description" content="Senior PM using Claude, Replit, Lovable, Bolt to ship working products before the spec is written." />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
</head>
```

- [ ] **Step 3: Visual check**

Reload `http://localhost:5173`. Confirm fonts are loaded (DM Sans should now be the body font). Tab title updates.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add OG tags and Google Fonts"
```

---

## Task 3: Extract data files

**Files:**
- Create: `src/data/profile.js`
- Create: `src/data/projects.js`

- [ ] **Step 1: Create profile data file**

Create `src/data/profile.js`:
```js
export const PROFILE = {
  name: "Harshit Mittal",
  role: "Senior Product Manager",
  tagline: "I don't just write PRDs. I ship prototypes.",
  subtitle: "Most PMs document. I use AI as execution infrastructure — Replit, Lovable, Bolt, Claude — to ship working products before the spec is written.",
  stats: [
    { value: "2", label: "live products", note: "shipped solo" },
    { value: "−50%", label: "bugs", note: "UKG Learning" },
    { value: "+22%", label: "CSAT", note: "admin workflows" },
  ],
  builtWith: [
    { name: "Claude", color: "#D97757" },
    { name: "Replit", color: "#F26207" },
    { name: "Lovable", color: "#FF4D8B" },
    { name: "Bolt", color: "#3B82F6" },
    { name: "Emergent", color: "#10B981" },
    { name: "Cursor", color: "#A1A1AA" },
  ],
  cta: {
    email: "mailto:harshit.mittal.work@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshit-mittal-/",
    github: "https://github.com/harshit-mittal",
    resumeUrl: "/resume.pdf",
  },
};
```

> **Note:** Replace email/linkedin/github URLs with the real ones from the existing `App.jsx` PROFILE object before committing — read `src/App.jsx` lines 1-50 first and copy any verified contact strings. If unsure, leave the placeholders and flag at the end of the task.

- [ ] **Step 2: Create projects data file**

Read the current `PROJECTS` array in `src/App.jsx` (lines 28–166). Copy it verbatim into `src/data/projects.js` as a named export, and add three new fields per project:

```js
// At the top of each project object, add:
//   number: "01" | "02" | "03",
//   outcome: "<one-line outcome for the card>",
//   accentBar: "<gradient or solid CSS>",

export const PROJECTS = [
  {
    id: "smart-commute",
    number: "01",
    outcome: "Cuts time-to-booking from 12s → 3s for daily commuters.",
    accentBar: "linear-gradient(90deg, #FFD400, #FF8C00)",
    // ...rest of existing fields copied verbatim
  },
  {
    id: "schemewise",
    number: "02",
    outcome: "AI guide to every Indian government savings scheme.",
    accentBar: "#FF6B2B",
    // ...rest
  },
  {
    id: "labdecode",
    number: "03",
    outcome: "Plain-language translation of any lab report.",
    accentBar: "linear-gradient(90deg, #0F766E, #4ade80)",
    // ...rest
  },
];
```

- [ ] **Step 3: Visual check**

No UI change yet — just verify both files parse: `node -e "import('./src/data/projects.js').then(m => console.log(Object.keys(m.PROJECTS[0])))"` (or skip if dev server reload shows no errors).

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: extract profile and projects data into modules"
```

---

## Task 4: Build the Hero component

**Files:**
- Create: `src/components/Hero.jsx`

- [ ] **Step 1: Create Hero.jsx**

Create `src/components/Hero.jsx`:
```jsx
import { PROFILE } from "../data/profile";

export default function Hero() {
  return (
    <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-content mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-text-2 uppercase">
            {PROFILE.role} · Available for select roles
          </span>
        </div>

        {/* Tagline */}
        <h1 className="font-display font-bold text-text-1 leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {PROFILE.tagline}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-text-2 text-base md:text-lg leading-relaxed">
          {PROFILE.subtitle}
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
          {PROFILE.stats.map((s) => (
            <div key={s.label} className="border-l-2 border-border pl-4">
              <div className="font-mono text-3xl md:text-4xl text-accent font-bold">{s.value}</div>
              <div className="font-sans text-sm text-text-1 mt-1">{s.label}</div>
              <div className="font-mono text-xs text-text-3 mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={PROFILE.cta.email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-bg font-sans font-semibold text-sm hover:brightness-110 transition"
          >
            Email me
          </a>
          <a
            href={PROFILE.cta.resumeUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-sans font-semibold text-sm hover:bg-surface transition"
          >
            Resume ↓
          </a>
          <a
            href={PROFILE.cta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-sans font-semibold text-sm hover:bg-surface transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check (deferred)**

Component isn't mounted yet. Will verify in Task 8.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add Hero component"
```

---

## Task 5: Build the BuiltWithStrip component

**Files:**
- Create: `src/components/BuiltWithStrip.jsx`

- [ ] **Step 1: Create BuiltWithStrip.jsx**

Create `src/components/BuiltWithStrip.jsx`:
```jsx
import { PROFILE } from "../data/profile";

export default function BuiltWithStrip() {
  return (
    <section className="px-6 py-10 border-y border-border">
      <div className="max-w-content mx-auto flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="font-mono text-xs uppercase tracking-wider text-text-3">
          Built with
        </span>
        {PROFILE.builtWith.map((tool) => (
          <div key={tool.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: tool.color }}
            />
            <span className="font-mono text-sm text-text-2">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BuiltWithStrip.jsx
git commit -m "feat: add BuiltWithStrip component"
```

---

## Task 6: Build the ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.jsx`

- [ ] **Step 1: Create ProjectCard.jsx**

Create `src/components/ProjectCard.jsx`:
```jsx
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-text-3 transition">
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: project.accentBar }}
      />

      {/* Cover area with ghost numeral */}
      <Link to={`/projects/${project.id}`} className="block relative h-[140px] overflow-hidden">
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-bold pointer-events-none select-none"
          style={{ fontSize: "120px", color: "rgba(255,255,255,0.055)" }}
        >
          {project.number}
        </span>
        <span className="absolute top-4 left-5 font-mono text-xs text-text-3 tracking-wider">
          {project.number} / {project.company}
        </span>
        {project.liveUrl && (
          <span className="absolute top-4 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green/10 border border-green/30 font-mono text-[10px] text-green uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            Live
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="px-5 pt-5 pb-6">
        <Link to={`/projects/${project.id}`}>
          <h3 className="font-display font-bold text-xl text-text-1 group-hover:text-accent transition">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-text-2 leading-relaxed">
          {project.outcome}
        </p>

        {/* CTA row */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border font-sans text-xs text-text-1 hover:bg-bg transition"
          >
            Read case →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-green/10 border border-green/30 font-sans text-xs text-green hover:bg-green/20 transition"
            >
              Try Live ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.jsx
git commit -m "feat: add ProjectCard with ghost numeral cover"
```

---

## Task 7: Build RecruiterCTA and Footer components

**Files:**
- Create: `src/components/RecruiterCTA.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create RecruiterCTA.jsx**

Create `src/components/RecruiterCTA.jsx`:
```jsx
import { PROFILE } from "../data/profile";

export default function RecruiterCTA() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-content mx-auto bg-surface border border-border rounded-2xl px-8 py-14 md:px-14 md:py-20 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text-1">
          Looking for a PM who ships?
        </h2>
        <p className="mt-4 text-text-2 max-w-xl mx-auto">
          I'm open to senior PM roles where the bar is shipping working software, not slide decks.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={PROFILE.cta.email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-bg font-semibold text-sm hover:brightness-110 transition"
          >
            Email me
          </a>
          <a
            href={PROFILE.cta.resumeUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-semibold text-sm hover:bg-bg transition"
          >
            Resume ↓
          </a>
          <a
            href={PROFILE.cta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-semibold text-sm hover:bg-bg transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Footer.jsx**

Create `src/components/Footer.jsx`:
```jsx
import { PROFILE } from "../data/profile";

export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-mono text-xs text-text-3">
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
        <div className="flex gap-5 font-mono text-xs">
          <a href={PROFILE.cta.email} className="text-text-2 hover:text-accent transition">Email</a>
          <a href={PROFILE.cta.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition">LinkedIn ↗</a>
          <a href={PROFILE.cta.github} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition">GitHub ↗</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RecruiterCTA.jsx src/components/Footer.jsx
git commit -m "feat: add RecruiterCTA and Footer"
```

---

## Task 8: Assemble the Home page

**Files:**
- Create: `src/pages/Home.jsx`

- [ ] **Step 1: Create Home.jsx**

Create `src/pages/Home.jsx`:
```jsx
import Hero from "../components/Hero";
import BuiltWithStrip from "../components/BuiltWithStrip";
import ProjectCard from "../components/ProjectCard";
import RecruiterCTA from "../components/RecruiterCTA";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-1">
      <Hero />
      <BuiltWithStrip />

      <section id="projects" className="px-6 py-20">
        <div className="max-w-content mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-1">
              Selected Work
            </h2>
            <span className="font-mono text-xs text-text-3 uppercase tracking-wider">
              03 projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <RecruiterCTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: assemble Home page"
```

---

## Task 9: Move existing components and create the router shell

**Files:**
- Create: `src/components/SimulatedMap.jsx`
- Create: `src/components/MobilePrototype.jsx`
- Create: `src/pages/ProjectDetail.jsx`
- Modify: `src/App.jsx` (replace contents)

- [ ] **Step 1: Extract SimulatedMap into its own file**

Read `src/App.jsx` lines 174–293 (the `SimulatedMap` function). Copy that function verbatim into a new file `src/components/SimulatedMap.jsx`, prefix with `import { useEffect, useRef } from "react";` and append `export default SimulatedMap;`.

- [ ] **Step 2: Extract MobilePrototype into its own file**

Read `src/App.jsx` lines 295 onward and find the `MobilePrototype` function (and any helpers like `RIDE_OPTIONS` it depends on). Copy them into `src/components/MobilePrototype.jsx`. Add at the top:
```jsx
import { useState } from "react";
import SimulatedMap from "./SimulatedMap";
```
Append `export default MobilePrototype;` at the bottom.

The component keeps its existing inline-style implementation for now. The Tailwind migration of its internals is **out of scope for this plan** — only its container is re-themed by the parent page.

- [ ] **Step 3: Extract the existing detail view into ProjectDetail page**

Find the `ProjectDetail`, `SchemeWiseDetail`, and `LabDecodeDetail` components in the current `src/App.jsx`. Move them into `src/pages/ProjectDetail.jsx`. At the top, add:
```jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import MobilePrototype from "../components/MobilePrototype";
```

Wrap the existing detail rendering logic in a default export that resolves the project from the URL:
```jsx
export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="min-h-screen bg-bg text-text-1 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-text-3 text-sm mb-4">404 — project not found</p>
          <Link to="/" className="text-accent underline">Back to home</Link>
        </div>
      </main>
    );
  }

  // Existing detail rendering. Replace any onClick navigation
  // back to "home" view with: navigate("/")
  // Render SchemeWiseDetail / LabDecodeDetail / smart-commute branches
  // exactly as they were in App.jsx — only the routing changes.
  return (
    <main className="min-h-screen bg-bg text-text-1">
      {/* paste existing per-id detail rendering here */}
    </main>
  );
}
```

> **Note on scope:** The detail page **content and styling** are intentionally not redesigned in this plan. We only swap state-based navigation for URL-based navigation. A future plan can re-theme detail pages against the new tokens. Existing inline styles are kept verbatim.

- [ ] **Step 4: Replace App.jsx with router shell**

Read the current `src/App.jsx` so the next overwrite is unique. Replace its entire contents with:
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Visual check — Home page**

Reload `http://localhost:5173`. Confirm:
- Hero shows new tagline, subtitle, 3 stats, 3 CTA buttons
- "Built with" strip renders below hero
- 3 project cards in a grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card has a ghost numeral, title, outcome line
- SchemeWise and LabDecode cards show "Try Live ↗" badge
- Recruiter CTA block renders
- Footer renders

If anything is broken, fix it before commit.

- [ ] **Step 6: Visual check — Project detail pages**

Click "Read case" on each card. Each should navigate to `/projects/<id>` and render the existing detail content. Browser back button works. Refreshing on a detail URL still loads.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/components/SimulatedMap.jsx src/components/MobilePrototype.jsx src/pages/ProjectDetail.jsx
git commit -m "feat: split App.jsx into router shell with pages and components"
```

---

## Task 10: Mobile responsive QA pass

**Files:** none expected (fixes only if needed)

- [ ] **Step 1: Test at 375px width (mobile)**

In Chrome DevTools, switch to iPhone SE (375 × 667). Walk through:
- Home: hero typography readable, no horizontal scroll, stats stack vertically, CTAs wrap cleanly
- Projects: cards stack to 1 column, full width, ghost numeral still visible, "Try Live" button reachable
- Recruiter CTA block: padding looks right, buttons wrap
- Footer: stacks vertically
- Project detail: content scrolls, back nav works

- [ ] **Step 2: Test at 768px (tablet)**

Switch to iPad Mini. Confirm:
- Projects render in a 2-column grid
- Hero typography scales up
- Nothing overflows

- [ ] **Step 3: Test at 1280px (desktop)**

Confirm:
- Projects render in a 3-column grid
- Hero takes its full size
- Content max-width caps at ~1120px and centers

- [ ] **Step 4: Fix any issues found**

If anything broke at a breakpoint, fix it in the relevant component file. Common fixes:
- Add `flex-wrap` to button rows
- Add `break-words` to long titles
- Tweak padding (`px-4 md:px-6`)

- [ ] **Step 5: Commit (only if changes were made)**

```bash
git add -A
git commit -m "fix: responsive tweaks from QA pass"
```

---

## Task 11: Production build verification

**Files:** none

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: build succeeds with no errors. Bundle size reported.

- [ ] **Step 2: Preview the build**

Run: `npm run preview`
Open the preview URL. Walk through home + each project detail again. Confirm parity with dev.

- [ ] **Step 3: Confirm App.jsx shrunk**

Run: `wc -l src/App.jsx`
Expected: ≤30 lines (just the router shell). The original ~1067 lines have been redistributed.

- [ ] **Step 4: Lighthouse spot check**

Open the preview URL in Chrome, run Lighthouse on mobile mode. Targets from spec: ≥95 perf, ≥95 a11y. Note any score below target. If a11y is below 95, fix any contrast or missing-label issues found before final commit. Performance below 95 on a static React app usually means font-loading — acceptable to defer.

- [ ] **Step 5: Final commit**

If any fixes from Step 4:
```bash
git add -A
git commit -m "fix: a11y and Lighthouse fixes from QA"
```

Otherwise no commit needed.

---

## Self-review

**Spec coverage:**
- Tagline + subtitle → Task 4 (Hero)
- Outcome stats → Task 4 (Hero stats)
- Built With strip → Task 5
- Project-first IA + project cards with ghost numerals → Tasks 6, 8
- Try Live CTAs on cards → Task 6
- Recruiter CTA block → Task 7
- Footer → Task 7
- Tokens (CSS variables + Tailwind theme) → Task 1
- Tailwind surgical migration → Tasks 1–9 (new components Tailwind-only, legacy MobilePrototype stays inline-styled)
- React Router for shareable URLs → Tasks 1, 9
- OpenGraph meta → Task 2
- Mobile breakpoints → Task 10
- File restructure into pages/ + components/ + data/ → Tasks 3, 4–9
- Experience section removed → not in any task (already absent from new pages — verified)
- Detail page redesign → explicitly out of scope, called out in Task 9 Step 3

**Placeholder scan:** None — all code blocks are concrete.

**Type consistency:** `PROFILE.cta.email/linkedin/github/resumeUrl` used consistently in Hero, RecruiterCTA, Footer. `project.id/title/company/outcome/number/accentBar/liveUrl` used consistently in ProjectCard. `PROJECTS` exported from `src/data/projects.js`, imported by Home and ProjectDetail.

**Known caveat:** Task 9 Step 3 asks the engineer to relocate existing detail rendering "as-is." That's intentional — the spec scopes detail-page redesign as a follow-up. The relocation must preserve the existing per-project branches (smart-commute / schemewise / labdecode).
