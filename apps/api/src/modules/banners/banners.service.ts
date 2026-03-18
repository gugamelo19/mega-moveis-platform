import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBannerDto } from './dto/create-banner.dto';
import { QueryBannersDto } from './dto/query-banners.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBannerDto: CreateBannerDto) {
    return this.prisma.banner.create({
      data: {
        title: createBannerDto.title,
        subtitle: createBannerDto.subtitle,
        imageUrl: createBannerDto.imageUrl,
        linkUrl: createBannerDto.linkUrl,
        isActive: createBannerDto.isActive ?? true,
        sortOrder: createBannerDto.sortOrder ?? 0,
      },
    });
  }

  async findAllPublic() {
    return this.prisma.banner.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findAllAdmin(query: QueryBannersDto) {
    const where: Prisma.BannerWhereInput = {};

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    return this.prisma.banner.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOneById(id: string) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner não encontrado');
    }

    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    const banner = await this.findOneById(id);

    return this.prisma.banner.update({
      where: { id },
      data: {
        title: updateBannerDto.title ?? banner.title,
        subtitle:
          updateBannerDto.subtitle !== undefined
            ? updateBannerDto.subtitle
            : banner.subtitle,
        imageUrl:
          updateBannerDto.imageUrl !== undefined
            ? updateBannerDto.imageUrl
            : banner.imageUrl,
        linkUrl:
          updateBannerDto.linkUrl !== undefined
            ? updateBannerDto.linkUrl
            : banner.linkUrl,
        isActive:
          updateBannerDto.isActive !== undefined
            ? updateBannerDto.isActive
            : banner.isActive,
        sortOrder:
          updateBannerDto.sortOrder !== undefined
            ? updateBannerDto.sortOrder
            : banner.sortOrder,
      },
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    await this.prisma.banner.delete({
      where: { id },
    });

    return {
      message: 'Banner removido com sucesso',
    };
  }
}
