import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './species.entity';
import { Repository } from 'typeorm';
import { CreateSpeciesInput } from './dto/create-species.input';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async createSpecies(speciesInput: CreateSpeciesInput): Promise<Species> {
    const species = this.speciesRepository.create(speciesInput);
    return await this.speciesRepository.save(species);
  }
}
