export type DashboardSummary = {
  products: {
    total: number;
    available: number;
    featured: number;
    onSale: number;
  };
  categories: {
    total: number;
    active: number;
  };
  brands: {
    total: number;
    active: number;
  };
  banners: {
    total: number;
    active: number;
  };
};