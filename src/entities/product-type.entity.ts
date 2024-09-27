import { Common } from '~/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PRODUCT_TYPE', { schema: 'BOM' })
export class ProductType extends Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'NAME',
  })
  name: string;
}
