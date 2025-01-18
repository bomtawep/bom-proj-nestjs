import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '~/entities/common.entity';

@Entity('FILES', { schema: 'BOM' })
export class Files extends Common {
  @Column({
    name: 'ORIGINAL_NAME',
  })
  originalname: string;

  @Column({
    name: 'ENCODING',
  })
  encoding: string;

  @Column({
    name: 'MIMETYPE',
  })
  mimetype: string;

  @Column({
    name: 'DESTINATION',
  })
  destination: string;

  @Column({
    name: 'FILENAME',
  })
  filename: string;

  @Column({
    name: 'PATH',
  })
  path: string;

  @Column({
    name: 'SIZE',
  })
  size: number;
}
