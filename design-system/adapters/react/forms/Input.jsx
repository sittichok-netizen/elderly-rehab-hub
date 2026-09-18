import React, { useId } from "react";

/** Text input with optional label, hint/error and a leading icon. */
export function Input({
  label,
  hint,
  error,
  leadingIcon,
  id,
  className = "",
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const inputCls = ["sensory-input", error ? "has-error" : "", className].filter(Boolean).join(" ");
  const input = (
    <input id={inputId} className={inputCls} aria-invalid={error ? "true" : undefined} {...props} />
  );
  return (
    <div className="sensory-field">
      {label ? (
        <label className="sensory-label" htmlFor={inputId}>
          {label}{props.required ? <span className="req">*</span> : null}
        </label>
      ) : null}
      {leadingIcon ? (
        <div className="sensory-input-wrap">
          <span className="lead-icon" aria-hidden="true">{leadingIcon}</span>
          {input}
        </div>
      ) : input}
      {error ? <span className="sensory-hint is-error">{error}</span>
        : hint ? <span className="sensory-hint">{hint}</span> : null}
    </div>
  );
}
