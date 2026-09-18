# HAH Sensory — Design System

A general-purpose, Thai-first design system branded as **HAH Sensory**. It gives design agents the tokens, components and full-screen UI kit patterns to build on-brand interfaces and assets — for any kind of product, not just HR. The repo includes a full HRM (Human Resource Management) demo app — leave management, approvals, attendance, employee directory — as a worked example of applying the system end to end; it's an illustration, not a scope limit.

> **HAH Sensory is a working product brand created for this design system.** The brand name, logo and voice are original to this system. The **component & motion foundation** is adapted from the open-source **beUI** library (see Sources).

---

## Sources & provenance

This system was built by reading the following repository. The reader is encouraged to explore it to build richer, more accurate designs:

- **beUI v2 — `starc007/ui-components`** · https://github.com/starc007/ui-components · live at https://beui.dev
  A copy-the-source React motion-component library (Next.js 15, React 19, Tailwind 4, Framer Motion). We lifted its **foundational conventions** verbatim: the OKLCH neutral-mono colour model, the strong easing/spring motion tokens (`lib/ease.ts`), glass surfaces, press-feedback feel, and the Button/Switch/Tabs/Tooltip interaction patterns. beUI's source endpoints for agents: `https://beui.dev/llms.txt`, `https://beui.dev/r/{slug}`.

What is **original to HAH Sensory** (not from beUI): the brand identity (name, mark, wordmark), the Thai-first typography, the generic semantic colour system (success/warning/danger/info/neutral), the full token system, every component's class-based styling, and the HRM demo application UI kit.

---

## What's in the demo app

`ui_kits/hr-demo/` is an HRM suite built with the design system, used to prove out the tokens/components in a real, full-screen product. The surfaces it covers:

- **Self-service dashboard** — leave balances, today's attendance, pending approvals, recent requests.
- **Leave** — request flow (type, dates, duration, reason) with live balance feedback.
- **Approvals** — manager inbox to review/approve/reject team leave, with a detail drawer.
- **People** — searchable, filterable employee directory.
- *(Evaluation, Reports, Settings are stubbed in the kit — extend as needed.)*

---

## Content fundamentals

**Language:** Thai-first, with Latin for names/IDs/data. The audience is Thai office/business software users generally — the microcopy examples below happen to be drawn from the included HR demo, but the same tone rules apply to any product built with this system.

**Tone:** Polite, clear, calm and action-first. HAH Sensory speaks like a helpful colleague, not a bureaucratic system.

- **Address the user directly** — "คุณมีวันลาคงเหลือ 8 วัน" (you have 8 days left), not impersonal system-speak.
- **Plain words over jargon** — say "ส่งคำขอลา" (submit leave request), not "ดำเนินการธุรกรรม" (process transaction). Say "อนุมัติคำขอ" not "ทำการอนุมัติรายการ".
- **Confirmations are warm and concrete** — "ส่งคำขอลาแล้ว รอการอนุมัติ" / "✓ อนุมัติคำขอแล้ว". State what happened and what's next.
- **Errors are specific and kind** — "รูปแบบเลขบัตรประชาชนไม่ถูกต้อง", never "ERROR: invalid input".
- **Casing:** Latin UI labels use sentence case, not Title Case. Thai needs no casing.
- **Numbers & dates:** Buddhist Era years are common in Thai business contexts (2568 = 2025). Use tabular figures (Google Sans Code) for any aligned numeric data. Thai month abbreviations (ก.ค.) in compact contexts.
- **Emoji:** used **sparingly** — a single friendly emoji in a greeting or success toast (👋, ✓, 🎉) is fine. Never decorate every label or use emoji as functional icons (that's Lucide's job).

**Microcopy examples (do):** "ขอลา" · "รออนุมัติ" · "ดูทั้งหมด" · "เหตุผลการลา" · "วันลาคงเหลือของฉัน"

---

## Visual foundations

**Overall vibe:** calm, trustworthy "office software" — high legibility, low decoration, generous whitespace. Not a flashy marketing aesthetic. The single teal brand accent does the emotional work; everything else is quiet neutral.

