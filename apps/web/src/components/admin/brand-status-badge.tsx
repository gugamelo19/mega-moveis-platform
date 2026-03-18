type BrandStatusBadgeProps = {
    isActive: boolean
}

export function BrandStatusBadge({ isActive }: BrandStatusBadgeProps) {
    return (
        <span className={
            isActive 
            ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700"
            : "inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700"
        }
        >
            {isActive ? "Ativa" : "Inativa"}
        </span>
    );
}

