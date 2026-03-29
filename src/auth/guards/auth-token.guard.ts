/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromheader(request);
    console.log('CHEGUEI AQUI SIM', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigurations,
      );

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (error) {
      console.log(error);

      throw new Error('Login error');
    }

    return true;
  }

  extractTokenFromheader(request: Request) {
    console.log(request);

    const authorization = request.headers?.['authorization'];

    if (!authorization || typeof authorization !== 'string') {
      return;
    }
    return authorization.split(' ')[1];
  }
}
