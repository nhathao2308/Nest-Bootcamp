import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

/* eslint-disable */
@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, AuthService],
})
export class JwtModule {}
