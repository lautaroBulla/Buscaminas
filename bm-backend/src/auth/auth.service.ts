import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Logger } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { hash } from "bcryptjs";
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string, lang: string) {
    try {
      const user = await this.userService.findOneUsername(username);
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch(e) {
      if (lang === 'en') {
        throw new UnauthorizedException('Credentials are not valid');
      } else if (lang === 'es') {
        throw new UnauthorizedException('Las credenciales no son validas');
      }
    }
  }

  async login(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setTime(
      expiresAccessToken.getTime() + 
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          )
        )
    )
    const expiresRefreshToken = new Date();
    expiresRefreshToken.setTime(
      expiresRefreshToken.getTime() + 
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          )
        )
    )

    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    }

    const accesToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
          'JWT_ACCESS_TOKEN_EXPIRATION_MS',
        )}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
          'JWT_REFRESH_TOKEN_EXPIRATION_MS',
        )}ms`,
    });

    await this.userService.update(user.id, { refreshToken: await hash(refreshToken, 10) });

    response.cookie('Authentication', accesToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });
  }

  async verifyUserRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      let authenticated = false;

      if (user && user.refreshToken) {
        authenticated = await compare(refreshToken, user.refreshToken);
      }

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch(e) {
        throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async register(createUserDto: CreateUserDto, response: Response) {
    const user = await this.userService.create(createUserDto);
    await this.login(user, response);
    const { password, refreshToken, ...result } = user;
    return result;
  }
} 
