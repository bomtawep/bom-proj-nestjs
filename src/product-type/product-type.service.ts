import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ProductTypeDto } from '~/product-type/dto/product-type.dto';
import { ProductType } from '~/entities/product-type.entity';
import { PaginationDto } from '~/dto';

@Injectable()
export class ProductTypeService {
  constructor() {}

  async createProductType(q: QueryRunner, productType: ProductTypeDto) {
    return q.manager.save(ProductType, productType);
  }

  async findAllProductType(q: QueryRunner, pagination: PaginationDto) {
    console.log('pagination', pagination);
    const offset = pagination.page * pagination.limit;
    const [products, total] = await q.manager.findAndCount(ProductType, {
      take: pagination.limit,
      skip: offset,
      order: { updated_at: 'DESC' },
    });

    return {
      products,
      total,
    };
  }

  async findOneProductType() {
    return 'This action returns a product type';
  }

  async updateProductType() {
    return 'This action updates a product type';
  }

  async removeProductType() {
    return 'This action removes a product type';
  }
}
