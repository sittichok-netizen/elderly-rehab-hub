import { ReactNode, InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Text shown beside the box. */
  label?: ReactNode;
  disabled?: boolean;
}

/** Single checkbox with an animated tick. */
export function Checkbox(props: CheckboxProps): JSX.Element;
