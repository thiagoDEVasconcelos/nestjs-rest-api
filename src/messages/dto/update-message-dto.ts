import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message-dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly text?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly from?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly to?: string;
  @IsOptional()
  read: boolean;
}
