import { cn } from "@/lib/utils";

type AdminWordmarkProps = {
  className?: string;
};

export function AdminWordmark({ className }: AdminWordmarkProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center text-[1.85rem] font-semibold tracking-[-0.04em] text-[var(--brand-navy)]",
        className
      )}
    >
      <span>MEGA</span>
      <span className="ml-1.5 text-[var(--brand-red)]">MOVEIS</span>
    </span>
  );
}
