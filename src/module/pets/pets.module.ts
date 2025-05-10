import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BreedEntity } from '../breeds/entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, UserEntity, BreedEntity])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
