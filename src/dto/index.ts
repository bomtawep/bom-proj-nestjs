import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;

  @IsNumber()
  limit: number;
}