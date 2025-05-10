export class UpdatePetDto {
  name?: string;
  type?: string;
  growthRate?: string;
  description?: string;
  ownerId?: string; // user ID
  breedId?: string; // breed ID
}
