import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt-optional') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context) {
        if (err || !user) {
            return null;
        }
        
        return user;
    }
}