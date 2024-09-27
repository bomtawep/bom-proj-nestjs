import { Common } from '~/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BRAND', { schema: 'BOM' })
export class Brand extends Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'NAME',
  })
  name: string;
}
