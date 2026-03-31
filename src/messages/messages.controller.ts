import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message-dto';
import { Messages } from './entities/message.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { UrlParam } from 'src/common/params/url-param.decorator';
import { ReqDataParam } from 'src/common/params/req-data.decorator';
import { AuthGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload-param';
import { TokenPayloadDto } from 'src/auth/dto/tokenPayloadDto';

@Controller('messages')
@UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @UrlParam() url: string,
    @ReqDataParam('method') method,
  ): Promise<Messages[]> {
    console.log(url);
    console.log(method);

    return await this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.messagesService.create(createMessageDto, tokenPayload);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.messagesService.update(id, updateMessageDto, tokenPayload);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.messagesService.delete(id, tokenPayload);
  }
}
