import React from "react";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Checkbox with animated tick. Controlled via `checked` / `onChange`. */
export function Checkbox({ label, disabled = false, className = "", ...props }) {
  const cls = ["sensory-check", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="checkbox" disabled={disabled} {...props} />
      <span className="box"><CheckIcon /></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
