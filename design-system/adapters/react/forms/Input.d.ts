import { ReactNode, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Helper text below the field. */
  hint?: ReactNode;
  /** Error message — replaces hint and switches the field to the error style. */
  error?: ReactNode;
  /** Icon node shown inside the field, leading edge. */
  leadingIcon?: ReactNode;
}

/**
 * Single-line text field with label, hint/error and optional leading icon.
 *
 * @startingPoint section="Forms" subtitle="Labelled text input with hint & error states" viewport="700x150"
 */
export function Input(props: InputProps): JSX.Element;