- **Colour model:** OKLCH throughout, for perceptually-even ramps (inherited from beUI). See `tokens/colors.css`.
- **Brand colour:** a single **teal** — `--brand-500` `oklch(57% 0.110 190)`. Used for primary actions, active nav, focus rings, key data. Teal reads as calm, healthy, dependable — apt for trustworthy business/office software generally. Tints (`--brand-50/100`) back active states and soft buttons.
- **Neutrals:** a cool-tinted grey ramp (`--ink-*`, hue 250) for text and lines. Text is near-black `--ink-950`, never pure black.
- **Surfaces:** app background is a faint cool grey `--surface-app`; cards are **white** `--surface-card` and lift off it with a soft shadow. Sunken wells use `--surface-sunken`. (Note: this inverts beUI's card-darker-than-bg choice in favour of a conventional app look.)
- **Semantic status:** generic tokens — `--status-success` (green), `--status-warning` (amber), `--status-danger` (red), `--status-info` (blue), `--status-neutral` (grey). Each has a solid fill, a soft tint background, and a readable text colour. The HR demo maps these to states like approved/pending/rejected/on-leave, but any product can map its own states onto the same five tones. **Map tone to meaning consistently** within whatever product you build.
- **Typography:** **Google Sans** for all UI — one voice for Thai + Latin, in two optical sets: **Google Sans** (`--font-display`) for large text ≥17px (headings, titles, display numbers) and **Google Sans Text** (`--font-sans`) for body/UI <17px; **Google Sans Code** for numerals, IDs, codes, time ranges. Compact, dense scale tuned for tables and forms. Body is 14px. See `tokens/typography.css`.
- **Spacing:** 4px base grid. Comfortable but dense — this is a data product.
- **Corner radii:** small-to-moderate. Controls/cards `8–12px`; pills (badges, tabs, switches) fully rounded. Nothing sharp, nothing bubbly.
- **Borders & lines:** hairline, low-opacity ink (`--border-subtle` at 8%). Dividers do the structural work; heavy borders are avoided.
- **Elevation:** soft, cool-tinted, low-spread shadows (`--shadow-sm/md/lg`). Cards use `sm`; drawers/modals use `xl`. No hard or coloured drop shadows.
- **Cards:** white surface + 1px subtle border + `radius-lg` (12px) + `shadow-sm`. `interactive` cards lift to `shadow-md` on hover.
- **Backgrounds:** flat colour. No gradients, no photography, no illustration in chrome. An optional faint **dotted grid** (`.grid-dots`) backs empty states/hero panels only. (beUI's `grid-noise` line grid and `glass` surfaces are available for overlay chrome like sticky topbars.)
- **Transparency / blur:** used only for layered chrome — the sticky topbar uses a translucent card colour + `blur(10px)`; drawer scrims use a light blur. Not used decoratively.
- **Motion:** strong custom easing — `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` for most transitions, `--ease-drawer` for sliding panels, springs for thumbs/indicators (from beUI). Durations: press ~120ms, hover/colour ~180ms, panels ~260ms. Exits faster than entrances. Animate transform/opacity only. Everything respects `prefers-reduced-motion`.
- **Hover states:** surfaces shift to `--surface-hover` (a touch darker); ghost buttons gain a faint fill; cards raise their shadow. Subtle, never jarring.
- **Press states:** controls scale to `0.97` (`.press` / built into buttons). Tactile, brief.
- **Focus:** a 3px brand-tinted ring (`--shadow-focus`) on `:focus-visible`. Always visible for keyboard users.

---

## Iconography

- **System:** **Lucide** (https://lucide.dev) — the same clean, 2px-stroke, rounded-cap family beUI uses (beUI's `icons.tsx` follows the Lucide aesthetic). Loaded from CDN in cards and the UI kit: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`, then `lucide.createIcons()`.
- **Why a substitution flag:** beUI hand-rolls a tiny set of inline SVGs in Lucide's style rather than shipping the full library. We adopt **Lucide proper** from CDN for full coverage. *If you need pixel-identical parity with beUI's bespoke icons, copy them from `components/app/icons.tsx` in the source repo.*
- **Usage:** stroke icons at 16–18px in UI, `currentColor` so they inherit text/brand colour. Icons are functional, not decorative — pair with text labels except in dense toolbars (where a `Tooltip` supplies the label). Icons used in the HR demo: `palmtree` (leave), `inbox` (approvals), `users` (people), `clipboard-check` (evaluation), `user-check`/`user-x` (attendance), `clock` (pending) — pick whatever Lucide icons fit your own product's actions.
- **Emoji vs icons:** emoji are occasional tone (greetings, success) — never functional UI icons. No icon-font glyphs, no Unicode symbols as icons.
- **Logo:** the real HAH Sensory photo (`assets/hah-sensory.jpg`), referenced directly wherever a logo is shown (e.g. the demo app sidebar). There is no separate mark/wordmark asset — see the Index below.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import` manifest only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (spacing/radius/elevation/motion/layout), `base.css` (resets + utilities), `components.css` (component class styles).
- `assets/` — `hah-sensory.jpg`, the one HAH Sensory logo photo. Consumers (e.g. `ui_kits/hr-demo/Shell.jsx`) reference it directly with an `<img>` tag — there's no separate mark/wordmark SVG to keep in sync.
- `SKILL.md` — Agent-Skills-compatible entry for using this system in Claude Code.

**React adapters** (`window.HAHSensoryDS.*`, preview/demo only — see each `*.prompt.md` for usage)
- `adapters/react/forms/` — Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch
- `adapters/react/data-display/` — Badge, Tag, Avatar (+ AvatarGroup), Card (+ CardHeader, CardBody), StatCard, ProgressBar
- `adapters/react/feedback/` — Alert, Tooltip
- `adapters/react/navigation/` — Tabs

**UI kits**
- `ui_kits/hr-demo/` — the HR demo application (one worked example, not the system's scope): `index.html` (interactive shell + nav) composing `Shell.jsx`, `Dashboard.jsx`, `LeaveRequest.jsx`, `Approvals.jsx`, `People.jsx`, with `kit.css` for shell/table/drawer layout.

**Specimen cards** (Design System tab) — `guidelines/*.card.html` (Colors, Type, Spacing, Brand) + one card per component directory.

---

## Using the system

Consumers link the one stylesheet and read components from the global namespace:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Badge, Card } = window.HAHSensoryDS;
</script>
```

The bundle (`_ds_bundle.js`) and manifest are generated automatically — never edit them by hand.

---

## Caveats

- **Fonts** are loaded from **Google Fonts** (Google Sans, Google Sans Text, Google Sans Code) via `@import` in `tokens/fonts.css`, not shipped as binaries. Swap for licensed/self-hosted files if you need offline use. Both Google Sans optical sets carry Thai + Latin coverage. **Google Sans replaces beUI's Inter** (and the earlier Anuphan substitution) to gain Thai coverage in one consistent voice.
- **Icons** use Lucide from CDN (see Iconography) rather than beUI's bespoke inline set.
