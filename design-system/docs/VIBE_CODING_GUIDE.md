# Vibe Coding Guide — HAH Sensory Design System

คู่มือสำหรับ AI agent (และนักพัฒนา) สร้างหน้าใหม่บน stack  
**Vanilla HTML/CSS/JS + Cloudflare Pages/Workers + Hono + D1**  
ให้ได้ผลลัพธ์ on-brand, consistent, และ maintainable ในทุก session

---

## 0. กฎสูงสุด

> **"Reuse before you write."**  
> ก่อนเขียน CSS ใหม่ทุกครั้ง ถามตัวเองก่อนว่า:  
> มี `sensory-*` class ครอบคลุมสิ่งนี้แล้วหรือยัง? มี CSS token ที่ควรใช้แทน hardcode ไหม?

stack เดียวกัน: `styles.css` → `sensory-*` → token variables → page-specific CSS (ถ้าจำเป็น)

---

## 1. Token Cheat Sheet

ใช้ token เหล่านี้ใน page-specific CSS แทน hardcode ค่าทุกครั้ง

### สี — Surface & Text

```css
--surface-app       /* bg ของ <body> / whole page */
--surface-card      /* bg ของ card, panel, sidebar, topbar */
--surface-hover     /* hover state ของ row, nav-item, interactive surface */
--surface-sunken    /* input bg, table header bg, tag bg, sunken well */
--surface-inverse   /* dark surface — tooltip bg */

--text-heading      /* h1–h6, bold labels, stat values */
--text-body         /* body text, td, paragraph */
--text-muted        /* secondary text, th, metadata */
--text-subtle       /* placeholder, disabled, eyebrow */
--text-on-brand     /* text บน brand bg (white) */
--text-on-inverse   /* text บน dark bg (white) */
```

### สี — Brand & Status

```css
--brand             /* primary teal — button bg, active indicator, progress fill */
--brand-50          /* nav active bg (very light teal) */
--brand-100         /* soft teal bg — badge, tab-count bg */
--brand-300         /* brand hover */
--brand-700         /* brand dark text บน light bg */

/* Status (ใช้ตาม semantic จริงเท่านั้น) */
--status-success          /* approved / present — green */
--status-success-soft     /* soft green bg */
--status-success-text     /* dark green text on white */

--status-warning          /* pending / on-leave — amber */
--status-warning-soft
--status-warning-text

--status-danger           /* rejected / absent — red */
--status-danger-soft
--status-danger-text

--status-info             /* informational — blue */
--status-info-soft
--status-info-text

--status-neutral-soft     /* cancelled / unset — grey */
--status-neutral-text
```

### Borders

```css
--border-subtle     /* hairline — card border, divider (8% ink) */
--border-default    /* standard input border, secondary button border */
--border-strong     /* hover state border */
--border-brand      /* focus state border (teal) */
```

### Spacing (4px base grid)

```css
--space-1: 4px    --space-2: 8px    --space-3: 12px
--space-4: 16px   --space-5: 20px   --space-6: 24px
--space-8: 32px   --space-10: 40px  --space-12: 48px
--pad-card: 20px  /* standard card padding */
```

### Radius

```css
--radius-xs: 4px   /* checkbox box, tag remove btn */
--radius-sm: 6px   /* tag, tooltip */
--radius-md: 8px   /* button, input, nav-item, toast */
--radius-lg: 12px  /* card, panel */
--radius-xl: 16px  /* large modal */
--radius-pill: 9999px  /* badge, switch track, tab pill */
```

### Shadow

```css
--shadow-xs   /* iconbtn solid, tab active pill */
--shadow-sm   /* card default */
--shadow-md   /* card hover, tooltip */
--shadow-lg   /* toast */
--shadow-xl   /* drawer */
--shadow-focus /* focus ring — 3px teal ring */
```

### Motion

```css
--dur-fast: 120ms       /* press, icon micro-interaction */
--dur-base: 180ms       /* hover color, fade */
--dur-moderate: 260ms   /* drawer slide, modal fade */
--dur-slow: 400ms       /* progress bar fill */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)
```

