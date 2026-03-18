import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UploadProductImageDto {
  @IsString({ message: 'productId inválido' })
  productId: string;

  @IsOptional()
  @IsString({ message: 'altText inválido' })
  @MaxLength(255, { message: 'altText deve ter no máximo 255 caracteres' })
  altText?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'sortOrder deve ser um número inteiro' })
  @Min(0, { message: 'sortOrder não pode ser negativo' })
  sortOrder?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isPrimary deve ser booleano' })
  isPrimary?: boolean;
}
