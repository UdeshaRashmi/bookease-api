import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

const titleCaseWordsPattern = /^[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*$/;
const sriLankanMobileNumberPattern = /^(?:0|94|\+94)7\d{8}$/;

export class CreateBookingDto {
  @ApiProperty({
    description: 'Customer full name',
    example: 'Nimal Perera',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(titleCaseWordsPattern, {
    message: 'customerName words must start with capital letters',
  })
  customerName!: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'nimal@gmail.com',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '0771234567',
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
    example: '2026-08-15',
  })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({
    description: 'Booking time in 24-hour HH:mm format',
    example: '10:30',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'bookingTime must be in HH:mm format',
  })
  bookingTime!: string;

  @ApiPropertyOptional({
    description: 'Additional booking notes',
    example: 'Customer prefers a morning appointment',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
