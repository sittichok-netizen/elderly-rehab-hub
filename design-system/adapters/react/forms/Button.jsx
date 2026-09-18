import React from "react";

/**
 * HAH Sensory primary action button. Variants map to intent: primary (brand),
 * secondary (outline), ghost (low-emphasis), danger (destructive), brand-soft.
 */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  ...props
}) {
  const cls = [
    "sensory-btn",
    `is-${variant}`,
    `is-${size}`,
    block ? "is-block" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button className={cls} {...props}>
      {leadingIcon ? <span className="btn-icon" aria-hidden="true" style={{ display: "inline-flex" }}>{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="btn-icon" aria-hidden="true" style={{ display: "inline-flex" }}>{trailingIcon}</span> : null}
    </button>
  );
}
