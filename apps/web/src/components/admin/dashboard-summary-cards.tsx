import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardSummary } from "@/features/dashboard/types/dashboard-summary.type";

type DashboardSummaryCardsProps = {
  summary: DashboardSummary;
};

export function DashboardSummaryCards({
  summary,
}: DashboardSummaryCardsProps) {
  const cards = [
    {
      title: "Produtos",
      value: summary.products.total,
      description: `${summary.products.available} disponíveis`,
    },
    {
      title: "Categorias",
      value: summary.categories.total,
      description: `${summary.categories.active} ativas`,
    },
    {
      title: "Marcas",
      value: summary.brands.total,
      description: `${summary.brands.active} ativas`,
    },
    {
      title: "Banners",
      value: summary.banners.total,
      description: `${summary.banners.active} ativos`,
    },
    {
      title: "Produtos em destaque",
      value: summary.products.featured,
      description: "Visíveis nas seções de destaque",
    },
    {
      title: "Produtos em oferta",
      value: summary.products.onSale,
      description: "Marcados como promoção",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {card.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{card.value}</div>
            <p className="mt-2 text-sm text-slate-500">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}