### Z-index

```css
--z-sticky:  10   /* topbar, sticky thead */
--z-overlay: 100  /* drawer scrim */
--z-modal:   200  /* drawer, modal */
--z-tooltip: 300
--z-toast:   400
```

### Typography

```css
--font-sans:    /* Google Sans Text — body/UI <17px */
--font-display: /* Google Sans — headings ≥17px */
--font-mono:    /* Google Sans Code — numbers, IDs, time */

--text-2xs: 11px   --text-xs: 12px   --text-sm: 13px
--text-base: 14px  --text-md: 16px   --text-lg: 18px
--text-xl: 22px    --text-2xl: 28px  --text-3xl: 36px

--fw-regular: 400  --fw-medium: 500
--fw-semibold: 600 --fw-bold: 700
```

---

## 2. Component Selection Matrix

เลือก component ให้ถูก context — อย่าสลับ component เพราะ "หน้าตาคล้ายกัน"

| สถานการณ์ | ใช้ | อย่าใช้ |
|-----------|-----|---------|
| แสดงสถานะ (อนุมัติ/ปฏิเสธ/รอ) | `sensory-badge` + tone | `sensory-alert` |
| Filter chip ที่ลบได้ | `sensory-tag` + `.remove` | `sensory-badge` |
| ตัวเลขสรุป KPI บนแดชบอร์ด | `sensory-stat` ใน `sensory-card` | ตัวเลขลอยๆ |
| System message / feedback banner | `sensory-alert` | `sensory-badge` |
| On/off setting (มีผลทันที) | `sensory-switch` | `sensory-check` |
| Single-choice ใน form submit | `sensory-check.is-radio` | `sensory-switch` |
| Multi-choice ใน form submit | `sensory-check` | `sensory-switch` |
| Icon-only button | `sensory-iconbtn` + `aria-label` | `sensory-btn` ไม่มี text |
| กระทำทำลาย (ลบ, ปฏิเสธ) | `sensory-btn.is-danger` | `sensory-btn.is-primary` |
| กระทำรอง (ยกเลิก, ปิด) | `sensory-btn.is-secondary` | `sensory-btn.is-ghost` |
| ลิงก์ navigation (ใน topbar) | `sensory-btn.is-ghost` | `sensory-btn.is-primary` |
| Page-level section nav | `sensory-tabs.is-underline` | `sensory-tabs.is-pill` |
| Filter tabs ใน card | `sensory-tabs.is-pill` | `sensory-tabs.is-underline` |
| Detail panel ที่ slide มาจากขวา | `.drawer` + `.drawer-scrim` | modal |
| Short informational message | `sensory-tooltip-wrap` | `sensory-alert` |
| Progress ที่ track ได้ (วันลา) | `sensory-progress` | StatCard delta |
| ภาพ/initials พนักงาน | `sensory-avatar` + size modifier | raw `<img>` |

### Badge tone mapping (HR)

| สถานะ | Tone | ตัวอย่าง |
|-------|------|---------|
| อนุมัติแล้ว, มาทำงาน, เสร็จสิ้น | `tone-success` | ✅ อนุมัติแล้ว |
| รออนุมัติ, ลา, กำลังดำเนินการ | `tone-warning` | ⏳ รออนุมัติ |
| ปฏิเสธ, ขาดงาน, ผิดพลาด | `tone-danger` | ❌ ปฏิเสธ |
| ข้อมูล, แจ้งเตือนระบบ | `tone-info` | ℹ️ ข้อมูล |
| ยกเลิก, ไม่ระบุ, เก็บถาวร | `tone-neutral` | — ยกเลิก |
| แผนก, ป้ายกำกับทั่วไป | `tone-brand` | 🏷️ HR |

---

## 3. Layout Patterns

### 3.1 App Shell (Sidebar + Main)

