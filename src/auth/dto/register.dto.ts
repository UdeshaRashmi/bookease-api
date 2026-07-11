import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { capitalizeWords } from '../../common/utils/text-format';

export class RegisterDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Udesha Rashmi',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? capitalizeWords(value.trim()) : value,
  )
  name!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'udesha@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
