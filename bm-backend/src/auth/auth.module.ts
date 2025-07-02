import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { JwtRerfreshSatrategy } from './strategys/jwt-refresh.strategy';
import { JwtOptionalStrategy } from './strategys/jwt-optional.strategy';

@Module({
  imports: [JwtModule, UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRerfreshSatrategy, JwtOptionalStrategy]
})
export class AuthModule {}
