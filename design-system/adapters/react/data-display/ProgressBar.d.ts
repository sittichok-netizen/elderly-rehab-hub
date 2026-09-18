import { HTMLAttributes } from "react";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value. @default 0 */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Fill colour. @default "brand" */
  tone?: "brand" | "success" | "warning" | "danger";
}

/** Thin progress bar for leave usage, goal completion, onboarding steps. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
