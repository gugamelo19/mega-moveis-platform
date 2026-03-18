import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryAdminProductsDto } from './dto/query-admin-products.dto';
import { QueryPublicProductsDto } from './dto/query-public-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllPublic(@Query() query: QueryPublicProductsDto) {
    return this.productsService.findAllPublic(query);
  }

  @Get('featured')
  findFeaturedProducts() {
    return this.productsService.findFeaturedProducts();
  }

  @Get('on-sale')
  findOnSaleProducts() {
    return this.productsService.findOnSaleProducts();
  }

  @Get('category/:categorySlug')
  findProductsByCategorySlug(@Param('categorySlug') categorySlug: string) {
    return this.productsService.findProductsByCategorySlug(categorySlug);
  }

  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @Get('slug/:slug/related')
  findRelatedProducts(@Param('slug') slug: string) {
    return this.productsService.findRelatedProducts(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin(@Query() query: QueryAdminProductsDto) {
    return this.productsService.findAllAdmin(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
