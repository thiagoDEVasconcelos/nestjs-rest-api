import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  @IsStrongPassword()
  password: string;
}
