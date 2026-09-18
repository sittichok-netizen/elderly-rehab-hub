import React from "react";

/** KPI tile — label, big value and optional delta. Wrap in a Card. */
export function StatCard({ label, value, icon, delta, deltaDir = "up", footer, className = "", ...props }) {
  const cls = ["sensory-card", "sensory-stat", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <span className="stat-label">
        {icon ? <span aria-hidden="true" style={{ display: "inline-flex", color: "var(--brand)" }}>{icon}</span> : null}
        {label}
      </span>
      <span className="stat-value tabular">{value}</span>
      {delta != null ? (
        <span className={`stat-delta ${deltaDir}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            style={{ transform: deltaDir === "down" ? "rotate(180deg)" : "none" }}>
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
          {delta}
        </span>
      ) : null}
      {footer ? <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{footer}</span> : null}
    </div>
  );
}
