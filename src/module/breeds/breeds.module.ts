import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedEntity } from './entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreedEntity])],
  controllers: [BreedsController],
  providers: [BreedsService],
})
export class BreedsModule {}
