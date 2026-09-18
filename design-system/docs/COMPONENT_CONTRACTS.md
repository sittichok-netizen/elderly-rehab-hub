# Component Contracts — HAH Sensory Design System

Contract ของทุก component: base class, variants, states, สิ่งที่ห้าม override  
อ้างอิง source: `tokens/components.css` + `ui_kits/hr-demo/kit.css`

---

## Forms

### Button — `.sensory-btn`
| | |
|---|---|
| **Base** | `.sensory-btn` |
| **Sizes** | `.is-sm` (32px) · `.is-md` (38px, default) · `.is-lg` (44px) · `.is-block` (100% width) |
| **Variants** | `.is-primary` · `.is-secondary` · `.is-ghost` · `.is-danger` · `.is-brand-soft` |
| **States** | `:disabled` (attr) → opacity 0.5, cursor not-allowed |
| **Auto states** | `:hover` · `:active` scale(0.975) · `:focus-visible` shadow-focus — all automatic |
| **Element** | `<button type="button">` หรือ `<button type="submit">` |
| **DO NOT** | Override `background`, `color`, `border-radius` · ใช้ `<div>` หรือ `<span>` แทน `<button>` · ใส่ variant ที่ไม่มีในรายการ |

### IconButton — `.sensory-iconbtn`
| | |
|---|---|
| **Base** | `.sensory-iconbtn` |
| **Sizes** | `.is-sm` (32px) · `.is-md` (38px) · `.is-lg` (44px) |
| **Variants** | default (transparent) · `.is-solid` (card bg + border + shadow-xs) |
| **A11y** | ต้องมี `aria-label` เสมอ (ไม่มี visible text) |
| **DO NOT** | ใส่ text ข้างใน · Override `color` |

### Field wrapper — `.sensory-field`
| | |
|---|---|
| **Base** | `.sensory-field` (flex column, gap 8px) |
| **Children order** | `.sensory-label` → input/select/textarea → `.sensory-hint` |
| **Label** | `.sensory-label` · required mark: `<span class="req">*</span>` |
| **Hint** | `.sensory-hint` · error variant: `.sensory-hint.is-error` |
| **DO NOT** | ข้าม `.sensory-field` wrapper · เปลี่ยนลำดับ label/input/hint |

### Input — `.sensory-input`
| | |
|---|---|
| **Base** | `.sensory-input` (height 38px, full width) |
| **Error** | `.sensory-input.has-error` |
| **With icon** | wrap in `.sensory-input-wrap` → add `.lead-icon` span inside wrap |
| **States** | `:hover` border-strong · `:focus` border-brand + shadow-focus · `:disabled` surface-sunken |
| **DO NOT** | Set `width` manually (always full width) · Override `border-color` inline |

### Textarea — `.sensory-textarea`
| | |
|---|---|
| **Base** | `.sensory-textarea` (min-height 84px, resize: vertical) |
| **Error** | `.sensory-textarea.has-error` |
| **States** | เหมือน input |
| **DO NOT** | Set `resize: none` — ผู้ใช้ควร resize ได้ |

### Select — `.sensory-select`
| | |
|---|---|
| **Base** | `.sensory-select` (height 38px, custom arrow SVG) |
| **Error** | `.sensory-select.has-error` |
| **Placeholder** | `<option value="" disabled selected>` เป็น first option |
| **DO NOT** | ซ่อน native select แล้วสร้าง custom dropdown ด้วย div/ul |

### Checkbox — `.sensory-check`
| | |
|---|---|
| **Base** | `<label class="sensory-check">` |
| **Control** | `<input type="checkbox">` (visually hidden, real input) |
| **Box** | `<span class="box">` + SVG checkmark (11×11) inside |
| **Disabled** | `.sensory-check.is-disabled` + `disabled` attr on input |
| **DO NOT** | ใช้ `<div>` แทน `<label>` · ลืม SVG checkmark ใน `.box` |

### Radio — `.sensory-check.is-radio`
| | |
|---|---|
| **Base** | `<label class="sensory-check is-radio">` |
| **Control** | `<input type="radio" name="group-name">` |
| **Dot** | `<span class="sensory-radio-dot">` inside `.box` (แทน SVG) |
| **Group** | ทุก radio ใน group ต้องมี `name` เดียวกัน · ใช้ `<fieldset>` + `<legend>` |
| **DO NOT** | ลืม `name` attribute · ใช้ checkbox แทน radio ใน single-select |

