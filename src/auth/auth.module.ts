import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth-token.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
    AuthGuard,
  ],
  exports: [HashingService, JwtModule, ConfigModule, AuthGuard, TypeOrmModule],
})
export class AuthModule {}
