import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductTypeDto {

  @IsNotEmpty()
  @IsString()
  name: string;

}