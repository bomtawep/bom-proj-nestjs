import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Brand } from '~/entities/brand.entity';
import { BrandDto } from '~/brand/dto/brand.dto';

@Injectable()
export class BrandService {
  constructor() {}

  async createBrand(q: QueryRunner, productType: BrandDto) {
    return q.manager.save(Brand, productType);
  }

  async findAllBrand(q: QueryRunner) {
    return await q.manager.find(Brand);
  }

  async findOneBrand(q: QueryRunner, id: string) {
    return q.manager.findOne(Brand, { where: { id: id } });
  }

  async updateBrand(q: QueryRunner, id: string, brandDto: BrandDto) {
    return q.manager.update(Brand, id, brandDto);
  }

  async removeBrand() {
    return 'This action removes a brand';
  }
}
