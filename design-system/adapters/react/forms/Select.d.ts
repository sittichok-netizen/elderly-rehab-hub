import { ReactNode, SelectHTMLAttributes } from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Convenience: render options from data instead of children. */
  options?: (string | SelectOption)[];
  children?: ReactNode;
}

/** Styled native dropdown select with a custom chevron. */
export function Select(props: SelectProps): JSX.Element;
