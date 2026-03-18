import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { slugify } from '../../common/utils/slugify.util';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { QueryBrandsDto } from './dto/query-brands.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const slug = slugify(createBrandDto.name);

    const existingBrand = await this.prisma.brand.findUnique({
      where: { slug },
    });

    if (existingBrand) {
      throw new ConflictException('Já existe uma marca com esse nome');
    }

    return this.prisma.brand.create({
      data: {
        name: createBrandDto.name,
        slug,
        logoUrl: createBrandDto.logoUrl,
        isActive: createBrandDto.isActive ?? true,
      },
    });
  }

  async findAllPublic() {
    return this.prisma.brand.findMany({
      where: { isActive: true },
      orderBy: [{ name: 'asc' }],
    });
  }

  async findAllAdmin(query: QueryBrandsDto) {
    const where: Prisma.BrandWhereInput = {};

    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    return this.prisma.brand.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOneById(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }

    return brand;
  }

  async findOneBySlug(slug: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { slug },
    });

    if (!brand || !brand.isActive) {
      throw new NotFoundException('Marca não encontrada');
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOneById(id);

    let nextSlug = brand.slug;

    if (updateBrandDto.name && updateBrandDto.name.trim() !== brand.name) {
      nextSlug = slugify(updateBrandDto.name);

      const existingBrand = await this.prisma.brand.findUnique({
        where: { slug: nextSlug },
      });

      if (existingBrand && existingBrand.id !== id) {
        throw new ConflictException('Já existe uma marca com esse nome');
      }
    }

    return this.prisma.brand.update({
      where: { id },
      data: {
        name: updateBrandDto.name ?? brand.name,
        slug: nextSlug,
        logoUrl:
          updateBrandDto.logoUrl !== undefined
            ? updateBrandDto.logoUrl
            : brand.logoUrl,
        isActive:
          updateBrandDto.isActive !== undefined
            ? updateBrandDto.isActive
            : brand.isActive,
      },
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    const relatedProductsCount = await this.prisma.product.count({
      where: { brandId: id },
    });

    if (relatedProductsCount > 0) {
      throw new ConflictException(
        'Não é possível excluir uma marca que possui produtos vinculados',
      );
    }

    await this.prisma.brand.delete({
      where: { id },
    });

    return {
      message: 'Marca removida com sucesso',
    };
  }
}
