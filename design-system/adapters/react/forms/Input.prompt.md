Labelled text field — the default form input across HAH Sensory forms (leave requests, profile, settings).

```jsx
<Input label="อีเมล" type="email" placeholder="name@company.co.th" required />
<Input label="ค้นหาพนักงาน" leadingIcon={<i data-lucide="search" />} />
<Input label="เลขบัตรประชาชน" error="รูปแบบไม่ถูกต้อง" />
```

`error` overrides `hint` and applies the error border. Accepts all native input attrs (`type`, `value`, `onChange`, `disabled`, `required`).
