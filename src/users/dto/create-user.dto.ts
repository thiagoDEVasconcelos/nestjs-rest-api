import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsStrongPassword()
  password: string;
}
