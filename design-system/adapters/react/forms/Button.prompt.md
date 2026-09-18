Primary action control for HAH Sensory — use for any clickable action; pick the variant by intent.

```jsx
<Button variant="primary" size="md">บันทึก</Button>
<Button variant="secondary" leadingIcon={<i data-lucide="download" />}>ดาวน์โหลด</Button>
<Button variant="danger">ปฏิเสธคำขอ</Button>
```

Variants: `primary` (brand fill, default), `secondary` (outline), `ghost` (transparent), `danger` (destructive), `brand-soft` (tinted). Sizes: `sm` / `md` / `lg`. Pass `block` to fill width, `leadingIcon` / `trailingIcon` for icons, and any native button attrs (`disabled`, `onClick`, `type`).
