import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
} from 'class-validator';

const titleCaseWordsPattern = /^[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*$/;

export class UpdateServiceDto {
  @ApiPropertyOptional({
    description: 'Updated service title',
    example: 'Premium Haircut',
  })
  @IsOptional()
  @IsString()
  @Matches(titleCaseWordsPattern, {
    message: 'title words must start with capital letters',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated service description',
    example: 'Premium haircut with styling',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated duration in minutes',
    example: 60,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({
    description: 'Updated service price',
    example: 3000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    description: 'Whether the service is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
