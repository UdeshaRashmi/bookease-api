import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class ReplaceBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'bookingTime must be in HH:mm format',
  })
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
