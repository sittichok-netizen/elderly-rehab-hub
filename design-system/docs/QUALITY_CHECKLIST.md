# Quality Checklist

Run this checklist before merging any change to the design system.  
A failing item is a blocker — do not merge until resolved.

---

## 1. Visual — Desktop

Open `examples/docs/` and `examples/vanilla-dashboard/` at 1280px+.

- [ ] All components render without broken layout or missing visual elements
- [ ] No component appears with `0` height or `0` width when it should be visible
- [ ] Colors use `sensory-*` tokens — no hardcoded `#hex`, `rgb()`, or raw `oklch()` values in `components.css`
- [ ] Typography uses `var(--text-*)`, `var(--fw-*)` — no hardcoded `px` font sizes in components
- [ ] Spacing uses `var(--space-*)` — no hardcoded `margin`/`padding` px values in components
- [ ] Focus ring visible on all interactive elements (`Tab` through the page)
- [ ] Hover states visible on buttons, links, table rows, nav items
- [ ] Active/checked states correct: checkbox checked, switch on, tab active, badge tones

---

## 2. Visual — Mobile

Resize to 375px (iPhone viewport).

- [ ] Page does not scroll horizontally
- [ ] Sidebar collapses and mobile toggle works
- [ ] All components fit within viewport width
- [ ] Touch targets ≥ 44×44px for all interactive elements

---

## 3. Keyboard Navigation

Tab through the page without using a mouse.

- [ ] Every interactive element is reachable via `Tab`
- [ ] Focus indicator is clearly visible (not just the browser default outline)
- [ ] `Enter` / `Space` activates buttons and triggers
- [ ] `Escape` closes Drawer, Modal, Dropdown, and Toast
- [ ] `Tab` is trapped inside open Modal and Drawer (cannot Tab out to background)
- [ ] Focus returns to the trigger element after closing Modal / Drawer
- [ ] Tabs component: arrow keys navigate between tab items

---

## 4. Color Contrast

Use browser DevTools or a contrast checker on:

- [ ] Body text (`--text-body`) on `--surface-app` background: ≥ 4.5:1
- [ ] Heading text (`--text-heading`) on `--surface-card`: ≥ 4.5:1
- [ ] Muted text (`--text-muted`) on `--surface-app`: ≥ 3:1 (large text / UI components)
- [ ] White text on brand teal (`--brand`): ≥ 3:1
- [ ] Badge/Alert text on its soft background: ≥ 4.5:1
- [ ] Placeholder text on input background: ≥ 3:1

---

## 5. Reduced Motion

Add `@media (prefers-reduced-motion: reduce)` in browser DevTools and verify:

- [ ] Drawer slides in instantly (no transition)
- [ ] Modal fades in instantly
- [ ] Dropdown appears instantly
- [ ] Toast appears instantly
- [ ] Progress fill appears instantly
- [ ] No other component has a lingering animation

---

## 6. No One-Off Overrides

Search the codebase for anti-patterns:

```bash
# Should return 0 results in tokens/ and examples/
grep -rn "style=\"color:#\|style=\"background:#\|style=\"font-size:[0-9]" hr-design-system/project/tokens/
grep -rn "!important" hr-design-system/project/tokens/components.css
```

- [ ] Zero `!important` in `components.css`
- [ ] Zero hardcoded hex colors in component CSS
- [ ] No `z-index` values outside `var(--z-*)` in components

---

## 7. Docs & Snippets in Sync

For any component added or changed:

- [ ] `snippets/{component}.html` reflects the current class contract
- [ ] `examples/docs/index.html` preview and code block both updated
- [ ] `docs/COMPONENT_CONTRACTS.md` table row updated
- [ ] `docs/CHANGELOG.md` has an entry

---

## 8. JavaScript Behavior

Open `examples/docs/` and test each interactive component:

- [ ] Tabs switch panels correctly; inactive panels are `hidden`
- [ ] Drawer opens on trigger click, closes on close button / scrim click / Escape
- [ ] Modal opens and closes correctly; background scroll locked when open
- [ ] Dropdown toggles on trigger click; closes on outside click / Escape
- [ ] Toast appears and auto-dismisses after timeout
- [ ] `SensoryUI.init()` can be called twice without duplicating event listeners

---

## 9. Performance (optional, before v2+)

- [ ] `styles.css` + all token files: total transfer < 30 KB gzip
- [ ] `sensory-ui.js`: < 10 KB minified
- [ ] No layout shift (CLS) caused by font loading — `font-display: swap` in place
- [ ] No console errors or warnings on page load
