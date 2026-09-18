import React from "react";

/** Square icon-only button. Always pass `aria-label` for accessibility. */
export function IconButton({ size = "md", solid = false, className = "", children, ...props }) {
  const cls = ["sensory-iconbtn", `is-${size}`, solid ? "is-solid" : "", className]
    .filter(Boolean).join(" ");
  return <button className={cls} {...props}>{children}</button>;
}
