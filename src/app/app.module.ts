import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { SecondMiddlaware } from 'src/common/middlewares/second.middleware';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from 'src/common/filters/my-exception-filter';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().valid('postgres').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.string().valid('0', '1').default('0'),
        DATABASE_SYNCHRONIZE: Joi.string().valid('0', '1').default('0'),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    AuthModule,
    MessagesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimpleMiddleware, SecondMiddlaware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
