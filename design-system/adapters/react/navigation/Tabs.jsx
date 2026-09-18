import React, { useState } from "react";

/**
 * Tab bar. Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * `items`: [{ value, label, count? }].
 */
export function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", className = "" }) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const current = value !== undefined ? value : internal;
  const select = (v) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  const cls = ["sensory-tabs", `is-${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="tablist">
      {items.map((it) => {
        const active = it.value === current;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={["sensory-tab", active ? "is-active" : ""].filter(Boolean).join(" ")}
            onClick={() => select(it.value)}
          >
            {it.label}
            {it.count != null ? <span className="tab-count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
