# Prompt Templates — HAH Sensory Design System

Template สำเร็จรูปสำหรับสั่ง AI agent สร้าง/แก้ไขหน้าต่างๆ บน  
**Vanilla HTML/CSS/JS + Cloudflare Pages/Workers + Hono + D1**

Copy → วาง → แทนค่าใน `[วงเล็บ]` → ส่ง

---

## Template A — สร้างหน้าใหม่ตั้งแต่ต้น

```
สร้างหน้า [ชื่อหน้า] สำหรับระบบ HAH Sensory HR ด้วย Vanilla HTML/CSS/JS

**Design system:**
- link เดียว: `<link rel="stylesheet" href="/design-system/styles.css">`
- ห้าม import React, Babel, หรือ _ds_bundle.js
- ทุก component ใช้ class `sensory-*` (เช่น sensory-btn, sensory-card, sensory-badge)
- สีและ spacing ใช้ CSS variable จาก token เสมอ (var(--brand), var(--space-4), ฯลฯ)

**References:**
- Component contracts: `hr-design-system/project/docs/COMPONENT_CONTRACTS.md`
- Layout + patterns: `hr-design-system/project/docs/VIBE_CODING_GUIDE.md`
- Working example: `hr-design-system/project/examples/vanilla-dashboard/index.html`
- Snippets: `hr-design-system/project/snippets/[component].html`

**หน้าที่ต้องการ:**
[อธิบายหน้าที่ต้องการ]

**Layout:**
[เช่น: sidebar + main เหมือน dashboard / full-width form / card-based list]

**Component ที่ต้องการ:**
[เช่น: form ขอลา, ตารางพนักงาน, drawer รายละเอียด, stat cards]

**ข้อมูลตัวอย่าง:**
[ระบุ mock data ภาษาไทยที่ realistic — ชื่อ, แผนก, สถานะ ฯลฯ]

**Output:**
- `index.html` — หน้าเดียว, self-contained, ภาษาไทย (lang="th")
- `page.css` — layout-specific styles (token variables เท่านั้น ไม่ hardcode)
- `app.js` — JS สำหรับ tab switching, drawer, toast (ถ้ามี interaction)
```

---

## Template B — เพิ่ม component/section ใน page ที่มีอยู่แล้ว

```
เพิ่ม [ชื่อ component/section] ใน `[path/to/page.html]` ของ HAH Sensory HR

**Design system:** HAH Sensory (styles.css linked อยู่แล้วในไฟล์)

**สิ่งที่ต้องเพิ่ม:**
[อธิบาย component/section ที่ต้องการ]

**วางที่:** [ระบุ section/id ที่จะแทรก เช่น "หลัง stat-grid", "แทนที่ div#placeholder"]

**Component references ที่เกี่ยวข้อง:**
- [ชื่อ component]: `hr-design-system/project/snippets/[name].html`
- Contract: `hr-design-system/project/docs/COMPONENT_CONTRACTS.md#[section]`

**พฤติกรรมที่ต้องการ:**
[เช่น: tab filter กรอง list, คลิก row เปิด drawer, กด button แสดง toast]

**กฎที่ต้องรักษา:**
- sensory-* class เท่านั้น ห้ามสร้าง component ใหม่
- สีจาก token เท่านั้น ห้าม hardcode
- ทุก interactive element ต้องมี aria-label หรือ visible label
- Badge tone ต้องตรงตาม semantic (success=อนุมัติ, warning=รอ, danger=ปฏิเสธ)
```

---

## Template C — แก้ไข style ให้ตรงกับ design system

```
ตรวจสอบและแก้ `[path/to/page.html]` ให้สอดคล้องกับ HAH Sensory Design System

**ปัญหาที่พบ (ถ้าทราบ):**
[เช่น: สีไม่ตรง, font ไม่ใช่ Google Sans, spacing ไม่สม่ำเสมอ]

