import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-dto.sto';
import { access } from 'fs';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto) {
    Logger.log('---------------------------');
    Logger.log(loginDto.username, 'AuthService');
    Logger.log('---------------------------');
    const user = await this.userService.findOneUsername(loginDto.username);

    if (user && user.password === loginDto.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
