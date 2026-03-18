import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProductSpecificationDto } from './create-product-specification.dto';

export class CreateProductDto {
  @IsString({ message: 'Nome inválido' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Descrição curta inválida' })
  @MaxLength(255, {
    message: 'A descrição curta deve ter no máximo 255 caracteres',
  })
  shortDescription?: string;

  @IsString({ message: 'Descrição inválida' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Preço deve ser um número válido com até 2 casas decimais' },
  )
  @Min(0, { message: 'Preço não pode ser negativo' })
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Preço comparativo deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'Preço comparativo não pode ser negativo' })
  compareAtPrice?: number;

  @IsOptional()
  @IsString({ message: 'SKU inválido' })
  @MaxLength(100, { message: 'O SKU deve ter no máximo 100 caracteres' })
  sku?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isAvailable deve ser booleano' })
  isAvailable?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isFeatured deve ser booleano' })
  isFeatured?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isOnSale deve ser booleano' })
  isOnSale?: boolean;

  @IsString({ message: 'categoryId inválido' })
  categoryId: string;

  @IsString({ message: 'brandId inválido' })
  brandId: string;

  @IsOptional()
  @IsArray({ message: 'specifications deve ser um array' })
  @ArrayMaxSize(30, { message: 'Máximo de 30 especificações por produto' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecificationDto)
  specifications?: CreateProductSpecificationDto[];
}
