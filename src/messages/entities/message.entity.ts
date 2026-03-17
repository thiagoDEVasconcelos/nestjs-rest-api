export class Message {
  id: number;
  text: string;
  from: string;
  to: string;
  read: boolean;
  date: Date;
}

export class CreateMessageDto {
  text: string;
  from: string;
  to: string;
  read: boolean;
  date: Date;
}

export class UpdateMessageDto {
  text?: string;
  from?: string;
  to?: string;
  read?: boolean;
  date?: Date;
}
