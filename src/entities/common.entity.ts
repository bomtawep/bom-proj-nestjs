import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsNotEmpty } from 'class-validator';

export abstract class Common {
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
  })
  deleted_at: Date;
}