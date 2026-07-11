import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { capitalizeWords } from '../../common/utils/text-format';

const sriLankanMobileNumberPattern = /^(?:0|94|\+94)7\d{8}$/;

export class UpdateBookingDto {
  @ApiPropertyOptional({
    description: 'Updated customer name',
    example: 'Rashmi Paranamana',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? capitalizeWords(value.trim()) : value,
  )
  customerName?: string;

  @ApiPropertyOptional({
    description: 'Updated customer email',
    example: 'rashmi@gmail.com',
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
  @Matches(sriLankanMobileNumberPattern, {
    message: 'customerPhone must be a valid Sri Lankan mobile number',
  })
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
