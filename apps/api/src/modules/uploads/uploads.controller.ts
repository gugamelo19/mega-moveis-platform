import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadProductImageDto } from './dto/upload-product-image.dto';
import { UploadsService } from './uploads.service';
import { ReorderProductImagesDto } from './dto/reorder-product-images.dto';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('product-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @UploadedFile() file: unknown,
    @Body() uploadProductImageDto: UploadProductImageDto,
  ) {
    return this.uploadsService.uploadProductImage(file, uploadProductImageDto);
  }

  @Delete('product-image/:imageId')
  removeProductImage(@Param('imageId') imageId: string) {
    return this.uploadsService.removeProductImage(imageId);
  }
  @Get('product-images/:productId')
  getProductImages(@Param('productId') productId: string) {
    return this.uploadsService.getProductImages(productId);
  }
  @Post('product-image/:imageId/set-primary')
  setPrimaryImage(@Param('imageId') imageId: string) {
    return this.uploadsService.setPrimaryImage(imageId);
  }
  @Post('product-images/reorder')
  reorderImages(@Body() dto: ReorderProductImagesDto) {
    return this.uploadsService.reorderImages(dto.images);
  }
}
