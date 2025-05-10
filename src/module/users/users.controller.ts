import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findUser(id);
  }

  @Put()
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Put(':id/inactive')
  async inactiveUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.inactiveUser(id);
  }
}
