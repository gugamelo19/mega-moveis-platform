import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBannerDto {
  @IsOptional()
  @IsString({ message: 'Título inválido' })
  @MinLength(2, { message: 'O título deve ter pelo menos 2 caracteres' })
  @MaxLength(150, { message: 'O título deve ter no máximo 150 caracteres' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Subtítulo inválido' })
  @MaxLength(255, { message: 'O subtítulo deve ter no máximo 255 caracteres' })
  subtitle?: string;

  @IsOptional()
  @IsString({ message: 'URL da imagem inválida' })
  imageUrl?: string;

  @IsOptional()
  @IsString({ message: 'Link inválido' })
  @MaxLength(255, { message: 'O link deve ter no máximo 255 caracteres' })
  linkUrl?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isActive deve ser booleano' })
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'sortOrder deve ser um número inteiro' })
  @Min(0, { message: 'sortOrder não pode ser negativo' })
  sortOrder?: number;
}
