import { Common } from '~/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PRODUCT', { schema: 'BOM' })
export class Product extends Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'NAME',
  })
  name: string;

  @Column({
    name: 'PRICE',
  })
  price: number;

  @Column({
    name: 'COST',
  })
  cost: number;

  @Column({
    name: 'STOCK',
  })
  stock: number;

  @Column({
    name: 'DESCRIPTION',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'STATUS',
  })
  status: string;

  @Column({
    name: 'WEIGHT',
    nullable: true,
  })
  weight: number | null;

  @Column({
    name: 'LENGTH',
    nullable: true,
  })
  length: number | null;

  @Column({
    name: 'WIDTH',
    nullable: true,
  })
  width: number | null;

  @Column({
    name: 'HEIGHT',
    nullable: true,
  })
  height: number | null;

  @Column({
    name: 'DISCOUNT',
    nullable: true,
  })
  discount: number | null;

  @Column({
    name: 'DISCOUNT_TYPE',
    nullable: true,
  })
  discountType: string | null;

  @Column({
    name: 'DISCOUNT_VALUE',
    nullable: true,
  })
  discountValue: number | null;

  @Column({
    name: 'DISCOUNT_START',
    nullable: true,
  })
  discountStart: Date | null;

  @Column({
    name: 'DISCOUNT_END',
    nullable: true,
  })
  discountEnd: Date | null;

  @Column({
    name: 'IMAGE_ID',
  })
  imageId: string;

  @Column({
    name: 'BRAND_ID',
  })
  brandId: string;

  @Column({
    name: 'PRODUCT_TYPE_ID',
  })
  productTypeId: string;
}
