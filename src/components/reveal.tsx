import type { ElementType, ReactNode } from "react";

import { useReveal } from "@/hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms before the reveal transition starts */
  delay?: number;
};

/**
 * Wraps children and fades/slides them in when scrolled into view.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
