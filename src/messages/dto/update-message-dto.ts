import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message-dto';
import { IsOptional } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsOptional()
  readonly text?: string;
  @IsOptional()
  readonly from?: string;
  @IsOptional()
  readonly to?: string;
}
