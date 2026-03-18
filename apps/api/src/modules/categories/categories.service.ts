import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { slugify } from '../../common/utils/slugify.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = slugify(createCategoryDto.name);

    const existingCategory = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      throw new ConflictException('Já existe uma categoria com esse nome');
    }

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
        description: createCategoryDto.description,
        imageUrl: createCategoryDto.imageUrl,
        isActive: createCategoryDto.isActive ?? true,
        sortOrder: createCategoryDto.sortOrder ?? 0,
      },
    });
  }

  async findAllPublic() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  async findAllAdmin(query: QueryCategoriesDto) {
    const where: Prisma.CategoryWhereInput = {};

    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    return this.prisma.category.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOneById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async findOneBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOneById(id);

    let nextSlug = category.slug;

    if (
      updateCategoryDto.name &&
      updateCategoryDto.name.trim() !== category.name
    ) {
      nextSlug = slugify(updateCategoryDto.name);

      const existingCategory = await this.prisma.category.findUnique({
        where: { slug: nextSlug },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Já existe uma categoria com esse nome');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name ?? category.name,
        slug: nextSlug,
        description:
          updateCategoryDto.description !== undefined
            ? updateCategoryDto.description
            : category.description,
        imageUrl:
          updateCategoryDto.imageUrl !== undefined
            ? updateCategoryDto.imageUrl
            : category.imageUrl,
        isActive:
          updateCategoryDto.isActive !== undefined
            ? updateCategoryDto.isActive
            : category.isActive,
        sortOrder:
          updateCategoryDto.sortOrder !== undefined
            ? updateCategoryDto.sortOrder
            : category.sortOrder,
      },
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    const relatedProductsCount = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (relatedProductsCount > 0) {
      throw new ConflictException(
        'Não é possível excluir uma categoria que possui produtos vinculados',
      );
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return {
      message: 'Categoria removida com sucesso',
    };
  }
}
