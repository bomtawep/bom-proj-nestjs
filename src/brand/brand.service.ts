import {BadRequestException, Injectable} from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Brand } from '~/entities/brand.entity';
import { BrandDto } from '~/brand/dto/brand.dto';
import {isUUID} from "class-validator";
import {plainToClass} from "class-transformer";
import {ProductType} from "~/entities/product-type.entity";
import {PaginationDto} from "~/dto";

@Injectable()
export class BrandService {
  constructor() {}

  async createBrand(q: QueryRunner, brand: BrandDto, user: string) {
    const brandEntity = plainToClass(BrandDto, brand);
    return q.manager.save(Brand, {
      ...brandEntity,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: user,
      updated_by: user,
    });
  }

  async findAllBrand(q: QueryRunner, pagination: PaginationDto) {
    const { page, limit } = pagination;

    const [brand, total] = await q.manager.findAndCount(Brand, {
      take: limit,
      skip: (page - 1) * limit,
      order: {
        updated_at: 'DESC',
      },
    });

    return {
      brand,
      total,
    };
  }

  async findOneBrand(q: QueryRunner, id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return q.manager.findOne(Brand, { where: { id: id } });
  }

  async updateBrand(q: QueryRunner, id: string, brand: BrandDto, user: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return q.manager.update(
        Brand,
        id,
        {
          ...brand,
          updated_at: new Date(),
          updated_by: user,
        },
    );
  }

  async removeBrand(q: QueryRunner, id: string) {
    return q.manager.delete(Brand, id);
  }
}
