import React from "react";

function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Circular avatar — shows an image, or initials fallback. */
export function Avatar({ name = "", src, size = "md", status = false, className = "", style, ...props }) {
  const cls = ["sensory-avatar", `is-${size}`, status ? "sensory-avatar-status" : "", className]
    .filter(Boolean).join(" ");
  return (
    <span className={cls} style={style} title={name || undefined} {...props}>
      {src ? <img src={src} alt={name} /> : initialsOf(name)}
    </span>
  );
}

/** Overlapping stack of avatars with an optional "+N" overflow chip. */
export function AvatarGroup({ people = [], max = 4, size = "sm" }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="sensory-avatar-group">
      {shown.map((p, i) => (
        <Avatar key={i} name={p.name} src={p.src} size={size} />
      ))}
      {extra > 0 ? (
        <span className={`sensory-avatar is-${size}`} style={{ background: "var(--surface-sunken)", color: "var(--text-muted)" }}>
          +{extra}
        </span>
      ) : null}
    </span>
  );
}
