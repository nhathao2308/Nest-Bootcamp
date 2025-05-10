import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './entities/pet.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<PetEntity> {
    return await this.petsService.create(createPetDto);
  }

  @Get()
  async findAll(): Promise<PetEntity[]> {
    return await this.petsService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<PetEntity[]> {
    return await this.petsService.findByUserId(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return await this.petsService.update(Number(id), updatePetDto);
  }
}
