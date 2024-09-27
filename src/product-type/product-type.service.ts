import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ProductTypeDto } from '~/product-type/dto/product-type.dto';
import { ProductType } from '~/entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  constructor() {}

  async createProductType(q: QueryRunner, productType: ProductTypeDto) {
    return q.manager.save(ProductType, productType);
  }

  async findAllProductType(q: QueryRunner) {
    const productType = await q.manager.find(ProductType);
    // remove index before send response
    console.log('productType', productType);
    return productType;
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
