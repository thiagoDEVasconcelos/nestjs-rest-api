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

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.preload({
      id,
      ...updateMessageDto,
    });

    if (!message) {
      return this.throwNotFoundException();
    }

    return this.messageRepository.save(message);
  }

  async delete(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      this.throwNotFoundException();
      return;
    }
    return this.messageRepository.remove(message);
  }
}
