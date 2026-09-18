import React from "react";

/** Horizontal progress / usage bar (leave used, goal completion). */
export function ProgressBar({ value = 0, max = 100, tone = "brand", className = "", ...props }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const cls = ["sensory-progress", `tone-${tone}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} {...props}>
      <div className="fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
