import { ReactNode, TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

/** Multi-line text field for notes, reasons and feedback. */
export function Textarea(props: TextareaProps): JSX.Element;
