import { Common } from '~/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BRAND', { schema: 'BOM' })
export class Brand extends Common {
  @Column({
    name: 'NAME',
  })
  name: string;
}
