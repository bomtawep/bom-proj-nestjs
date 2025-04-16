import {Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @CreateDateColumn({
    name: 'CREATED_AT',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'DELETED_AT',
    nullable: true,
  })
  deleted_at: Date;

  @Column({
    name: 'CREATED_BY',
    default: 'SYSTEM',
  })
  created_by: string;

  @Column({
    name: 'UPDATED_BY',
    default: 'SYSTEM',
  })
  updated_by: string;

  @Column({
    name: 'DELETED_BY',
    nullable: true,
  })
  deleted_by: string;
}
