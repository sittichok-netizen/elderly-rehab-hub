import React, { useId } from "react";

/** Styled native select. Pass <option> children or an `options` array. */
export function Select({ label, hint, error, options, id, className = "", children, ...props }) {
  const autoId = useId();
  const selId = id || autoId;
  const cls = ["sensory-select", error ? "has-error" : "", className].filter(Boolean).join(" ");
  return (
    <div className="sensory-field">
      {label ? (
        <label className="sensory-label" htmlFor={selId}>
          {label}{props.required ? <span className="req">*</span> : null}
        </label>
      ) : null}
      <select id={selId} className={cls} aria-invalid={error ? "true" : undefined} {...props}>
        {options
          ? options.map((o) => {
              const value = typeof o === "string" ? o : o.value;
              const labelText = typeof o === "string" ? o : o.label;
              return <option key={value} value={value}>{labelText}</option>;
            })
          : children}
      </select>
      {error ? <span className="sensory-hint is-error">{error}</span>
        : hint ? <span className="sensory-hint">{hint}</span> : null}
    </div>
  );
}