```html
<div class="app">             <!-- display:flex, min-height:100vh -->
  <aside class="sidebar">     <!-- width:224px, sticky, height:100vh -->
    <div class="sidebar-brand">...</div>
    <nav class="nav">
      <a class="nav-item active">...</a>   <!-- active state: brand-50 bg -->
      <a class="nav-item">...</a>
    </nav>
    <div class="sidebar-user">...</div>   <!-- user profile at bottom -->
  </aside>

  <main class="main">          <!-- flex:1 -->
    <header class="topbar">   <!-- sticky, backdrop-filter:blur -->
      <h1>ชื่อหน้า</h1>
      <div class="spacer"></div>
      <!-- actions ขวา -->
    </header>
    <div class="content">     <!-- padding:24px 28px, max-width:1200px -->
      <!-- page content here -->
    </div>
  </main>
</div>
```

**ห้าม:** ทำ sidebar เป็น `position:fixed` ใหม่ — `.sidebar` มี `position:sticky; height:100vh` อยู่แล้ว

### 3.2 Dashboard Grid (Stats + Two-column)

```html
<!-- Stats: 4 columns desktop, 2 tablet, 1 mobile -->
<div class="stat-grid">
  <div class="sensory-card"><div class="sensory-stat">...</div></div>
  <div class="sensory-card"><div class="sensory-stat">...</div></div>
  <div class="sensory-card"><div class="sensory-stat">...</div></div>
  <div class="sensory-card"><div class="sensory-stat">...</div></div>
</div>

<!-- Two-column: 1.5fr + 1fr desktop, 1fr tablet+ -->
<div class="two-col">
  <div><!-- primary content (table, list) --></div>
  <div><!-- secondary content (summary, alerts) --></div>
</div>
```

**StatCard structure:**
```html
<div class="sensory-stat">
  <div class="stat-label"><svg>...</svg> Label</div>
  <div class="stat-value">42</div>
  <div class="stat-delta up">↑ เพิ่มขึ้น 3 จากเมื่อวาน</div>
  <!-- หรือ .down สำหรับ decrease -->
</div>
```

### 3.3 Card with Tabs + List

Pattern ที่ใช้บ่อยสุดใน HR: card ที่มี tab filter แล้วตาม list ด้วย req-row

```html
<div class="sensory-card">
  <div class="sensory-card-header">
    <span class="sensory-card-title">รออนุมัติ</span>
    <div class="sensory-tabs is-pill" role="tablist">
      <button class="sensory-tab is-active" role="tab"
              aria-selected="true" aria-controls="panel-all">
        ทั้งหมด <span class="tab-count">6</span>
      </button>
      <button class="sensory-tab" role="tab"
              aria-selected="false" aria-controls="panel-pending">
        รอ <span class="tab-count">3</span>
      </button>
    </div>
  </div>

  <div id="panel-all" role="tabpanel">
    <div class="req-row">
      <div class="sensory-avatar is-sm">สช</div>
      <div class="body">
        <div class="ttl">สมชาย ใจดี — ลาพักร้อน 3 วัน</div>
        <div class="meta">1–3 ก.ค. 2568</div>
      </div>
      <span class="sensory-badge tone-warning">รออนุมัติ</span>
      <div class="actions">
        <button class="sensory-btn is-primary is-sm">อนุมัติ</button>
        <button class="sensory-btn is-secondary is-sm">ปฏิเสธ</button>
      </div>
    </div>
    <!-- more rows -->
  </div>

  <div id="panel-pending" role="tabpanel" hidden>
    <!-- filtered content -->
  </div>
</div>
```

### 3.4 Form Layout

```html
<div class="sensory-card sensory-card-pad">
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">

    <div class="sensory-field">
      <label class="sensory-label" for="f-name">ชื่อ <span class="req">*</span></label>
      <input class="sensory-input" id="f-name" type="text" />
    </div>

    <div class="sensory-field">
      <label class="sensory-label" for="f-dept">แผนก</label>
      <select class="sensory-select" id="f-dept">...</select>
    </div>

  </div>

  <div class="sensory-field" style="margin-top:var(--space-4);">
    <label class="sensory-label" for="f-reason">เหตุผล</label>
    <textarea class="sensory-textarea" id="f-reason"></textarea>
  </div>

  <div style="display:flex; gap:var(--space-2); justify-content:flex-end;
              margin-top:var(--space-5); padding-top:var(--space-4);
              border-top:1px solid var(--border-subtle);">
    <button class="sensory-btn is-secondary is-md" type="button">ยกเลิก</button>
    <button class="sensory-btn is-primary is-md" type="submit">ส่งคำขอ</button>
  </div>
</div>
```

