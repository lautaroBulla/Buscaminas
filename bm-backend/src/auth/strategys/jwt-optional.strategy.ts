import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";
import { UsersService } from "../../users/users.service";
import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";

@Injectable()
export class JwtOptionalStrategy extends PassportStrategy(Strategy, 'jwt-optional') {
    constructor (configService: ConfigService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: false,
        });
    }

    async validate(payload: TokenPayload): Promise<any> {
        return await this.userService.findOneForAuth(parseInt(payload.userId));
    }
}