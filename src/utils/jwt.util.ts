import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from 'src/module/users/dto/login-user.dto';

@Injectable()
export class JwtUtil {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: LoginUserDto): string {
    const secret = this.configService.get<string>('JWT_SECRET') || 'nhathaodz';
    return jwt.sign(payload, secret, { expiresIn: '1d' });
  }

  verify(token: string): any {
    const secret = this.configService.get<string>('JWT_SECRET') || 'nhathaodz';
    return jwt.verify(token, secret);
  }
}