**กฎ form:**
- Field order: label → input → hint (เสมอ — อย่า swap)
- Error: `.has-error` บน input + `.sensory-hint.is-error` + `role="alert"` ด้านล่าง
- Required: `<span class="req">*</span>` ใน label (style อัตโนมัติ — สีแดง)
- Action row: secondary ก่อน, primary หลัง (ขวา)

### 3.5 Data Table

```html
<div class="sensory-card">
  <div class="sensory-card-header">
    <span class="sensory-card-title">รายชื่อพนักงาน</span>
    <div style="display:flex; gap:var(--space-2);">
      <!-- search input + action button -->
    </div>
  </div>
  <table class="table" aria-label="รายชื่อพนักงาน">
    <thead>
      <tr>
        <th scope="col">พนักงาน</th>
        <th scope="col">แผนก</th>
        <th scope="col">สถานะ</th>
        <th scope="col"></th>  <!-- action column — no header text -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="cell-person">
            <div class="sensory-avatar is-sm">สช</div>
            <div>
              <div class="nm">สมชาย ใจดี</div>
              <div class="id">EMP-04821</div>  <!-- mono font อัตโนมัติ -->
            </div>
          </div>
        </td>
        <td>ทรัพยากรบุคคล</td>
        <td><span class="sensory-badge tone-success"><span class="dot"></span>มาทำงาน</span></td>
        <td>
          <button class="sensory-iconbtn is-sm" aria-label="ดูรายละเอียด">
            <svg><!-- chevron-right --></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**กฎ table:**
- ตัวเลขและรหัส: `<span class="mono">` เสมอ
- คอลัมน์ action: ไม่มี header text, ใช้ `sensory-iconbtn is-sm`
- ห้าม inline style บน `<td>` — ใช้ utility class หรือ `<span>` wrapper
- Row clickable: ใช้ `tabindex="0"` + `aria-label` + keydown handler (Enter/Space)

### 3.6 Drawer Pattern

```html
<!-- Trigger -->
<button class="sensory-btn is-secondary is-md"
        data-drawer-open="detail-drawer" aria-haspopup="dialog">
  ดูรายละเอียด
</button>

<!-- Scrim -->
<div class="drawer-scrim" id="detail-drawer-scrim"
     data-drawer-scrim="detail-drawer" aria-hidden="true"></div>

<!-- Panel -->
<div class="drawer" id="detail-drawer"
     role="dialog" aria-modal="true"
     aria-labelledby="detail-drawer-title" aria-hidden="true">
  <div class="drawer-head">
    <h2 id="detail-drawer-title">ชื่อ drawer</h2>
    <button class="sensory-iconbtn is-md"
            data-drawer-close="detail-drawer" aria-label="ปิด">✕</button>
  </div>
  <div class="drawer-body">
    <!-- content -->
  </div>
  <div class="drawer-foot">
    <button class="sensory-btn is-secondary is-md"
            data-drawer-close="detail-drawer">ปิด</button>
    <button class="sensory-btn is-primary is-md">กระทำหลัก</button>
  </div>
</div>
```

ใช้ `app.js` จาก `examples/vanilla-dashboard/` เป็น template สำหรับ JS handler (data-attribute driven — `data-drawer-open`, `data-drawer-close`, `data-drawer-scrim`)

### 3.7 Empty State

```html
<div class="sensory-card">
  <div class="empty grid-dots" style="padding:60px 20px;">
    <svg><!-- relevant icon, 40px, text-muted --></svg>
    <div style="font-size:var(--text-base); font-weight:var(--fw-medium);
                color:var(--text-heading); margin:12px 0 6px;">
      ยังไม่มีคำขอลา
    </div>
    <div style="font-size:var(--text-sm); color:var(--text-muted); margin-bottom:16px;">
      คำขอลาที่รออนุมัติจะปรากฏที่นี่
    </div>
    <button class="sensory-btn is-brand-soft is-md">+ ขอลา</button>
  </div>
