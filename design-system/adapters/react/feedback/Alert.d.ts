import { ReactNode, HTMLAttributes } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic tone — sets icon + colours. @default "info" */
  tone?: "info" | "success" | "warning" | "danger";
  /** Bold heading line. */
  title?: ReactNode;
  /** Message body. */
  children?: ReactNode;
}

/** Inline banner for confirmations, warnings and policy notices. */
export function Alert(props: AlertProps): JSX.Element;
