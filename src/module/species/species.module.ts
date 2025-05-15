import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  providers: [SpeciesResolver, SpeciesService],
})
export class SpeciesModule {}
