import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
} from 'class-validator';

const titleCaseWordsPattern = /^[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*$/;

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Professional Haircut',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(titleCaseWordsPattern, {
    message: 'title words must start with capital letters',
  })
  title!: string;

  @ApiProperty({
    description: 'Detailed description of the service',
    example: 'Professional haircut service for adults',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'Service duration in minutes',
    example: 45,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  duration!: number;

  @ApiProperty({
    description: 'Service price',
    example: 2500,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiPropertyOptional({
    description: 'Whether the service is currently available',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
