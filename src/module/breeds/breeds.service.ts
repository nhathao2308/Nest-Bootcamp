import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedEntity } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    const existingBreed = await this.breedRepository.findOne({
      where: { name: createBreedDto.name },
    });

    if (existingBreed) {
      throw new HttpException(
        'Breed name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const breed = new BreedEntity();
    breed.name = createBreedDto.name;
    breed.description = createBreedDto.description;
    breed.lifespan = createBreedDto.lifespan;
    breed.location = createBreedDto.location;
    breed.status = 'activate';

    return await this.breedRepository.save(breed);
  }

  async getAllBreed(): Promise<BreedEntity[]> {
    return await this.breedRepository.find();
  }
}
