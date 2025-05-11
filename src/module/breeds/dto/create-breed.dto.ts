import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  lifespan: number;

  @IsString()
  @IsOptional()
  location: string;
}
