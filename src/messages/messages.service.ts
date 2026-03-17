import { Injectable } from '@nestjs/common';
import {
  CreateMessageDto,
  Message,
  UpdateMessageDto,
} from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Something',
      from: 'Andorinha',
      to: 'Derrick',
      read: true,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return this.messages.find((message) => message.id === id);
  }

  create(body: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);
    return this.messages;
  }

  update(id: number, body: UpdateMessageDto) {
    const findedMessageId = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (findedMessageId >= 0) {
      const findedMessage = this.messages[findedMessageId];

      this.messages[findedMessageId] = {
        ...findedMessage,
        ...body,
      };
    }
  }

  delete(id: number) {
    const findedMessageIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (findedMessageIndex >= 0) {
      this.messages.splice(findedMessageIndex, 1);
    }
  }
}
