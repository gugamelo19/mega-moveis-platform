import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StoreSettingsService } from './store-settings.service';
import { UpdateStoreSettingsDto } from './dto/update-store-settings.dto';

@Controller('store-settings')
export class StoreSettingsController {
  constructor(private readonly storeSettingsService: StoreSettingsService) {}

  @Get()
  findPublic() {
    return this.storeSettingsService.findPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAdmin() {
    return this.storeSettingsService.findAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateStoreSettingsDto: UpdateStoreSettingsDto) {
    return this.storeSettingsService.update(updateStoreSettingsDto);
  }
}
