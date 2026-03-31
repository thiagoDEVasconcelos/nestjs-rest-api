import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { Messages } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TokenPayloadDto } from 'src/auth/dto/tokenPayloadDto';

@Injectable({ scope: Scope.DEFAULT })
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messageRepository: Repository<Messages>,
    private readonly usersService: UsersService,
  ) {}

  throwNotFoundException(): never {
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
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (!message) return this.throwNotFoundException();

    return message;
  }

  async create(
    createMessageDto: CreateMessageDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const { toId } = createMessageDto;
    const from = await this.usersService.findOne(tokenPayload.sub);
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

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const message = await this.findOne(id);

    if (message.from.id !== tokenPayload.sub) {
      throw new ForbiddenException('This message is not yours.');
    }

    message.text = updateMessageDto?.text ?? message.text;
    message.read = updateMessageDto?.read ?? message.read;

    return this.messageRepository.save(message);
  }

  async delete(id: number, tokenPayload: TokenPayloadDto) {
    const message = await this.findOne(id);

    if (message.from.id !== tokenPayload.sub) {
      throw new UnauthorizedException(
        "You cannot delete other users' messages",
      );
    }

    return this.messageRepository.remove(message);
  }
}
