import { IsNotEmpty, IsString } from 'class-validator';
import {Exclude} from "class-transformer";

export class BrandDto {

  @Exclude()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @Exclude()
  created_at?: string;
}
