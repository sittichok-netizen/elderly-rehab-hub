import React from "react";

/** Removable chip — filters, selected people, skills. */
export function Tag({ onRemove, className = "", children, ...props }) {
  const cls = ["sensory-tag", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {children}
      {onRemove ? (
        <button type="button" className="remove" aria-label="ลบ" onClick={onRemove}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
