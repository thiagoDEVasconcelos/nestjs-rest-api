import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing/auth.service';
import { BcryptService } from './hashing/bcrypt.service';

@Global()
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class AuthModule {}
