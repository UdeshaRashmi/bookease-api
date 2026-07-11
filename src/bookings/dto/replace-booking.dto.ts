import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { capitalizeWords } from '../../common/utils/text-format';

const sriLankanMobileNumberPattern = /^(?:0|94|\+94)7\d{8}$/;

export class ReplaceBookingDto {
  @ApiProperty({
    description: 'Customer full name',
    example: 'Kasun Silva',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? capitalizeWords(value.trim()) : value,
  )
  customerName!: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'kasun@gmail.com',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '0712345678',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(sriLankanMobileNumberPattern, {
    message: 'customerPhone must be a valid Sri Lankan mobile number',
  })
  customerPhone!: string;

  @ApiProperty({
    description: 'UUID of the selected service',
    example: '9b6c53ff-c215-4f8b-ad85-f16f8c0a5229',
  })
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty({
    description: 'Booking date in ISO date format',
    example: '2026-08-20',
  })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({
    description: 'Booking time in 24-hour HH:mm format',
    example: '11:00',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'bookingTime must be in HH:mm format',
  })
  bookingTime!: string;

  @ApiPropertyOptional({
    description: 'Additional booking notes',
    example: 'Updated using PUT',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
