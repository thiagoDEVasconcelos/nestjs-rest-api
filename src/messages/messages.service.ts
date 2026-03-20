import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Something',
      from: 'Andorinha',
      to: 'Derrick',
      read: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  throwNotFoundException() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    const message = await this.messageRepository.find();
    return message;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (message) return message;

    this.throwNotFoundException();
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
    };
    const message = this.messageRepository.create(newMessage);
    return this.messageRepository.save(message);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const findedMessageIndex = this.messages.findIndex(
      message => message.id === id,
    );

    if (findedMessageIndex < 0) {
      this.throwNotFoundException();
    }

    const findedMessage = this.messages[findedMessageIndex];

    this.messages[findedMessageIndex] = {
      ...findedMessage,
      ...updateMessageDto,
    };
  }

  delete(id: number) {
    const findedMessageIndex = this.messages.findIndex(
      message => message.id === id,
    );

    if (findedMessageIndex < 0) {
      this.throwNotFoundException();
    }
    const message = this.messages[findedMessageIndex];

    this.messages.splice(findedMessageIndex, 1);
    return message;
  }
}
