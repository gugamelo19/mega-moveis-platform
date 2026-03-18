import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { slugify } from '../../common/utils/slugify.util';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryAdminProductsDto } from './dto/query-admin-products.dto';
import { QueryPublicProductsDto } from './dto/query-public-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const publicProductInclude = Prisma.validator<Prisma.ProductInclude>()({
  category: true,
  brand: true,
  images: {
    orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
  },
  specifications: {
    orderBy: [{ sortOrder: 'asc' }],
  },
});

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const slug = slugify(createProductDto.name);

    const existingProduct = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      throw new ConflictException('Já existe um produto com esse nome');
    }

    await this.ensureCategoryExists(createProductDto.categoryId);
    await this.ensureBrandExists(createProductDto.brandId);

    if (
      createProductDto.compareAtPrice !== undefined &&
      createProductDto.compareAtPrice < createProductDto.price
    ) {
      throw new ConflictException(
        'O preço comparativo deve ser maior ou igual ao preço atual',
      );
    }

    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        slug,
        shortDescription: createProductDto.shortDescription,
        description: createProductDto.description,
        price: new Prisma.Decimal(createProductDto.price),
        compareAtPrice:
          createProductDto.compareAtPrice !== undefined
            ? new Prisma.Decimal(createProductDto.compareAtPrice)
            : undefined,
        sku: createProductDto.sku,
        isAvailable: createProductDto.isAvailable ?? true,
        isFeatured: createProductDto.isFeatured ?? false,
        isOnSale: createProductDto.isOnSale ?? false,
        categoryId: createProductDto.categoryId,
        brandId: createProductDto.brandId,
        specifications:
          createProductDto.specifications &&
          createProductDto.specifications.length > 0
            ? {
                create: createProductDto.specifications.map(
                  (specification, index) => ({
                    name: specification.name,
                    value: specification.value,
                    sortOrder: specification.sortOrder ?? index,
                  }),
                ),
              }
            : undefined,
      },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
        },
        specifications: {
          orderBy: [{ sortOrder: 'asc' }],
        },
      },
    });
  }

  async findAllPublic(query: QueryPublicProductsDto) {
    const where: Prisma.ProductWhereInput = {
      isAvailable: true,
    };

    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured === 'true';
    }

    if (query.isOnSale !== undefined) {
      where.isOnSale = query.isOnSale === 'true';
    }

    return this.prisma.product.findMany({
      where,
      include: publicProductInclude,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findAllAdmin(query: QueryAdminProductsDto) {
    const where: Prisma.ProductWhereInput = {};

    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (query.isAvailable !== undefined) {
      where.isAvailable = query.isAvailable === 'true';
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured === 'true';
    }

    if (query.isOnSale !== undefined) {
      where.isOnSale = query.isOnSale === 'true';
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOneById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
        },
        specifications: {
          orderBy: [{ sortOrder: 'asc' }],
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findOneBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: publicProductInclude,
    });

    if (!product || !product.isAvailable) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findFeaturedProducts(limit = 8) {
    return this.prisma.product.findMany({
      where: {
        isAvailable: true,
        isFeatured: true,
      },
      include: publicProductInclude,
      orderBy: [{ createdAt: 'desc' }],
      take: limit,
    });
  }

  async findOnSaleProducts(limit = 8) {
    return this.prisma.product.findMany({
      where: {
        isAvailable: true,
        isOnSale: true,
      },
      include: publicProductInclude,
      orderBy: [{ createdAt: 'desc' }],
      take: limit,
    });
  }

  async findProductsByCategorySlug(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: category.id,
        isAvailable: true,
      },
      include: publicProductInclude,
      orderBy: [{ createdAt: 'desc' }],
    });

    return {
      category,
      products,
    };
  }

  async findRelatedProducts(slug: string, limit = 4) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (!product || !product.isAvailable) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.prisma.product.findMany({
      where: {
        isAvailable: true,
        categoryId: product.categoryId,
        id: {
          not: product.id,
        },
      },
      include: publicProductInclude,
      orderBy: [{ createdAt: 'desc' }],
      take: limit,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOneById(id);

    let nextSlug = product.slug;

    if (
      updateProductDto.name &&
      updateProductDto.name.trim() !== product.name
    ) {
      nextSlug = slugify(updateProductDto.name);

      const existingProduct = await this.prisma.product.findUnique({
        where: { slug: nextSlug },
      });

      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictException('Já existe um produto com esse nome');
      }
    }

    if (updateProductDto.categoryId) {
      await this.ensureCategoryExists(updateProductDto.categoryId);
    }

    if (updateProductDto.brandId) {
      await this.ensureBrandExists(updateProductDto.brandId);
    }

    const nextPrice =
      updateProductDto.price !== undefined
        ? updateProductDto.price
        : Number(product.price);

    const nextCompareAtPrice =
      updateProductDto.compareAtPrice !== undefined
        ? updateProductDto.compareAtPrice
        : product.compareAtPrice !== null
          ? Number(product.compareAtPrice)
          : undefined;

    if (nextCompareAtPrice !== undefined && nextCompareAtPrice < nextPrice) {
      throw new ConflictException(
        'O preço comparativo deve ser maior ou igual ao preço atual',
      );
    }

    await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name ?? product.name,
        slug: nextSlug,
        shortDescription:
          updateProductDto.shortDescription !== undefined
            ? updateProductDto.shortDescription
            : product.shortDescription,
        description: updateProductDto.description ?? product.description,
        price:
          updateProductDto.price !== undefined
            ? new Prisma.Decimal(updateProductDto.price)
            : product.price,
        compareAtPrice:
          updateProductDto.compareAtPrice !== undefined
            ? new Prisma.Decimal(updateProductDto.compareAtPrice)
            : product.compareAtPrice,
        sku:
          updateProductDto.sku !== undefined
            ? updateProductDto.sku
            : product.sku,
        isAvailable:
          updateProductDto.isAvailable !== undefined
            ? updateProductDto.isAvailable
            : product.isAvailable,
        isFeatured:
          updateProductDto.isFeatured !== undefined
            ? updateProductDto.isFeatured
            : product.isFeatured,
        isOnSale:
          updateProductDto.isOnSale !== undefined
            ? updateProductDto.isOnSale
            : product.isOnSale,
        categoryId: updateProductDto.categoryId ?? product.categoryId,
        brandId: updateProductDto.brandId ?? product.brandId,
      },
    });

    if (updateProductDto.specifications !== undefined) {
      await this.prisma.productSpecification.deleteMany({
        where: { productId: id },
      });

      if (updateProductDto.specifications.length > 0) {
        await this.prisma.productSpecification.createMany({
          data: updateProductDto.specifications.map((specification, index) => ({
            productId: id,
            name: specification.name,
            value: specification.value,
            sortOrder: specification.sortOrder ?? index,
          })),
        });
      }
    }

    return this.findOneById(id);
  }

  async remove(id: string) {
    await this.findOneById(id);

    await this.prisma.productSpecification.deleteMany({
      where: { productId: id },
    });

    await this.prisma.productImage.deleteMany({
      where: { productId: id },
    });

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Produto removido com sucesso',
    };
  }

  private async ensureCategoryExists(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }

  private async ensureBrandExists(brandId: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }
  }
}
