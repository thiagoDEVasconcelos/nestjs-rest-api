import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => MessagesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
