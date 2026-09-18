# การใช้ HAH Sensory Design System บน Vanilla HTML/CSS/JS

Stack เป้าหมาย: **Vanilla HTML + CSS + JS** บน Cloudflare Pages/Workers + Hono + D1

---

## 1. Import เดียวที่ต้องใช้

```html
<link rel="stylesheet" href="/design-system/styles.css" />
```

`styles.css` คือ `@import` manifest — มัน pull ในไฟล์ token และ component style ทั้งหมด:
- `tokens/fonts.css` — Google Fonts (Google Sans, Google Sans Text, Google Sans Code)
- `tokens/colors.css` — OKLCH color tokens (`--brand-*`, `--ink-*`, `--status-*`, `--surface-*`, `--border-*`)
- `tokens/typography.css` — font families, scale, weights (`--font-sans`, `--text-*`, `--fw-*`)
- `tokens/spacing.css` — spacing, radius, shadow, motion tokens (`--space-*`, `--radius-*`, `--shadow-*`, `--dur-*`)
- `tokens/base.css` — reset + utility classes (`.tabular`, `.mono`, `.eyebrow`, `.grid-dots`, `.press`)
- `tokens/components.css` — `sensory-*` component classes

**ไม่ต้องมี node_modules, build step, หรือ bundler ใด ๆ ทั้งสิ้น**

---

## 2. Template เริ่มต้น

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>หน้าของฉัน — HAH Sensory</title>
  <link rel="stylesheet" href="/design-system/styles.css" />
  <!-- page-specific styles เพิ่มด้านล่าง -->
</head>
<body>
  <!-- markup here -->
</body>
</html>
```

ไฟล์ font โหลดจาก Google Fonts โดยอัตโนมัติผ่าน `fonts.css` — ไม่ต้องเพิ่ม `<link>` font เอง

---

## 3. สิ่งที่ `_ds_bundle.js` ทำ — และ **ไม่ควรใช้ใน production**

| ไฟล์ | ใช้สำหรับ | ใน production? |
|------|----------|---------------|
| `styles.css` | CSS tokens + component classes | **✓ ใช้** |
| `_ds_bundle.js` | React preview app บน Claude Code | **✗ ห้ามใช้** |
| `_ds_manifest.json` | metadata สำหรับ preview viewer | **✗ ห้ามใช้** |

`_ds_bundle.js` ดึง React 18 + ReactDOM + Babel standalone จาก CDN — หนักและ slow สำหรับ production, ใช้ได้แค่ตอน dev/preview บน local เท่านั้น

---

## 4. ใช้ class `sensory-*`

Component แต่ละตัวมี base class + modifier class รูปแบบ:

```html
<!-- Base class + size modifier + variant modifier -->
<button class="sensory-btn is-primary is-md" type="button">บันทึก</button>

<!-- Field wrapper → label → input -->
<div class="sensory-field">
  <label class="sensory-label">ชื่อพนักงาน <span class="req">*</span></label>
  <input class="sensory-input" type="text" placeholder="กรอกชื่อ-นามสกุล" />
</div>

<!-- Badge -->
<span class="sensory-badge tone-warning">รออนุมัติ</span>

<!-- Card -->
<div class="sensory-card sensory-card-pad">
  เนื้อหา
</div>
```

ดู `snippets/` สำหรับตัวอย่างแต่ละ component แบบละเอียด

---

## 5. Token ที่ใช้บ่อยใน page-specific CSS

แทนที่จะ hardcode ค่า ใช้ CSS variable เหล่านี้:

```css
/* สี */
--surface-app          /* background ของทั้งหน้า */
--surface-card         /* background card/panel */
--surface-hover        /* hover state surface */
--surface-sunken       /* sunken well / table header bg */
--border-subtle        /* hairline borders */
--border-default       /* standard borders */
--text-body            /* body text */
--text-heading         /* headings */
--text-muted           /* secondary text */
--text-subtle          /* placeholder/disabled */
--brand                /* primary brand teal */
--brand-100            /* brand tint bg */
--brand-700            /* brand dark text */

/* spacing */
--space-1 (4px) --space-2 (8px) --space-3 (12px)
--space-4 (16px) --space-5 (20px) --space-6 (24px)
--space-8 (32px) --space-10 (40px)

/* radius */
--radius-xs (4px) --radius-sm (6px) --radius-md (8px)
--radius-lg (12px) --radius-xl (16px) --radius-pill (9999px)

/* shadow */
--shadow-xs  --shadow-sm  --shadow-md  --shadow-lg  --shadow-xl
--shadow-focus  /* focus ring — ใช้ใน box-shadow ของ :focus-visible */

/* motion */
--dur-fast (120ms) --dur-base (180ms) --dur-moderate (260ms)
--ease-out          /* cubic-bezier(0.16, 1, 0.3, 1) */
--ease-drawer       /* สำหรับ sliding panel */

/* typography */
--font-sans     /* Google Sans Text — body/UI <17px */
--font-display  /* Google Sans — headings ≥17px */
--font-mono     /* Google Sans Code — numerals, IDs, code */
--text-2xs (11px) --text-xs (12px) --text-sm (13px)
--text-base (14px) --text-md (16px) --text-lg (18px)
--text-xl (22px) --text-2xl (28px) --text-3xl (36px)
```

---

## 6. กฎที่ต้องปฏิบัติ

### ✓ ทำ
- ใช้ `sensory-*` class ก่อนเสมอ ก่อนเขียน CSS ใหม่
- ใช้ `var(--space-*)` / `var(--text-*)` / `var(--surface-*)` แทน hardcode
- ใช้ `var(--status-success-text)` / `var(--status-warning-soft)` ฯลฯ สำหรับ semantic color
- ใช้ Google Sans Code (`--font-mono`) สำหรับข้อมูลตัวเลข, เลข ID, เวลา
- เพิ่ม `:focus-visible { box-shadow: var(--shadow-focus); }` สำหรับ custom interactive element

### ✗ ห้าม
- Override `color` / `background` บน `sensory-*` element ด้วย inline style
- Hardcode สีเช่น `#007bff`, `rgb(...)` ที่ไม่มีใน token
- สร้าง button variant ใหม่นอกระบบ (ใช้ `is-ghost` + custom icon แทน)
- Import `_ds_bundle.js` ใน production
- ใช้ `!important` แก้ theme ที่ขัดแย้ง — ถ้าขัดแย้งแสดงว่า token ยังใช้ไม่ถูก

---

## 7. โครงสร้าง path บน Cloudflare Pages

```
public/
  design-system/       ← copy hr-design-system/project/ ไปที่นี่
    styles.css
    tokens/
    assets/
  pages/
    dashboard.html     ← link ด้วย /design-system/styles.css
    leave.html
```

หรือถ้าใช้ Hono เป็น static file server ก็ serve ทั้ง folder ผ่าน `serveStatic`:

```ts
app.use('/design-system/*', serveStatic({ root: './public' }))
```

---

## 8. ดูตัวอย่างแบบสมบูรณ์

- `examples/vanilla-dashboard/index.html` — HR dashboard หน้าจริง (ไม่มี React/Babel เลย)
- `snippets/*.html` — snippet แต่ละ component
- `docs/COMPONENT_CONTRACTS.md` — contract ครบทุก component
