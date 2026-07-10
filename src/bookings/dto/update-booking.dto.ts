import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateBookingDto {
  @ApiPropertyOptional({
    description: 'Updated customer name',
    example: 'Nimal Perera',
  })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional({
    description: 'Updated customer email',
    example: 'nimal@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @ApiPropertyOptional({
    description: 'Updated customer phone number',
    example: '0711111111',
  })
  @IsOptional()
  @IsString()
  customerPhone?: string;

  @ApiPropertyOptional({
    description: 'Updated service UUID',
    example: '9b6c53ff-c215-4f8b-ad85-f16f8c0a5229',
  })
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiPropertyOptional({
    description: 'Updated booking date',
    example: '2026-08-21',
  })
  @IsOptional()
  @IsDateString()
  bookingDate?: string;

  @ApiPropertyOptional({
    description: 'Updated booking time in HH:mm format',
    example: '12:30',
  })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'bookingTime must be in HH:mm format',
  })
  bookingTime?: string;

  @ApiPropertyOptional({
    description: 'Updated notes',
    example: 'Changed appointment time',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
