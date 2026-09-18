Dropdown select for choosing leave types, departments, statuses, etc.

```jsx
<Select label="ประเภทการลา" options={["ลาป่วย", "ลากิจ", "ลาพักร้อน"]} />
<Select label="แผนก" options={[{ value: "eng", label: "วิศวกรรม" }]} />
```

Pass `options` (strings or `{value,label}`) or raw `<option>` children. Custom chevron, full native select behaviour.
