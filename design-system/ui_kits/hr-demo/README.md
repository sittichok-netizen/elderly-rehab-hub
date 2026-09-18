# HAH Sensory — Application UI kit

A high-fidelity, interactive recreation of the **HAH Sensory** HRM product, composing the design-system primitives.

Open `index.html`. It's a click-through:

- **หน้าหลัก (Dashboard)** — KPI tiles, recent leave requests, personal leave balances. "ขอลา" → leave form.
- **การลา (Leave)** — request form: type, date range, duration, reason, live balance alert. Submit → confirmation toast.
- **รออนุมัติ (Approvals)** — manager inbox. Approve/Reject inline, or open a row for the detail drawer. Actions update the sidebar badge + fire a toast.
- **พนักงาน (People)** — searchable, filterable employee directory table.
- Evaluation / Reports / Settings are intentionally stubbed.

## Files
- `index.html` — app shell, navigation state, detail drawer, toasts. Loads `../../_ds_bundle.js`, `../../styles.css`, `kit.css`.
- `kit.css` — product-shell layout only (sidebar, topbar, table, drawer, list rows). Not reusable primitives.
- `Shell.jsx` — `Sidebar`, `Topbar`.
- `Dashboard.jsx`, `LeaveRequest.jsx`, `Approvals.jsx`, `People.jsx` — the screens.

Screens compose design-system components (`Button`, `Card`, `Badge`, `Avatar`, `StatCard`, `ProgressBar`, `Tabs`, `Input`, `Select`, `Radio`, `Textarea`, `Alert`, `Tooltip`, `IconButton`) from `window.HAHSensoryDS`. Icons are Lucide (CDN).
