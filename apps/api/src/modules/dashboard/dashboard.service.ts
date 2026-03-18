import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [
      totalProducts,
      totalAvailableProducts,
      totalFeaturedProducts,
      totalOnSaleProducts,
      totalCategories,
      totalActiveCategories,
      totalBrands,
      totalActiveBrands,
      totalBanners,
      totalActiveBanners,
    ] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({
        where: {
          isAvailable: true,
        },
      }),
      this.prisma.product.count({
        where: {
          isFeatured: true,
        },
      }),
      this.prisma.product.count({
        where: {
          isOnSale: true,
        },
      }),
      this.prisma.category.count(),
      this.prisma.category.count({
        where: {
          isActive: true,
        },
      }),
      this.prisma.brand.count(),
      this.prisma.brand.count({
        where: {
          isActive: true,
        },
      }),
      this.prisma.banner.count(),
      this.prisma.banner.count({
        where: {
          isActive: true,
        },
      }),
    ]);

    return {
      products: {
        total: totalProducts,
        available: totalAvailableProducts,
        featured: totalFeaturedProducts,
        onSale: totalOnSaleProducts,
      },
      categories: {
        total: totalCategories,
        active: totalActiveCategories,
      },
      brands: {
        total: totalBrands,
        active: totalActiveBrands,
      },
      banners: {
        total: totalBanners,
        active: totalActiveBanners,
      },
    };
  }
}
