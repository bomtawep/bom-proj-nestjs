import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common } from '~/entities/common.entity';

@Entity(
  'USERS',
  { schema: 'BOM', }
)
export class User extends Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'USERNAME',
  })
  username: string;

  @Column({
    name: 'PASSWORD',
  })
  password: string;

  @Column({
    name: 'FIRSTNAME',
  })
  firstname: string;

  @Column({
    name: 'LASTNAME',
  })
  lastname: string;

  @Column({
    nullable: true,
    name: 'NICKNAME'
  })
  nickname: string | null;

  @Column({
    name: 'GENDER',
  })
  gender: string;

  @Column({
    nullable: true,
    name: 'PHONE_NUMBER'
  })
  phoneNumber: string | null;

  @Column({
    name: 'EMAIL',
  })
  email: string;

  @Column({
    nullable: true,
    name: 'ADDRESS'
  })
  address: string | null;

  @Column({
    name: 'STATUS',
  })
  status: string | null;

  @Column({
    name: 'ROLES',
    default: 'USER',
  })
  roles: string;
}