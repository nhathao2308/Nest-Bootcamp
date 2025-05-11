import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  email: string;
  fullName: string;
  role: string;
}

@Injectable()
export class JwtUtil {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: JwtPayload): string {
    const secret = this.configService.get<string>('JWT_SECRET') || 'nhathaodz';
    return jwt.sign(payload, secret, { expiresIn: '1d' });
  }

  verify(token: string): JwtPayload {
    const secret = this.configService.get<string>('JWT_SECRET') || 'nhathaodz';
    return jwt.verify(token, secret) as JwtPayload;
  }
}
