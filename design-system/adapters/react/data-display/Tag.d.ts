import { ReactNode, HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** When provided, renders a remove (×) button that calls this. */
  onRemove?: () => void;
  children?: ReactNode;
}

/** Removable chip for filters, selected people and skill tags. */
export function Tag(props: TagProps): JSX.Element;
