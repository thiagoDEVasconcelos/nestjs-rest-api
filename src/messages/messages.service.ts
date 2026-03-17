import { Injectable, NotFoundException } from '@nestjs/common';
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

  throwNotFoundException() {
    throw new NotFoundException('Message not found');
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const findedMessage = this.messages.find((message) => message.id === id);

    if (findedMessage) return findedMessage;

    this.throwNotFoundException();
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
    const findedMessageIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (findedMessageIndex < 0) {
      this.throwNotFoundException();
    }

    const findedMessage = this.messages[findedMessageIndex];

    this.messages[findedMessageIndex] = {
      ...findedMessage,
      ...body,
    };
  }

  delete(id: number) {
    const findedMessageIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (findedMessageIndex < 0) {
      this.throwNotFoundException();
    }
    const message = this.messages[findedMessageIndex];

    this.messages.splice(findedMessageIndex, 1);
    return message;
  }
}
