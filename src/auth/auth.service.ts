import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshTokenDto';

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
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
    }

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid Password!');
    }

    if (!user) return;

    const accessToken = await this.signJwtAsync(
      user.id,
      this.jwtConfiguration.jwtTtl,
      {
        email: user.email,
      },
    );

    const refreshToken = await this.signJwtAsync(
      user.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    return { accessToken, refreshToken };
  }

  private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );

    return { accessToken };
  }

  refreshTokens(refreshToken: RefreshTokenDto) {
    return true;
  }
}
