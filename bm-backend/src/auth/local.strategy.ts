import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto.sto";
import { validate } from "class-validator";
import { Logger } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const loginDto = new LoginDto();
        loginDto.username = username;
        loginDto.password = password;

        const errors = await validate(loginDto);
        if (errors.length > 0) {
            throw new UnauthorizedException('Invalid info');
        }

        const user = await this.authService.validateUser(loginDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}