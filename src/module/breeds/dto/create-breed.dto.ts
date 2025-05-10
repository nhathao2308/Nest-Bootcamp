import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  baseGrowthRate: string;

  @IsString()
  @IsOptional()
  specialCharacteristics?: string;
}
