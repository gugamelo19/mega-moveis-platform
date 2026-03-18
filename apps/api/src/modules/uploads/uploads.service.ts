import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { cloudinary } from '../../config/cloudinary.config';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadProductImageDto } from './dto/upload-product-image.dto';
import { isUploadedFile } from './utils/is-uploaded-file.util';

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadProductImage(
    file: unknown,
    uploadProductImageDto: UploadProductImageDto,
  ) {
    if (!isUploadedFile(file)) {
      throw new BadRequestException(
        'Arquivo inválido: o buffer da imagem não foi recebido corretamente',
      );
    }

    await this.ensureProductExists(uploadProductImageDto.productId);

    const uploadResult = await this.uploadBufferToCloudinary(
      file.buffer,
      'mega-moveis/products',
    );

    if (uploadProductImageDto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: {
          productId: uploadProductImageDto.productId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const productImage = await this.prisma.productImage.create({
      data: {
        productId: uploadProductImageDto.productId,
        imageUrl: uploadResult.secure_url,
        altText: uploadProductImageDto.altText,
        sortOrder: uploadProductImageDto.sortOrder ?? 0,
        isPrimary: uploadProductImageDto.isPrimary ?? false,
      },
    });

    return productImage;
  }

  async removeProductImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Imagem não encontrada');
    }

    await this.prisma.productImage.delete({
      where: { id: imageId },
    });

    return {
      message: 'Imagem removida com sucesso',
    };
  }

  private async ensureProductExists(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  private async uploadBufferToCloudinary(
    fileBuffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);

            reject(
              new BadRequestException(
                typeof error.message === 'string'
                  ? error.message
                  : 'Erro ao enviar imagem para o Cloudinary',
              ),
            );
            return;
          }

          if (!result) {
            reject(new BadRequestException('Upload não retornou resultado'));
            return;
          }

          resolve(result);
        },
      );

      stream.end(fileBuffer);
    });
  }

  async getProductImages(productId: string) {
    await this.ensureProductExists(productId);

    return this.prisma.productImage.findMany({
      where: {
        productId,
      },
      orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
    });
  }

  async setPrimaryImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Imagem não encontrada');
    }

    await this.prisma.productImage.updateMany({
      where: {
        productId: image.productId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    });

    return this.prisma.productImage.update({
      where: { id: imageId },
      data: {
        isPrimary: true,
      },
    });
  }

  async reorderImages(images: { imageId: string; sortOrder: number }[]) {
    await Promise.all(
      images.map((item) =>
        this.prisma.productImage.update({
          where: { id: item.imageId },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    return {
      message: 'Ordem das imagens atualizada',
    };
  }
}
