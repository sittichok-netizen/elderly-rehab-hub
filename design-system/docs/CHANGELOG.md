# Changelog

All notable changes to the HAH Sensory Design System are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-06-30

### Added — Design Tokens
- Full color system in OKLCH — brand teal `oklch(57% 0.110 190)`, ink scale (50–950), surface layers, semantic status colors (success/warning/danger/info/neutral)
- Typography scale: 10-step `--text-*` ramp (xs → 4xl), font-weight `--fw-*`, letter-spacing `--tracking-*`, line-height `--leading-*`
- Spacing scale: `--space-1` through `--space-20` + semantic aliases (`--pad-card`, `--pad-page`)
- Radius tokens: `--radius-xs` → `--radius-full`
- Z-index scale: `--z-base` → `--z-toast`
- Duration & easing tokens: `--dur-base`, `--dur-moderate`, `--dur-slow`, `--ease-out`, `--ease-drawer`
- Shadow tokens: `--shadow-xs` → `--shadow-xl`, `--shadow-focus`
- Google Sans / Google Sans Text / Google Sans Code via Google Fonts
- `prefers-reduced-motion` applied at token level (`tokens/base.css`) and on animated components

### Added — Components (22 total)
| Component | Base class | Variants |
|-----------|------------|---------|
| Button | `sensory-btn` | `is-primary` `is-secondary` `is-ghost` `is-danger` `is-brand-soft` + `is-sm` `is-md` `is-lg` `is-block` |
| Icon Button | `sensory-iconbtn` | `is-sm` `is-md` `is-lg` |
| Badge | `sensory-badge` | `tone-neutral/brand/success/warning/danger/info` `is-solid` |
| Tag | `sensory-tag` | — |
| Avatar | `sensory-avatar` | `is-xs/sm/md/lg` + `sensory-avatar-status` + `sensory-avatar-group` |
| Card | `sensory-card` | `is-flat` `is-interactive` + `sensory-card-pad` `sensory-card-header` `sensory-card-title` |
| StatCard | `sensory-stat` | `.stat-label` `.stat-value` `.stat-delta.up/down` |
| Alert | `sensory-alert` | `tone-info/success/warning/danger` |
| Input | `sensory-input` | `is-sm` `is-md` `is-lg` + `sensory-input-wrap` + `.lead-icon` `.trail-icon` |
| Textarea | `sensory-textarea` | — |
| Select | `sensory-select` | `is-sm` `is-md` `is-lg` |
| Field | `sensory-field` | `sensory-label` `sensory-hint` |
| Checkbox | `sensory-check` | `is-radio` `is-disabled` + `.box` child required |
| Switch | `sensory-switch` | `is-disabled` + `.track` > `.thumb` children required |
| Tabs | `sensory-tabs` | `is-pill` `is-underline` + `sensory-tab` `is-active` `.tab-count` |
| Table | `sensory-table` | `is-compact` |
| Progress | `sensory-progress` | `tone-success/warning/danger` + `.fill` child required |
| Drawer | `sensory-drawer` | + `sensory-drawer-scrim` `sensory-drawer-head` `sensory-drawer-body` `sensory-drawer-foot` |
| Modal | `sensory-modal` | `is-sm` `is-lg` + `sensory-modal-scrim` `sensory-modal-head` `sensory-modal-body` `sensory-modal-foot` |
| Toast | `sensory-toast` | `tone-success/warning/danger/info` |
| Dropdown | `sensory-dropdown` | `is-right` + `sensory-dropdown-item` |
| Tooltip | `sensory-tooltip-wrap` | + `sensory-tooltip` |

### Added — Behavior Layer (`sensory-ui.js`)
- Dependency-free, ~300-line Vanilla JS module
- Auto-init on `DOMContentLoaded` — no manual call required
- Data-attribute API: `data-drawer-open/close/scrim`, `data-modal-open/close/scrim`, `data-sensory-dropdown`
- Programmatic API: `SensoryUI.tabs()`, `SensoryUI.drawer.open/close()`, `SensoryUI.modal.open/close()`, `SensoryUI.toast()`, `SensoryUI.dropdown.close()`
- A11y: Escape-to-close on all overlays, focus trap in modal/drawer, `aria-expanded`/`aria-selected` management
- `data-sensory-wired` guard — `init()` is idempotent; safe to call from multiple scripts

### Added — Documentation & Tooling
- Static docs site: `examples/docs/` (no React, no bundler)
- Vanilla HR dashboard example: `examples/vanilla-dashboard/`
- 14 HTML snippets: `snippets/` (button, badge, card, alert, input, select, checkbox, radio, switch, tabs, table, drawer, modal, dropdown)
- `docs/USAGE_VANILLA.md` — production deployment guide (Cloudflare Pages / any static host)
- `docs/VIBE_CODING_GUIDE.md` — AI-assisted development reference
- `docs/COMPONENT_CONTRACTS.md` — full class contract for all 22 components
- `docs/PROMPT_TEMPLATES.md` — ready-made prompts for AI page generation
- `docs/CONTRIBUTING.md` — contribution guide
- `docs/QUALITY_CHECKLIST.md` — pre-merge quality gate

---

## Versioning Scheme

`MAJOR.MINOR.PATCH`

| Type | When to bump | Examples |
|------|-------------|---------|
| `PATCH` | Bug fix, docs/snippet update, visual tweak with no class changes | Fix checkbox padding, correct typo in snippet |
| `MINOR` | New component, new variant, new token group, new snippet | Add Tooltip component, add `is-xl` size to Button |
| `MAJOR` | **Breaking** — rename/remove a class or CSS variable, restructure token file | Rename `sensory-*` prefix, remove deprecated variant |

> **Rule:** never rename a `sensory-*` class or `--*` CSS variable in a `PATCH` or `MINOR` release.  
> Any rename is a `MAJOR` bump, always with a migration note in this file.
