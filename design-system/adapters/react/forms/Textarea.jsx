import React, { useId } from "react";

/** Multi-line text field with label / hint / error. */
export function Textarea({ label, hint, error, id, className = "", ...props }) {
  const autoId = useId();
  const taId = id || autoId;
  const cls = ["sensory-textarea", error ? "has-error" : "", className].filter(Boolean).join(" ");
  return (
    <div className="sensory-field">
      {label ? (
        <label className="sensory-label" htmlFor={taId}>
          {label}{props.required ? <span className="req">*</span> : null}
        </label>
      ) : null}
      <textarea id={taId} className={cls} aria-invalid={error ? "true" : undefined} {...props} />
      {error ? <span className="sensory-hint is-error">{error}</span>
        : hint ? <span className="sensory-hint">{hint}</span> : null}
    </div>
  );
}
