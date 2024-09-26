import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Product } from '~/entities/product.entity';

@Injectable()
export class ProductService {
  createProduct(q: QueryRunner, product: Product) {
    return q.manager.save(Product, product);
  }

  findAllProduct() {
    return 'This action returns all product';
  }

  findOneProduct() {
    return 'This action returns a product';
  }

  updateProduct() {
    return 'This action updates a product';
  }

  removeProduct() {
    return 'This action removes a product';
  }
}
