import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryCategoriesDto {
  @IsOptional()
  @IsString({ message: 'Busca inválida' })
  search?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isActive deve ser true ou false' })
  isActive?: string;
}
