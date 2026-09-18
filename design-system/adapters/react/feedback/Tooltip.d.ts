import { ReactNode, HTMLAttributes } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text shown on hover/focus. */
  label: ReactNode;
  /** Trigger element(s). */
  children: ReactNode;
}

/** Dark hover/focus tooltip positioned above the trigger. */
export function Tooltip(props: TooltipProps): JSX.Element;
