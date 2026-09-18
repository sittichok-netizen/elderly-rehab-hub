Dashboard KPI tile (headcount, leave balance, pending approvals) — a self-contained card.

```jsx
<StatCard label="รออนุมัติ" value={8} icon={<i data-lucide="clock" />} delta="+3" deltaDir="up" footer="สัปดาห์นี้" />
```

`deltaDir` sets the arrow and colour (`up` = success, `down` = danger). Numbers use tabular figures.
