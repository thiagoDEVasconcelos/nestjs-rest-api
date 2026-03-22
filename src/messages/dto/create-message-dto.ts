import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
// import { User } from 'src/users/entities/user.entity';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;
}
