import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return loginDto;
  }
}
