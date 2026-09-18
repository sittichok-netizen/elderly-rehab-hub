Tab bar for switching between views — request lists, profile sections, report periods.

```jsx
<Tabs
  variant="underline"
  defaultValue="mine"
  items={[
    { value: "mine", label: "คำขอของฉัน" },
    { value: "team", label: "ทีม", count: 4 },
    { value: "history", label: "ประวัติ" },
  ]}
  onChange={setTab}
/>
```

`variant`: `underline` (default, for page sections) or `pill` (for compact filters). Add `count` for a chip.
