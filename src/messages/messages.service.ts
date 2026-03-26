import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable({ scope: Scope.DEFAULT })
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  throwNotFoundException() {
    throw new NotFoundException('Message not found');
  }

  async findAll(paginationDto: PaginationDto = { limit: 10, offset: 0 }) {
    const { limit, offset } = paginationDto;

    const message = await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
    });

    return message;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) return this.throwNotFoundException();

    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;
    const from = await this.usersService.findOne(fromId);
    const to = await this.usersService.findOne(toId);

    if (!from || !to) {
      return this.throwNotFoundException();
    }

    const newMessage = {
      text: createMessageDto.text,
      from,
      to,
      read: false,
    };

    const message = this.messageRepository.create(newMessage);
    await this.messageRepository.save(message);

    return {
      ...message,
      from: {
        name: message.from.name,
        id: message.from.id,
      },
      to: {
        name: message.to.name,
        id: message.to.id,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    if (!message) {
      return this.throwNotFoundException();
    }

    message.text = updateMessageDto?.text ?? message.text;
    message.read = updateMessageDto?.read ?? message.read;

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
