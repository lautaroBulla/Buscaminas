import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";
import { UsersService } from "../../users/users.service";
import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (configService: ConfigService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: TokenPayload): Promise<any> {
        return this.userService.findOne(parseInt(payload.userId));
    }
}