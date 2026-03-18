import { IsArray, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ImageOrderItem {
  @IsString()
  imageId: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class ReorderProductImagesDto {
  @IsArray()
  images: ImageOrderItem[];
}
