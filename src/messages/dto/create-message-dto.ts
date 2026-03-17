import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;
  @IsString()
  @IsNotEmpty()
  readonly from: string;
  @IsString()
  @IsNotEmpty()
  readonly to: string;
}
