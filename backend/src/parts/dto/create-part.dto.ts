import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePartDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}
