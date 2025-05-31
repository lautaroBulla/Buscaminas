import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ passReqToCallback: true });
    }

    async validate(request: Request, username: string, password: string): Promise<any> {
        const lang = request.headers['language'];

        return this.authService.validateUser(username, password, lang);
    }
}