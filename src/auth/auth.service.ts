import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;
    console.log('chegou aqui');

    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    console.log('USER', user);

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
    }

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid Password!');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user?.id,
        email: user?.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      },
    );

    return accessToken;
  }
}
