type ProductAvailabilityBadgeProps = {
  isAvailable: boolean;
};

export function ProductAvailabilityBadge({
  isAvailable,
}: ProductAvailabilityBadgeProps) {
  return (
    <span
      className={
        isAvailable
          ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700"
          : "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700"
      }
    >
      {isAvailable ? "Disponível" : "Indisponível"}
    </span>
  );
}