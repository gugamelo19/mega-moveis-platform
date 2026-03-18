import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateStoreSettingsDto {
  @IsOptional()
  @IsString({ message: 'Nome da loja inválido' })
  @MinLength(2, { message: 'O nome da loja deve ter pelo menos 2 caracteres' })
  @MaxLength(150, {
    message: 'O nome da loja deve ter no máximo 150 caracteres',
  })
  storeName?: string;

  @IsOptional()
  @IsString({ message: 'WhatsApp inválido' })
  @MaxLength(30, { message: 'O WhatsApp deve ter no máximo 30 caracteres' })
  whatsappNumber?: string;

  @IsOptional()
  @IsString({ message: 'E-mail inválido' })
  @MaxLength(150, { message: 'O e-mail deve ter no máximo 150 caracteres' })
  contactEmail?: string;

  @IsOptional()
  @IsString({ message: 'Telefone inválido' })
  @MaxLength(30, { message: 'O telefone deve ter no máximo 30 caracteres' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Endereço inválido' })
  @MaxLength(255, { message: 'O endereço deve ter no máximo 255 caracteres' })
  addressLine?: string;

  @IsOptional()
  @IsString({ message: 'Cidade inválida' })
  @MaxLength(100, { message: 'A cidade deve ter no máximo 100 caracteres' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'Estado inválido' })
  @MaxLength(50, { message: 'O estado deve ter no máximo 50 caracteres' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'CEP inválido' })
  @MaxLength(20, { message: 'O CEP deve ter no máximo 20 caracteres' })
  zipCode?: string;

  @IsOptional()
  @IsString({ message: 'Título do sobre inválido' })
  @MaxLength(150, {
    message: 'O título do sobre deve ter no máximo 150 caracteres',
  })
  aboutTitle?: string;

  @IsOptional()
  @IsString({ message: 'Texto do sobre inválido' })
  @MaxLength(5000, {
    message: 'O texto do sobre deve ter no máximo 5000 caracteres',
  })
  aboutText?: string;

  @IsOptional()
  @IsString({ message: 'Facebook URL inválida' })
  @MaxLength(255, {
    message: 'A URL do Facebook deve ter no máximo 255 caracteres',
  })
  facebookUrl?: string;

  @IsOptional()
  @IsString({ message: 'Instagram URL inválida' })
  @MaxLength(255, {
    message: 'A URL do Instagram deve ter no máximo 255 caracteres',
  })
  instagramUrl?: string;

  @IsOptional()
  @IsString({ message: 'Logo URL inválida' })
  @MaxLength(255, {
    message: 'A URL da logo deve ter no máximo 255 caracteres',
  })
  logoUrl?: string;
}
