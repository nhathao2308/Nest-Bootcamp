import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { BreedEntity } from './entities/breed.entity';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('breeds')
@UseGuards(RoleGuard)
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    return await this.breedsService.create(createBreedDto);
  }

  @Get()
  @Roles('admin', 'user')
  async getAllBreed(): Promise<BreedEntity[]> {
    return await this.breedsService.getAllBreed();
  }
}
