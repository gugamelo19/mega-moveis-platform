type ProductFlagsProps = {
  isFeatured: boolean;
  isOnSale: boolean;
};

export function ProductFlags({
  isFeatured,
  isOnSale,
}: ProductFlagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {isFeatured ? (
        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
          Destaque
        </span>
      ) : null}

      {isOnSale ? (
        <span className="inline-flex rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
          Oferta
        </span>
      ) : null}

      {!isFeatured && !isOnSale ? (
        <span className="inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
          Sem flags
        </span>
      ) : null}
    </div>
  );
}