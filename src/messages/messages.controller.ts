import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  createMessage(@Body() body: JSON) {
    console.log(body);

    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: JSON) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return 'this route remove the message with id ' + id;
  }
}
