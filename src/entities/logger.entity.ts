import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '~/entities/common.entity';

@Entity('LOGGER', { schema: 'BOM' })
export class Logger extends Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'STATUS_CODE',
  })
  statusCode: string;

  @Column({
    name: 'MESSAGE',
  })
  message: string;

  @Column({
    name: 'PATH',
  })
  path: string;

  @Column({
    name: 'STACK',
  })
  stack: string;

  @Column({
    name: 'TIMESTAMP',
  })
  timestamp: Date;
}