</div>
```

**กฎ empty state:** icon → heading → subtext → CTA (ถ้ามี) · ใช้ `.grid-dots` เป็น bg ของ `.empty` ได้ · ห้ามว่างโดยไม่มี feedback

---

## 4. Thai UX Writing

### หลักการ

| หลีกเลี่ยง | ใช้แทน |
|-----------|--------|
| "ดำเนินการสำเร็จ" | "ส่งคำขอลาแล้ว" (บอกว่าเกิดอะไรขึ้น) |
| "ERROR: Invalid input" | "รูปแบบอีเมลไม่ถูกต้อง" (เฉพาะเจาะจง) |
| "กรุณากรอกข้อมูล" | "กรุณากรอกชื่อ-นามสกุล" (ระบุว่าอะไร) |
| "ระบบกำลังประมวลผล" | "กำลังบันทึก..." (ใช้ภาษาปกติ) |
| "ต้องการยืนยันหรือไม่?" | "ยืนยันการลา 3 วัน?" (ระบุ action จริง) |
| Title Case: "การ อนุมัติ ลา" | Sentence case: "การอนุมัติลา" |

### Microcopy ที่ใช้บ่อย

```
Actions:     บันทึก · ส่งคำขอ · อนุมัติ · ปฏิเสธ · ยกเลิก · ปิด · แก้ไข · ลบ
Navigation:  ดูทั้งหมด · ย้อนกลับ · ถัดไป · โหลดเพิ่ม
Status:      รออนุมัติ · อนุมัติแล้ว · ปฏิเสธ · ยกเลิก · กำลังดำเนินการ
Feedback:    ✓ ส่งคำขอแล้ว · ✓ อนุมัติแล้ว · บันทึกไม่สำเร็จ กรุณาลองใหม่
Empty:       ยังไม่มีข้อมูล · ไม่พบผลการค้นหา · ยังไม่มีคำขอ
```

### ตัวเลข & วันที่

```
วันที่:      "1 ก.ค. 2568" (short) · "1 กรกฎาคม 2568" (full)
ช่วงเวลา:   "09:00–18:00" (ไม่มี space รอบ em-dash)
ช่วงวัน:    "1–3 ก.ค." (ไม่มี space)
ปี:          ใช้ พ.ศ. (2568) ในบริบท HR · ค.ศ. เฉพาะส่วนที่ต้องการ
ID:          "EMP-04821" (font-mono เสมอ)
เงิน:        "฿12,500.00" (tabular-nums, font-mono)
```

### Address ผู้ใช้

```
✓ "คุณมีวันลาคงเหลือ 8 วัน"    — direct, warm
✓ "คำขอของคุณถูกส่งแล้ว"       — clear ownership
✗ "ผู้ใช้มีวันลาคงเหลือ 8 วัน" — impersonal
✗ "คำขอได้รับการบันทึกแล้ว"    — passive voice
```

---

## 5. Anti-patterns (สิ่งที่ห้ามทำ)

### CSS Anti-patterns

```css
/* ✗ Hardcode สีที่ไม่ใช่ token */
color: #007bff;
background: rgb(0, 123, 255);

/* ✓ ใช้ token */
color: var(--brand);
background: var(--brand-100);

/* ✗ Override sensory-* component โดยตรง */
.sensory-btn { border-radius: 20px !important; }

/* ✓ สร้าง wrapper class ถ้าต้องการ custom */
.page-hero-btn.sensory-btn.is-primary { /* specific enough */ }

/* ✗ Hardcode spacing */
padding: 16px 24px;
gap: 8px;

/* ✓ ใช้ token */
padding: var(--space-4) var(--space-6);
gap: var(--space-2);

/* ✗ สร้าง z-index ใหม่โดย random */
z-index: 999;
z-index: 9999;

