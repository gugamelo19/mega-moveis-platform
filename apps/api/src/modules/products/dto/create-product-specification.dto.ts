import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductSpecificationDto {
  @IsString({ message: 'Nome da especificação inválido' })
  @MinLength(1, { message: 'O nome da especificação é obrigatório' })
  @MaxLength(100, {
    message: 'O nome da especificação deve ter no máximo 100 caracteres',
  })
  name: string;

  @IsString({ message: 'Valor da especificação inválido' })
  @MinLength(1, { message: 'O valor da especificação é obrigatório' })
  @MaxLength(255, {
    message: 'O valor da especificação deve ter no máximo 255 caracteres',
  })
  value: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'sortOrder deve ser um número inteiro' })
  @Min(0, { message: 'sortOrder não pode ser negativo' })
  sortOrder?: number;
}
