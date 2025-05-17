import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PasswordUtil } from 'src/utils/password.util';
// import { AuthService } from 'src/services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { AuthService } from 'src/services/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'haodz',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserResolver, UserService, PasswordUtil],
})
export class UserModule {}
