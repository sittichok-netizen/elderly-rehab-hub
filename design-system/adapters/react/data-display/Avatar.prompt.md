User avatar with automatic initials fallback, plus an overlapping `AvatarGroup` for teams/approvers.

```jsx
<Avatar name="สมชาย ใจดี" size="md" status />
<Avatar name="Anna Lee" src="/anna.jpg" />
<AvatarGroup people={[{name:"สมชาย ใจดี"},{name:"Anna Lee"},{name:"Ravi K"}]} max={3} />
```

Sizes `xs` / `sm` / `md` / `lg`. `status` adds an online dot.
