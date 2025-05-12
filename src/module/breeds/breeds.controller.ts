import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { BreedEntity } from './entities/breed.entity';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';

@Controller('breeds')
@UseGuards(RoleGuard)
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    return await this.breedsService.create(createBreedDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  async getAllBreed(): Promise<BreedEntity[]> {
    return await this.breedsService.getAllBreed();
  }
}
