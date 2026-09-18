import React from "react";

/** Surface container. Compose with CardHeader / CardBody or use freely. */
export function Card({ flat = false, interactive = false, className = "", children, ...props }) {
  const cls = ["sensory-card", flat ? "is-flat" : "", interactive ? "is-interactive" : "", className]
    .filter(Boolean).join(" ");
  return <div className={cls} {...props}>{children}</div>;
}

export function CardHeader({ title, action, className = "", children, ...props }) {
  const cls = ["sensory-card-header", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      {title ? <span className="sensory-card-title">{title}</span> : children}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function CardBody({ className = "", children, ...props }) {
  const cls = ["sensory-card-pad", className].filter(Boolean).join(" ");
  return <div className={cls} {...props}>{children}</div>;
}
