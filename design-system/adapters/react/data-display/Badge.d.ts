import { ReactNode, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. @default "neutral" */
  tone?: "neutral" | "brand" | "success" | "warning" | "danger" | "info";
  /** Solid fill instead of soft tint (brand/success/danger only). */
  solid?: boolean;
  /** Show a leading status dot. */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * Compact status pill for approval, leave and evaluation states.
 *
 * @startingPoint section="Data Display" subtitle="Status pills in six semantic tones" viewport="700x120"
 */
export function Badge(props: BadgeProps): JSX.Element;
