import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateStoreSettingsDto } from './dto/update-store-settings.dto';

@Injectable()
export class StoreSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublic() {
    const settings = await this.prisma.storeSettings.findFirst();

    if (!settings) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return settings;
  }

  async findAdmin() {
    const settings = await this.prisma.storeSettings.findFirst();

    if (!settings) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return settings;
  }

  async update(updateStoreSettingsDto: UpdateStoreSettingsDto) {
    const settings = await this.prisma.storeSettings.findFirst();

    if (!settings) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return this.prisma.storeSettings.update({
      where: { id: settings.id },
      data: {
        storeName: updateStoreSettingsDto.storeName ?? settings.storeName,
        whatsappNumber:
          updateStoreSettingsDto.whatsappNumber ?? settings.whatsappNumber,
        contactEmail:
          updateStoreSettingsDto.contactEmail !== undefined
            ? updateStoreSettingsDto.contactEmail
            : settings.contactEmail,
        phoneNumber:
          updateStoreSettingsDto.phoneNumber !== undefined
            ? updateStoreSettingsDto.phoneNumber
            : settings.phoneNumber,
        addressLine:
          updateStoreSettingsDto.addressLine !== undefined
            ? updateStoreSettingsDto.addressLine
            : settings.addressLine,
        city:
          updateStoreSettingsDto.city !== undefined
            ? updateStoreSettingsDto.city
            : settings.city,
        state:
          updateStoreSettingsDto.state !== undefined
            ? updateStoreSettingsDto.state
            : settings.state,
        zipCode:
          updateStoreSettingsDto.zipCode !== undefined
            ? updateStoreSettingsDto.zipCode
            : settings.zipCode,
        aboutTitle:
          updateStoreSettingsDto.aboutTitle !== undefined
            ? updateStoreSettingsDto.aboutTitle
            : settings.aboutTitle,
        aboutText:
          updateStoreSettingsDto.aboutText !== undefined
            ? updateStoreSettingsDto.aboutText
            : settings.aboutText,
        facebookUrl:
          updateStoreSettingsDto.facebookUrl !== undefined
            ? updateStoreSettingsDto.facebookUrl
            : settings.facebookUrl,
        instagramUrl:
          updateStoreSettingsDto.instagramUrl !== undefined
            ? updateStoreSettingsDto.instagramUrl
            : settings.instagramUrl,
        logoUrl:
          updateStoreSettingsDto.logoUrl !== undefined
            ? updateStoreSettingsDto.logoUrl
            : settings.logoUrl,
      },
    });
  }
}
