import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entities/message.entity';
import { MessagesUtils, MessagesUtilsMock } from './messages.utils';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Messages]),
    forwardRef(() => UsersModule),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessagesUtils,
    { provide: 'messagesMock', useValue: new MessagesUtilsMock() },
  ],
  exports: [MessagesUtils],
})
export class MessagesModule {}
