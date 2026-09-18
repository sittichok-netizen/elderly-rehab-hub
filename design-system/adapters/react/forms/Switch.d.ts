import { ReactNode, InputHTMLAttributes } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional label rendered to the right. */
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

/** Binary on/off toggle for settings and preferences. */
export function Switch(props: SwitchProps): JSX.Element;
