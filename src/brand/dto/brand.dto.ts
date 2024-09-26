import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class BrandDto {

  @IsNotEmpty()
  @IsString()
  name: string;

}