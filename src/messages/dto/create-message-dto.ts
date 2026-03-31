import { IsNotEmpty, IsString, MaxLength, IsPositive } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  toId: number;
}
