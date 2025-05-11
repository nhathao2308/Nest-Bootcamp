import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedEntity } from './entities/breed.entity';
import { JwtUtil } from 'src/utils/jwt.util';
// import { JwtGuard } from 'src/utils/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([BreedEntity])],
  controllers: [BreedsController],
  providers: [BreedsService, JwtUtil],
})
export class BreedsModule {}
