import { cn } from "@/lib/utils";

type AdminWordmarkProps = {
  className?: string;
};

export function AdminWordmark({ className }: AdminWordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-end gap-2 leading-none",
        className
      )}
    >
      <span className="font-display text-[2.25rem] text-(--brand-navy)">
        Mega
      </span>
      <span className="pb-1 text-[0.82rem] font-extrabold uppercase tracking-[0.24em] text-(--brand-red)">
        Moveis
      </span>
    </span>
  );
}
