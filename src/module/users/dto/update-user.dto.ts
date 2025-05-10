import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  // @IsUUID()
  // id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  gender?: string;
}
