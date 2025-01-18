import { Common } from '~/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PRODUCT_TYPE', { schema: 'BOM' })
export class ProductType extends Common {
  @Column({
    name: 'NAME',
  })
  name: string;
}
