import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {

  @Expose()
  id: string;

  @Exclude()
  password: string;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
