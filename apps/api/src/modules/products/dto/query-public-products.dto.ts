import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryPublicProductsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  brandId?: string;

  @IsOptional()
  @IsIn(['newest', 'price_asc', 'price_desc', 'name_asc'])
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'name_asc';

  @IsOptional()
  @IsString()
  page?: string;
}
