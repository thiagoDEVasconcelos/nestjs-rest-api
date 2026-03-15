import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  findAll(): string {
    return 'this action returns all cats';
  }

  @Get(':id')
  findOne(@Param() parametros: object): string {
    console.log(parametros);

    return 'this action returns one specific message';
  }

  @Post()
  createMessage(@Body() body: any) {
    console.log(body);

    return 'create a message';
  }
}
