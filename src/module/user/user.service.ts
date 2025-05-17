import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { AuthService } from 'src/services/auth/auth.service';
import { RegisterInput } from './dto/register.input';
import { PasswordUtil } from 'src/utils/password.util';
import { LoginInput } from './dto/login.input';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly authService: AuthService,
    private readonly passwordUtil: PasswordUtil,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async register(registerInput: RegisterInput): Promise<any> {
    const { email, password, first_name, last_name, phone } = registerInput;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordUtil.hashPassword(password);
    const newUser = new User();
    Object.assign(newUser, {
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(req: LoginInput): Promise<any> {
    const { email, password } = req;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(user);

    const isPasswordValid = await this.passwordUtil.comparePassword({
      plainPassword: password,
      hashedPassword: user.password,
    });
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    console.log(user);

    const payload = {
      sub: user.id,
      email: user.email,
      username: `${user.first_name} ${user.last_name}`,
    };

    const access_token = jwt.sign(payload, 'haodz', {
      expiresIn: '1h',
    });

    console.log(access_token);

    return access_token;
  }
}
