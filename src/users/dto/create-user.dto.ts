import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender, Role, UserStatus } from '~/constants/enum';
import { VerifyUserDto } from '~/users/dto/verify-user.dto';

export class CreateUserDto extends VerifyUserDto {
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
