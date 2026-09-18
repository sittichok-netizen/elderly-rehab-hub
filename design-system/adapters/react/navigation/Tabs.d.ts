export interface TabItem {
  value: string;
  label: string;
  /** Optional count chip on the tab. */
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** @default "underline" */
  variant?: "underline" | "pill";
  className?: string;
}

/**
 * Tab navigation for switching views (e.g. My Requests / Team / History).
 *
 * @startingPoint section="Navigation" subtitle="Underline & pill tab bars with counts" viewport="700x120"
 */
export function Tabs(props: TabsProps): JSX.Element;
