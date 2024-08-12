import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new UnauthorizedException('No Access Token Provided');

    const token = authHeader.split(' ')[1];
    const user = this.authService.verifyAccessToken(token);
    
    request['user'] = user;
    return true;
  }
}
