import Link from "next/link";

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
  baseParams: URLSearchParams;
};

export function CatalogPagination({
  currentPage,
  totalPages,
  baseParams,
}: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function buildHref(page: number) {
    const params = new URLSearchParams(baseParams.toString());
    params.set("page", String(page));
    return `/products?${params.toString()}`;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className="mm-btn-outline h-10 px-4">
          Anterior
        </Link>
      ) : null}

      <span className="text-sm text-(--mm-text-soft)">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className="mm-btn-outline h-10 px-4">
          Próxima
        </Link>
      ) : null}
    </div>
  );
}