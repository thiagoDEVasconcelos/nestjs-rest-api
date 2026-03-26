import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { MessagesUtils, MessagesUtilsMock } from './messages.utils';
import { MyDynamicModule } from 'src/my-dynamic.ts/my-dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => UsersService),
    MyDynamicModule.register({
      apiKey: 'lk14hpt1394',
      apiUrl: 'http://apikey.com.br',
    }),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    { provide: 'messagesMock', useValue: new MessagesUtilsMock() },
  ],
  exports: [MessagesUtils],
})
export class MessagesModule {}
