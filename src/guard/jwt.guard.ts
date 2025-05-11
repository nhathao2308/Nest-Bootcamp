// jwt.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtUtil: JwtUtil) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    console.log(authHeader);

    // lay header ra
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtUtil.verify(token);
      request['user'] = payload; // đính kèm user vào request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
