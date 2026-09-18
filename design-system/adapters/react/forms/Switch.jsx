import React, { useId } from "react";

/** Toggle switch. Controlled via `checked` / `onChange`. */
export function Switch({ label, checked, onChange, disabled = false, id, className = "", ...props }) {
  const autoId = useId();
  const sid = id || autoId;
  const cls = ["sensory-switch", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return (
    <label className={cls} htmlFor={sid}>
      <input id={sid} type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} {...props} />
      <span className="track"><span className="thumb" /></span>
      {label ? <span className="switch-label">{label}</span> : null}
    </label>
  );
}
