import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.entity';
import { CreateSpeciesInput } from './dto/create-species.input';

@Resolver()
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}

  @Mutation(() => Species)
  async createSpecies(@Args('speciesInput') speciesInput: CreateSpeciesInput) {
    return this.speciesService.createSpecies(speciesInput);
  }
}
