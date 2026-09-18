import { ReactNode, InputHTMLAttributes } from "react";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  disabled?: boolean;
}

/** Radio button — group several by sharing the same `name`. */
export function Radio(props: RadioProps): JSX.Element;
