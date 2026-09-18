import React from "react";

/** Hover/focus tooltip. Wraps its trigger children. */
export function Tooltip({ label, children, className = "", ...props }) {
  const cls = ["sensory-tooltip-wrap", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {children}
      <span className="sensory-tooltip" role="tooltip">{label}</span>
    </span>
  );
}
