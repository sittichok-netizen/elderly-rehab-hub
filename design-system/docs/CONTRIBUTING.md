# Contributing to HAH Sensory Design System

---

## When to add a new token

Add a token when a value is used in **3 or more places** and has a clear semantic meaning.

| Situation | Do |
|-----------|-----|
| Color used in 3+ components for the same purpose | Add to `tokens/colors.css` with a semantic name |
| Spacing value repeated in 3+ components | Use existing `--space-*` scale; add alias only if semantically distinct |
| Duration/easing used in 2+ animations | Add to `tokens/base.css` |
| One-off value for a single component | Use inline or component-local CSS — **do not tokenize** |

**Never hardcode** hex, rgb, or numeric px values in `components.css`. Every color must reference a CSS variable.

---

## When to add a new component

Add a component to `tokens/components.css` when:
- It appears in **2+ pages** of the HR product
- It has **consistent visual behavior** (not just a layout wrapper)
- It cannot be composed from existing classes without hacks

Before adding, check `COMPONENT_CONTRACTS.md` — the component may already exist under a different name.

---

## Naming conventions

| Thing | Pattern | Example |
|-------|---------|---------|
| Component base class | `sensory-{name}` | `sensory-modal` |
| Variant modifier | `is-{variant}` | `is-primary`, `is-lg`, `is-active` |
| Tone/color modifier | `tone-{tone}` | `tone-success`, `tone-warning` |
| Internal child element | unprefixed, flat | `.box`, `.track`, `.thumb`, `.fill` |
| JS data attribute | `data-sensory-{action}` | `data-sensory-dropdown`, `data-drawer-open` |
| JS state attribute | `data-sensory-wired` | idempotency guard — do not remove |

**Do not** create modifier classes with `--`, camelCase, or BEM double-underscore. The system uses single-class modifiers.

---

## Adding a component — checklist

When you add or modify a component, you must update all of these before merging:

- [ ] CSS added to `tokens/components.css` under its named section comment
- [ ] Default state works without any modifier class (no hidden required props)
- [ ] All modifiers/variants documented in `docs/COMPONENT_CONTRACTS.md`
- [ ] HTML snippet added (or updated) in `snippets/{name}.html`
  - Includes: base example, all major variants, disabled/error state, A11y notes
- [ ] Section added (or updated) in `examples/docs/index.html`
  - Sidebar nav link added
  - Preview and code block both present
- [ ] `docs/CHANGELOG.md` updated under `[Unreleased]` or new version entry
- [ ] `prefers-reduced-motion` covered if the component has CSS transitions
- [ ] Keyboard interaction documented in snippet if interactive

---

## Modifying a token

**Changing a value** (e.g., adjusting `--space-4` from 16px to 14px) is a **PATCH** if visual-only with no layout impact, **MINOR** if it shifts spacing across many pages.

**Renaming a token** is **always MAJOR** — add a migration note to `CHANGELOG.md` and keep the old name as a deprecated alias for one version.

---

## Updating `sensory-ui.js`

- Keep the file dependency-free (no imports, no `npm` packages)
- All new interactive components must use the `data-sensory-wired` guard to prevent double-listener registration
- New behavior must be exposed on the `SensoryUI` global object
- Test: open `examples/docs/` without the dev server (plain `file://`) — if it breaks, the script has a path dependency
- Test keyboard: Tab → Enter/Space to trigger, Escape to close, focus returns to trigger

---

## What not to do

- **Do not** add `!important` to `components.css`
- **Do not** use `z-index` values outside the `--z-*` token scale
- **Do not** reference `_ds_bundle.js` or React from any Vanilla file
- **Do not** commit `.jsx` components to `tokens/` or `snippets/`
- **Do not** add a new Google Font without checking Thai glyph coverage
- **Do not** merge without running through `docs/QUALITY_CHECKLIST.md`