### Switch — `.sensory-switch`
| | |
|---|---|
| **Base** | `<label class="sensory-switch">` |
| **Control** | `<input type="checkbox">` |
| **Track/Thumb** | `<span class="track"><span class="thumb"></span></span>` |
| **Label** | `<span class="switch-label">` (optional) |
| **Disabled** | `.sensory-switch.is-disabled` + `disabled` attr |
| **Use when** | binary on/off setting ที่มีผลทันที (ไม่ใช่ form submit) |
| **DO NOT** | ใช้แทน checkbox ใน form · ใช้สำหรับ multi-choice |

---

## Data Display

### Badge — `.sensory-badge`
| | |
|---|---|
| **Base** | `.sensory-badge` |
| **Tones** | `.tone-neutral` · `.tone-brand` · `.tone-success` · `.tone-warning` · `.tone-danger` · `.tone-info` |
| **Solid** | `.is-solid` — รองรับ: tone-brand, tone-success, tone-danger เท่านั้น |
| **Dot** | `<span class="dot">` ก่อน text (optional) |
| **HR mapping** | success = อนุมัติ/มาทำงาน · warning = รออนุมัติ/ลา · danger = ปฏิเสธ/ขาดงาน · info = ระบบ/แจ้งเตือน · neutral = ยกเลิก/ไม่ระบุ |
| **DO NOT** | ข้อความยาวกว่า 3 คำ · สร้าง tone ใหม่ · ใช้ danger สำหรับ tag ทั่วไป |

### Tag/Chip — `.sensory-tag`
| | |
|---|---|
| **Base** | `.sensory-tag` (surface-sunken bg, border-subtle) |
| **Remove** | `<button class="remove" aria-label="ลบ X">` inside tag |
| **Use when** | filter chips, multi-select tags — ไม่ใช่ status (ใช้ badge แทน) |

### Avatar — `.sensory-avatar`
| | |
|---|---|
| **Base** | `.sensory-avatar` |
| **Sizes** | `.is-xs` (24px) · `.is-sm` (32px) · `.is-md` (40px, default) · `.is-lg` (52px) |
| **With image** | `<img>` inside avatar |
| **Status dot** | add `.sensory-avatar-status` (green dot ขวาล่าง) |
| **Group** | `.sensory-avatar-group` wraps multiple avatars (-10px overlap) |
| **Initials** | ใส่ 2 ตัวอักษรย่อใน avatar เมื่อไม่มี image |

### Card — `.sensory-card`
| | |
|---|---|
| **Base** | `.sensory-card` (white, border-subtle, radius-lg, shadow-sm) |
| **Variants** | `.is-flat` (no shadow) · `.is-interactive` (hover lift) |
| **Content** | `.sensory-card-pad` (padding var(--pad-card)) |
| **Header** | `.sensory-card-header` (flex row, border-bottom) + `.sensory-card-title` |
| **DO NOT** | ใส่ padding inline บน `.sensory-card` · ทำ whole card เป็น `<a>` ถ้ามี action หลายอย่าง |

### StatCard — `.sensory-stat`
| | |
|---|---|
| **Base** | `.sensory-stat` (flex column, gap-2, padding pad-card) |
| **Parts** | `.stat-label` (icon + text) · `.stat-value` (display number) · `.stat-delta` |
| **Delta** | `.stat-delta.up` (success color) · `.stat-delta.down` (danger color) |
| **Font** | `.stat-value` ใช้ `--font-display` + tabular-nums อัตโนมัติ |
| **DO NOT** | Override font-size ของ `.stat-value` |

### ProgressBar — `.sensory-progress`
| | |
|---|---|
| **Base** | `.sensory-progress` (8px height, pill radius) |
| **Fill** | `<div class="fill" style="width: N%">` |
| **Tones** | default (brand) · `.tone-success` · `.tone-warning` · `.tone-danger` |
| **DO NOT** | Set `height` ด้วย inline style · Override fill color โดยตรง |

---

## Feedback

