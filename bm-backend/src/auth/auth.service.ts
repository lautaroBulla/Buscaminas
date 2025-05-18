import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Logger } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findOneUsername(username);
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      return user;
    } catch(e) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  async login(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setTime(
      expiresAccessToken.getTime() + 
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_EXPIRATION_MS',
          )
        )
    )

    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    }

    const accesToken = this.jwtService.sign(tokenPayload, {
      expiresIn: `${this.configService.getOrThrow(
          'JWT_EXPIRATION_MS',
        )}ms`,
    });

    response.cookie('Authentication', accesToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
  }

}