/* ✓ ใช้ z-index token */
z-index: var(--z-modal);
```

### HTML Anti-patterns

```html
<!-- ✗ Button ที่ไม่มี variant = ไม่มีสี -->
<button class="sensory-btn">ส่ง</button>

<!-- ✓ ต้องระบุ variant -->
<button class="sensory-btn is-primary is-md" type="button">ส่ง</button>

<!-- ✗ ใช้ div เป็น button -->
<div class="sensory-btn is-primary" onclick="submit()">ส่ง</div>

<!-- ✓ ใช้ <button> เสมอ -->
<button class="sensory-btn is-primary is-md" type="button">ส่ง</button>

<!-- ✗ Input ไม่มี label -->
<input class="sensory-input" type="text" placeholder="ชื่อ" />

<!-- ✓ ต้องมี label เสมอ -->
<div class="sensory-field">
  <label class="sensory-label" for="emp-name">ชื่อ</label>
  <input class="sensory-input" id="emp-name" type="text" />
</div>

<!-- ✗ Table ไม่มี thead/th -->
<table class="table">
  <tr><td>สมชาย</td><td>HR</td></tr>
</table>

<!-- ✓ ต้องมี thead + th scope -->
<table class="table" aria-label="พนักงาน">
  <thead><tr><th scope="col">ชื่อ</th><th scope="col">แผนก</th></tr></thead>
  <tbody><tr><td>สมชาย</td><td>HR</td></tr></tbody>
</table>

<!-- ✗ ตัวเลข/ID ไม่ใช้ mono font -->
<td>EMP-04821</td>

<!-- ✓ ใช้ .mono หรือ .tabular บน numeric data -->
<td><span class="mono">EMP-04821</span></td>
```

### Status Semantic Anti-patterns

```html
<!-- ✗ ใช้ tone ผิด semantic -->
<span class="sensory-badge tone-danger">ลาพักร้อน</span>   <!-- ลาพักร้อนไม่ใช่ danger! -->
<span class="sensory-badge tone-success">รออนุมัติ</span>  <!-- รออนุมัติไม่ใช่ success! -->

<!-- ✓ ตรงตาม semantic จริง -->
<span class="sensory-badge tone-warning">ลาพักร้อน</span>
<span class="sensory-badge tone-warning">รออนุมัติ</span>
```

### Motion Anti-patterns

```css
/* ✗ ใช้ทุก property ใน transition */
transition: all 0.3s ease;

/* ✓ animate เฉพาะ transform/opacity/color/box-shadow */
transition: transform var(--dur-base) var(--ease-out),
            opacity var(--dur-base) var(--ease-out);

/* ✗ ลืม prefers-reduced-motion */
.drawer { transition: transform 0.26s; }

/* ✓ base.css ครอบ prefers-reduced-motion ให้แล้ว แต่ถ้าสร้าง animation ใหม่: */
@media (prefers-reduced-motion: reduce) {
  .my-custom-animation { animation: none; transition: none; }
}
```

---

## 6. File Structure Reference

```
hr-design-system/project/
  styles.css                    ← ONLY import this in production
  tokens/                       ← source of truth, อย่าแก้โดยตรง
  docs/
    USAGE_VANILLA.md            ← getting started
    COMPONENT_CONTRACTS.md      ← complete component API reference
    VIBE_CODING_GUIDE.md        ← this file
    PROMPT_TEMPLATES.md         ← copy-paste prompts for AI
  snippets/                     ← copy-paste HTML per component
  examples/vanilla-dashboard/   ← working reference implementation
  adapters/react/               ← React adapters (preview only)
  guidelines/                   ← design specimen cards
  ui_kits/hr-demo/              ← full HR app demo (React)
  assets/                       ← logo SVGs
```

**Import ที่ถูกต้องใน production:**
```html
<link rel="stylesheet" href="/design-system/styles.css" />
```

**Import ที่ผิด:**
```html
<script src="_ds_bundle.js"></script>   <!-- React bundle — preview only -->
<link rel="stylesheet" href="tokens/components.css" />  <!-- partial import -->
```
