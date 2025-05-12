// jwt.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtUtil } from '../utils/jwt.util';

interface UserPayload {
  role: string;
  [key: string]: any;
}

@Injectable()
export class RoleGuard extends JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    jwtUtil: JwtUtil,
  ) {
    super(jwtUtil);
  }

  canActivate(context: ExecutionContext): boolean {
    const isJwtValid = super.canActivate(context);
    if (!isJwtValid) {
      return false;
    }

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: UserPayload }>();
    const user = request.user;

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('You do not have permissions to access');
    }

    return true;
  }
}