**กฎที่ต้องผ่าน:**
1. ไม่มีสี hardcode (#hex, rgb, hsl) ที่ไม่ใช่ token
2. ไม่มี font-family ที่ไม่ใช่ --font-sans / --font-display / --font-mono
3. ไม่มี spacing hardcode ที่ไม่ใช่ --space-* (ยกเว้น 0)
4. ทุก button ใช้ sensory-btn + variant + size
5. ทุก badge/status ใช้ sensory-badge + tone ที่ถูก semantic
6. ทุก interactive element มี focus-visible style
7. ไม่มี z-index hardcode นอกจาก --z-* token

**References:**
- Token list: `hr-design-system/project/docs/VIBE_CODING_GUIDE.md#1-token-cheat-sheet`
- Anti-patterns: `hr-design-system/project/docs/VIBE_CODING_GUIDE.md#5-anti-patterns`
- Component contracts: `hr-design-system/project/docs/COMPONENT_CONTRACTS.md`

**Output:** แก้ไขใน file เดิม พร้อม comment อธิบายการเปลี่ยนแปลง
```

---

## Template D — สร้างหน้า form (Leave Request / Employee Edit)

```
สร้างหน้า form [ชื่อฟอร์ม] สำหรับ HAH Sensory HR ด้วย Vanilla HTML/CSS/JS

**Design system:** link `/design-system/styles.css` เท่านั้น

**Form fields ที่ต้องการ:**
[รายการ field พร้อม type และ validation rule เช่น:]
- ชื่อ-นามสกุล (text, required)
- แผนก (select จาก list)
- ประเภทการลา (radio: ลาพักร้อน/ลาป่วย/ลากิจ, required)
- วันที่เริ่ม/สิ้นสุด (date, required, เริ่ม ≤ สิ้นสุด)
- เหตุผล (textarea, required, min 10 ตัวอักษร)
- แจ้งเตือนทางอีเมล (switch)

**Layout:** [เช่น: 2-column grid สำหรับ field สั้น, 1-column สำหรับ textarea]

**Validation:** client-side — แสดง .has-error + .sensory-hint.is-error + role="alert"

**Success state:** [เช่น: redirect / toast / แสดง success alert]

**กฎ form:**
- label → input → hint (เสมอ)
- ใช้ .sensory-field wrapper ทุก field
- Error message ภาษาไทย เฉพาะเจาะจง (ไม่ใช่ "กรุณากรอกข้อมูล")
- Action: secondary (ยกเลิก) + primary (ส่ง) ขวาล่าง

**References:**
- Form snippets: `hr-design-system/project/snippets/input.html`, `select.html`,
  `checkbox.html`, `radio.html`, `switch.html`
- Pattern: `hr-design-system/project/docs/VIBE_CODING_GUIDE.md#34-form-layout`
```

---

## Template E — สร้าง API endpoint (Hono + D1) พร้อม HTML page

```
สร้าง [ชื่อ feature] ครบ stack: Hono API + D1 + Vanilla HTML page ใน Cloudflare Pages

**Stack:**
- Backend: Hono (TypeScript) บน Cloudflare Workers
- Database: D1 (SQLite)
- Frontend: Vanilla HTML + HAH Sensory Design System

**API endpoints ที่ต้องการ:**
- [METHOD] /api/[path] — [description]
- [METHOD] /api/[path] — [description]

**D1 schema (ถ้ามี):**
[SQL CREATE TABLE หรืออธิบาย schema]

**Frontend:**
- Path: /[page-path]
- Layout: [sidebar+main / full-width / modal-based]
- Data source: fetch จาก /api/... แล้ว render เป็น HTML dynamically

**Design system:** `<link rel="stylesheet" href="/design-system/styles.css">`

Loading state: แสดง skeleton หรือ spinner (sensory-btn disabled + text "กำลังโหลด...")
Error state: sensory-alert tone-danger + role="alert"
Empty state: empty state pattern จาก VIBE_CODING_GUIDE.md#37-empty-state

**References:**
- Frontend patterns: `hr-design-system/project/docs/VIBE_CODING_GUIDE.md`
- Working example: `hr-design-system/project/examples/vanilla-dashboard/`
```

---

## Template F — Code review ด้าน design system compliance

```
Review `[path/to/file]` ว่าสอดคล้องกับ HAH Sensory Design System

**Checklist ที่ต้องตรวจ:**

[ ] HTML structure
    - button ใช้ <button> ไม่ใช่ <div>/<span>
    - input ทุกตัวมี <label for=...>
    - table มี <thead> + <th scope="col">
    - interactive element มี aria-label หรือ visible text

[ ] CSS compliance
    - ไม่มี hardcode color (#hex, rgb)
    - ไม่มี hardcode spacing (px) นอกจาก token
    - ไม่มี font-family ที่ไม่ใช่ token
    - ไม่มี z-index > 9 ที่ไม่ใช่ token

[ ] Component usage
    - ทุก button ใช้ sensory-btn + variant
    - ทุก status badge ใช้ tone ที่ถูก semantic
    - ทุก form field อยู่ใน sensory-field wrapper
    - ไม่มี การสร้าง component ใหม่ที่มีอยู่แล้วใน system

[ ] Accessibility
    - focus-visible ทำงานบนทุก interactive element
    - drawer/modal มี role="dialog" + aria-modal + focus trap
    - alert error มี role="alert"
    - tab panel มี role="tabpanel" + hidden attr

[ ] Thai UX copy
    - ไม่มี passive voice หรือ system-speak
    - error message เฉพาะเจาะจง
    - status text ตรงกับ badge tone

**Output:** รายการ issue + suggested fix (พร้อม line reference)
```

---

## Quick Reference: Token ที่ใช้บ่อยที่สุด

```html
<!-- Copy ใช้เป็น starting point ใน page-specific CSS -->
<style>
  /* Shell */
  .my-layout { background: var(--surface-app); color: var(--text-body); font-family: var(--font-sans); }

  /* Card */
  .my-card { background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }

  /* Spacing */
  .my-section { padding: var(--space-6); gap: var(--space-4); }

  /* Typography */
  .my-heading { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--fw-semibold); color: var(--text-heading); }
  .my-label   { font-size: var(--text-sm); font-weight: var(--fw-medium); color: var(--text-muted); }
  .my-data    { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

  /* Motion */
  .my-hover { transition: background var(--dur-base) var(--ease-out); }
  .my-hover:hover { background: var(--surface-hover); }

  /* Focus */
  .my-control:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
</style>
```
