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
      return await q.manager.find(Brand)
    }

    async findOneBrand() {
        return 'This action returns a brand';
    }

    async updateBrand() {
        return 'This action updates a brand';
    }

    async removeBrand() {
        return 'This action removes a brand';
    }
}
