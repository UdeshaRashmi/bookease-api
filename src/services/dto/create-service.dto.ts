import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { capitalizeWords } from '../../common/utils/text-format';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Professional Haircut',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? capitalizeWords(value.trim()) : value,
  )
  title!: string;

  @ApiProperty({
    description: 'Detailed description of the service',
    example: 'Professional haircut service for adults',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({
    description: 'Doctor assigned to the service',
    example: 'Doctor A',
    default: 'Doctor A',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? capitalizeWords(value.trim()) : value,
  )
  doctorName?: string;

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
