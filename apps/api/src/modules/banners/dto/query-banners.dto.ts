import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryBannersDto {
  @IsOptional()
  @IsString({ message: 'Busca inválida' })
  search?: string;

  @IsOptional()
  @IsBooleanString({ message: 'isActive deve ser true ou false' })
  isActive?: string;
}
