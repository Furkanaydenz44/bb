import type { ReactNode } from "react";

type ChipVariant =
  | "muted" // category / condition — neutral grey pill
  | "violet" // informational (soft violet)
  | "lime" // positive / count (soft lime)
  | "acil" // seller signal: urgent (dark + lime, high emphasis)
  | "pazarlik" // seller signal: open to negotiate (soft lime)
  | "good"
  | "danger";

const variants: Record<ChipVariant, string> = {
  muted: "bg-page text-ink-500",
  violet: "bg-primary-soft text-primary-hover",
  lime: "bg-accent-soft text-accent-ink",
  acil: "bg-danger-soft text-danger", // yumuşak kırmızı
  pazarlik: "bg-accent-soft text-accent-ink",
  good: "bg-accent-soft text-accent-ink",
  danger: "bg-danger-soft text-danger",
};

export function Chip({
  children,
  variant = "muted",
  className = "",
}: {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[10.5px] font-bold leading-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
