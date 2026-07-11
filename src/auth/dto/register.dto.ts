import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const titleCaseWordsPattern = /^[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*$/;

export class RegisterDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Udesha Rashmi',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(titleCaseWordsPattern, {
    message: 'name words must start with capital letters',
  })
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
