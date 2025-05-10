import { Controller, Post, Body } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { BreedEntity } from './entities/breed.entity';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  async create(@Body() createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    return await this.breedsService.create(createBreedDto);
  }
}
