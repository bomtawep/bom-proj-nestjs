import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Product } from '~/entities/product.entity';
import { PaginationDto } from '~/dto';

@Injectable()
export class ProductService {
  createProduct(q: QueryRunner, product: Product) {
    return q.manager.save(Product, product);
  }

  async findAllProduct(q: QueryRunner, pagination: PaginationDto) {
    const offset = pagination.page * pagination.limit;
    const [products, total] = await q.manager.findAndCount(
      Product,
      // Find with pagination
      {
        take: pagination.limit,
        skip: offset,
      },
    );
    return {
      products,
      total,
    };
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
