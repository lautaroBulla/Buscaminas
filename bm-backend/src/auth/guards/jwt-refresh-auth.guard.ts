import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtRefresAuthGuard extends AuthGuard('jwt-refresh') {}