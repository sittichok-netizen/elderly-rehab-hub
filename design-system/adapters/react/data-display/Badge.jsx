import React from "react";

/** Status pill. Tones convey HR state (approved, pending, rejected, etc). */
export function Badge({ tone = "neutral", solid = false, dot = false, className = "", children, ...props }) {
  const cls = ["sensory-badge", `tone-${tone}`, solid ? "is-solid" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {dot ? <span className="dot" /> : null}
      {children}
    </span>
  );
}
