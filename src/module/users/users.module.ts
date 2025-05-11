import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordUtil } from 'src/utils/password.util';
import { ConfigModule } from '@nestjs/config';
import { JwtUtil } from 'src/utils/jwt.util';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordUtil, JwtUtil],
})
export class UsersModule {}
