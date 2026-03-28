import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    console.log(this.jwtConfiguration);
  }

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;

    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        user.password,
        loginDto.password,
      );
    }

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid Password!');
    }

    return user;
  }
}
