import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UserEntity } from '../users/entities/user.entity';
import { BreedEntity } from '../breeds/entities/breed.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<PetEntity> {
    const exitedUser = await this.userRepository.findOne({
      where: {
        id: createPetDto.ownerId,
      },
    });

    if (!exitedUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const exitedBreed = await this.breedRepository.findOne({
      where: {
        id: createPetDto.breedId,
      },
    });

    if (!exitedBreed) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const pet = new PetEntity();
    pet.name = createPetDto.name;
    pet.type = createPetDto.type;
    pet.growthRate = createPetDto.growthRate;
    pet.description = createPetDto.description;
    pet.owner = exitedUser;
    pet.breed = exitedBreed;

    return await this.petRepository.save(pet);
  }

  async findAll(): Promise<PetEntity[]> {
    return await this.petRepository.find({
      relations: ['owner', 'breed'],
    });
  }

  async findByUserId(userId: string): Promise<PetEntity[]> {
    return await this.petRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner', 'breed'],
    });
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<PetEntity> {
    const exitedUser = await this.userRepository.findOne({
      where: {
        id: updatePetDto.ownerId,
      },
    });

    if (!exitedUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const exitedBreed = await this.breedRepository.findOne({
      where: {
        id: updatePetDto.breedId,
      },
    });

    if (!exitedBreed) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['owner', 'breed'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    if (updatePetDto.name) pet.name = updatePetDto.name;
    if (updatePetDto.type) pet.type = updatePetDto.type;
    if (updatePetDto.growthRate) pet.growthRate = updatePetDto.growthRate;
    if (updatePetDto.description) pet.description = updatePetDto.description;
    if (updatePetDto.ownerId) pet.owner = exitedUser;
    if (updatePetDto.breedId) pet.breed = exitedBreed;

    return await this.petRepository.save(pet);
  }
}
