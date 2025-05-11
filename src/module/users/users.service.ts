import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUtil } from 'src/utils/password.util';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtUtil } from 'src/utils/jwt.util';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordUtil: PasswordUtil,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existedUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.passwordUtil.hashPassword(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.passwordUtil.comparePassword({
      plainPassword: loginUserDto.password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status === 'inactivate') {
      throw new UnauthorizedException('Account is inactive');
    }

    const payload = {
      email: user.email,
      fullName: user.fullName,
      role: 'user',
    };

    const token = this.jwtUtil.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
      },
    };
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { ...updateData } = updateUserDto;

    const user = await this.findUser(userId);

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email },
      });

      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    Object.assign(user, updateData);

    return await this.userRepository.save(user);
  }

  async inactiveUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    user.status = 'inactivate';
    return await this.userRepository.save(user);
  }
}
