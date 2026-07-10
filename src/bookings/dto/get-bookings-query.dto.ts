import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BookingStatus } from '../../../generated/prisma/client';

export enum BookingSortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetBookingsQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of bookings per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Search by customer name, email, phone, or service title',
    example: 'nimal',
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter bookings by status',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({
    description: 'Filter bookings by booking date',
    example: '2026-08-15',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    description: 'Filter bookings by service UUID',
    example: '9b6c53ff-c215-4f8b-ad85-f16f8c0a5229',
  })
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiPropertyOptional({
    description: 'Sort bookings by creation date',
    enum: BookingSortOrder,
    example: BookingSortOrder.DESC,
    default: BookingSortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(BookingSortOrder)
  sort: BookingSortOrder = BookingSortOrder.DESC;
}