### Alert — `.sensory-alert`
| | |
|---|---|
| **Base** | `.sensory-alert` |
| **Tones** | `.tone-info` · `.tone-success` · `.tone-warning` · `.tone-danger` |
| **Parts** | `.alert-icon` (flex:none) · `.alert-title` (optional) · `.alert-body` |
| **A11y** | danger/error → `role="alert"` · success/info → `role="status"` + `aria-live="polite"` |
| **DO NOT** | ใช้ tone-danger สำหรับ warning · ซ่อนด้วย `visibility:hidden` |

### Tooltip — `.sensory-tooltip-wrap`
| | |
|---|---|
| **Wrapper** | `.sensory-tooltip-wrap` (position: relative, inline-flex) |
| **Tooltip** | `.sensory-tooltip` inside wrapper (absolute, bottom of trigger) |
| **Trigger** | hover หรือ focus-within แสดง tooltip อัตโนมัติ (CSS-only) |
| **A11y** | เพิ่ม `aria-describedby` บน trigger ที่ชี้ไปยัง tooltip id |
| **DO NOT** | ใส่ interactive element ใน tooltip content · ข้อความยาวเกิน 1 บรรทัด |

---

## Navigation

### Tabs — `.sensory-tabs` / `.sensory-tab`
| | |
|---|---|
| **Container** | `.sensory-tabs.is-pill` หรือ `.sensory-tabs.is-underline` |
| **Tab** | `.sensory-tab` · active: `.sensory-tab.is-active` |
| **Count** | `<span class="tab-count">N</span>` inside tab |
| **A11y** | `role="tablist"` บน container · `role="tab"` + `aria-selected` + `aria-controls` บน tab · `role="tabpanel"` + `hidden` บน panel |
| **JS** | toggle `.is-active` + `aria-selected` ด้วย click handler · show/hide panels ด้วย `hidden` attr |
| **DO NOT** | ผสม `is-pill` + `is-underline` · เปลี่ยน active state ด้วย inline style |

---

## App Kit (ต้อง link `ui_kits/hr-demo/kit.css` หรือ copy CSS)

### Table — `.table`
| | |
|---|---|
| **Base** | `.table` (border-collapse, full width) |
| **Cell** | `<th scope="col">` / `<td>` — padding/border อัตโนมัติ |
| **Person cell** | `.cell-person` wraps avatar + `.nm` (name) + `.id` (mono ID) |
| **Hover** | `tbody tr:hover` → surface-hover อัตโนมัติ |
| **DO NOT** | ข้าม `<thead>/<tbody>` · Set padding inline บน `<td>` |

### Drawer — `.drawer` / `.drawer-scrim`
| | |
|---|---|
| **Scrim** | `.drawer-scrim` (fixed overlay) · open: `.drawer-scrim.open` |
| **Panel** | `.drawer` (fixed right, 440px) · open: `.drawer.open` |
| **Parts** | `.drawer-head` · `.drawer-body` · `.drawer-foot` |
| **A11y** | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` + focus trap + Escape |
| **DO NOT** | เปิดหลาย drawer พร้อมกัน · ลืม `document.body.style.overflow = 'hidden'` |

### Toast — `.toast`
| | |
|---|---|
| **Base** | `.toast` (fixed bottom-center, dark bg) · show: `.toast.show` |
| **Content** | text + optional icon |
| **Behavior** | show ด้วย JS → auto-hide หลัง 3–4 วินาที |
| **DO NOT** | แสดงหลาย toast พร้อมกัน · ใส่ action ที่ซับซ้อนใน toast |

---

## Utility Classes (จาก `tokens/base.css`)

| Class | ผล |
|---|---|
| `.tabular` | `font-variant-numeric: tabular-nums` — ตัวเลขกว้างเท่ากัน |
| `.mono` | `font-family: var(--font-mono)` + tabular-nums |
| `.eyebrow` | xs semibold uppercase tracking-wide text-muted — section overline |
| `.grid-dots` | dotted grid background — empty states / hero panels เท่านั้น |
| `.press` | scale(0.97) on `:active` — custom interactive element |
| `.surface-card` | card surface shorthand (bg+border+radius+shadow) |
| `.scrollbar-hide` | hide scrollbar (webkit + firefox) |

---

## Z-index Stack

```
--z-sticky   : 10   (topbar, sticky header)
--z-overlay  : 100  (drawer scrim, modal scrim)
--z-modal    : 200  (drawer, modal panel)
--z-tooltip  : 300  (tooltip)
--z-toast    : 400  (toast notification)
```
