import { ReactNode, ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render with a card surface + border instead of transparent. */
  solid?: boolean;
  /** Required for screen readers. */
  "aria-label": string;
  children?: ReactNode;
}

/** Compact icon-only button for toolbars, table rows and headers. */
export function IconButton(props: IconButtonProps): JSX.Element;
