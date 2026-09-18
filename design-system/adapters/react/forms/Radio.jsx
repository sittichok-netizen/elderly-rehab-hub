import React from "react";

/** Radio button with animated dot. Group by sharing a `name`. */
export function Radio({ label, disabled = false, className = "", ...props }) {
  const cls = ["sensory-check", "is-radio", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="radio" disabled={disabled} {...props} />
      <span className="box"><span className="sensory-radio-dot" /></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
