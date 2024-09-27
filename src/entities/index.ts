import { User } from '~/entities/users.entity';
import { Logger } from '~/entities/logger.entity';
import { Files } from '~/entities/files.entity';
import { Product } from '~/entities/product.entity';
import { ProductType } from '~/entities/product-type.entity';
import { Brand } from '~/entities/brand.entity';

export const entities = [
  User,
  Logger,
  Files,
  Product,
  ProductType,
  Brand,
];