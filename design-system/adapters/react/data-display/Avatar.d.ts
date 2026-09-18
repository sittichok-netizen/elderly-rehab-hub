import { HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials fallback and the title tooltip. */
  name?: string;
  /** Image URL; falls back to initials when absent. */
  src?: string;
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
  /** Show an online status dot. */
  status?: boolean;
}

export interface AvatarGroupProps {
  people: { name: string; src?: string }[];
  /** Max avatars before collapsing into "+N". @default 4 */
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
}

/** Circular user avatar with image-or-initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
/** Overlapping avatar stack with overflow chip. */
export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
