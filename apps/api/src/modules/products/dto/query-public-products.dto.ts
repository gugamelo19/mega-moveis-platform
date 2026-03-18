import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryPublicProductsDto {
  @IsOptional()
  @IsString({ message: 'Busca inválida' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'categoryId inválido' })
  categoryId?: string;

  @IsOptional()
  @IsString({ message: 'brandId inválido' })
  brandId?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isFeatured deve ser true ou false' })
  isFeatured?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isOnSale deve ser true ou false' })
  isOnSale?: string;
}
