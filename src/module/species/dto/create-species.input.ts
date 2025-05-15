import { Field, InputType } from '@nestjs/graphql';
import { AnimalType } from 'src/enums/animal-type.enum';
import { CareLevel } from '../enums/species.enum';

@InputType()
export class CreateSpeciesInput {
  @Field(() => String)
  scientific_name: string;

  @Field(() => String)
  common_name: string;

  @Field(() => String)
  family: string;

  @Field(() => String)
  genus: string;

  @Field(() => AnimalType)
  animal_type: AnimalType;

  @Field(() => String)
  origin: string;

  @Field(() => CareLevel)
  care_level: CareLevel;

  @Field(() => String)
  description: string;

  @Field(() => String)
  category_id: string;
}
