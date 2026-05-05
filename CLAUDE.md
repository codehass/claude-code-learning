# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server with HMR
npm run build    # production build to dist/
npm run preview  # preview production build
npm run lint     # run ESLint
```

## Stack

- **React 19** (JSX, no TypeScript) + **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — configured entirely in `src/index.css` using `@theme` (no `tailwind.config.js`)
- **framer-motion** for animations, **lucide-react** for icons, **react-syntax-highlighter** for code blocks

## Architecture

The app is a single-page interactive learning guide for Claude Code. All content is data-driven from two files:

- `src/data/slidesData.js` — defines three levels (Beginner / Intermediate / Advanced), each with an array of `lessons` and a `quiz`. Each lesson has a `demoType` of either `"terminal"` or `"liveCode"`, with a corresponding `terminalSequence` or `liveCode` payload.
- `src/data/commands.js` — flat arrays (`commandsData`, `shortcutsData`) used exclusively by `ResourceHub`.

**State lives entirely in `App.jsx`**: current level index, current lesson index, how many levels are unlocked, and whether the quiz overlay is active. Navigation flows are: lesson → lesson → quiz → next level unlock.

**Component responsibilities:**
- `Sidebar` — progress tree driven by `slidesData`, receives navigation callbacks from App
- `TerminalSimulation` — step-through animated terminal; each step is manually advanced via a Run button; resets independently
- `LiveCodeDemo` — static before/after diff viewer with a framer-motion reveal on the "after" panel
- `InteractiveQuiz` — single-question quiz gated between levels; calls `onComplete(passed)` back to App
- `ResourceHub` — floating button + modal overlay with searchable slash-command and keyboard-shortcut reference

## Theme / Custom Tokens

All custom colors are CSS variables declared in `src/index.css` under `@theme`:

| Token | Value | Usage |
|---|---|---|
| `dark-900` | `#0b090f` | Sidebar, deepest backgrounds |
| `dark-800` | `#120e18` | Card backgrounds |
| `dark-700` | `#1c1825` | Main page background |
| `brand-primary` | `#f2a8c6` | Innoby pink — accents, active states |
| `brand-secondary` | `#fcb8d1` | Lighter pink — text highlights |

Use `text-brand-primary`, `bg-brand-secondary`, etc. as standard Tailwind utilities.
