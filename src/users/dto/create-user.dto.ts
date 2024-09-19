import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender, Role, UserStatus } from '~/constants/enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: string;

  @IsNotEmpty()
  @IsEnum(Role)
  roles: string;

  @IsString()
  @IsOptional()
  imageId: string;

}