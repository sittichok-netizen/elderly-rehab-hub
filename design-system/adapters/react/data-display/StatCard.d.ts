import { ReactNode, HTMLAttributes } from "react";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Metric name. */
  label: ReactNode;
  /** Primary figure (string or number). */
  value: ReactNode;
  /** Small leading icon. */
  icon?: ReactNode;
  /** Change indicator text, e.g. "+12%". */
  delta?: ReactNode;
  /** Arrow direction / colour. @default "up" */
  deltaDir?: "up" | "down";
  /** Sub-text under the value. */
  footer?: ReactNode;
}

/**
 * Dashboard KPI tile: label, large value, trend delta.
 *
 * @startingPoint section="Data Display" subtitle="Dashboard KPI tile with trend delta" viewport="700x180"
 */
export function StatCard(props: StatCardProps): JSX.Element;
