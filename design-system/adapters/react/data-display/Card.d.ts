import { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove the shadow for nested/embedded use. */
  flat?: boolean;
  /** Lift on hover — use for clickable cards. */
  interactive?: boolean;
  children?: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  /** Right-aligned action slot (buttons, menu). */
  action?: ReactNode;
}

/** Raised surface container — the base of every panel. */
export function Card(props: CardProps): JSX.Element;
/** Card header with title + optional action slot and a divider. */
export function CardHeader(props: CardHeaderProps): JSX.Element;
/** Padded card body region. */
export function CardBody(props: HTMLAttributes<HTMLDivElement>): JSX.Element;
