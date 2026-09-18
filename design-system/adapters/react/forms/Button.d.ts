import { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "brand-soft";
  /** Control height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Icon node rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon node rendered after the label. */
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * The core action button for HAH Sensory.
 *
 * @startingPoint section="Forms" subtitle="Action button with 5 intents and 3 sizes" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
