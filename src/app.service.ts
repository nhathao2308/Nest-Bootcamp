import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Cat } from './schema/cat.schema';
// import { Model } from 'mongoose';

@Injectable()
export class AppService {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // @InjectModel(Cat.name)
    // private catModel: Model<Cat>,
  ) {}

  async getHello(): Promise<UserEntity> {
    return await this.userRepository.save({
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
    });
  }

  // async createCat(): Promise<Cat> {
  //   return this.catModel.create({
  //     name: 'cat2',
  //     age: 1,
  //     breed: 'persian',
  //   });
  // }
}
