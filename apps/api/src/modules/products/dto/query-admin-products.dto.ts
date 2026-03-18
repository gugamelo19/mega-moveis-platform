import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryAdminProductsDto {
  @IsOptional()
  @IsString({ message: 'Busca inválida' })
  search?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isAvailable deve ser true ou false' })
  isAvailable?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isFeatured deve ser true ou false' })
  isFeatured?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isOnSale deve ser true ou false' })
  isOnSale?: string;

  @IsOptional()
  @IsString({ message: 'categoryId inválido' })
  categoryId?: string;

  @IsOptional()
  @IsString({ message: 'brandId inválido' })
  brandId?: string;
}
