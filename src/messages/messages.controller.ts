import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageDto } from './entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(): any {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateMessageDto) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.messagesService.delete(id);
  }
}
