import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { TokenPayload } from "../token-payload.interface";

@Injectable()
export class JwtRerfreshSatrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor (configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: TokenPayload): Promise<any> {
        return this.authService.verifyUserRefreshToken(request.cookies.Refresh, parseInt(payload.userId));
    }
}