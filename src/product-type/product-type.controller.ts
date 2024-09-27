import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from '~/utilities/http-exception.filter';
import { QueryRunnerService } from '~/query-runner/query-runner.service';
import { ProductTypeService } from '~/product-type/product-type.service';
import { ProductTypeDto } from '~/product-type/dto/product-type.dto';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesGuard } from '~/auth/roles.guard';
import { Roles } from '~/auth/auth.decorator';
import { Role } from '~/constants/enum';

@UseFilters(HttpExceptionFilter)
@Controller('product-types')
export class ProductTypeController {
  constructor(
    @Inject(QueryRunnerService)
    private readonly queryRunnerService: QueryRunnerService,
    private readonly productTypeService: ProductTypeService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() productTypeDto: ProductTypeDto) {
    console.log('productTypeDto', productTypeDto);
    const q = await this.queryRunnerService.getQueryRunner();
    await q.startTransaction();
    try {
      const productType = await this.productTypeService.createProductType(
        q,
        productTypeDto,
      );
      await q.commitTransaction();
      return productType;
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async get() {
    const q = await this.queryRunnerService.getQueryRunner();
    await q.startTransaction();
    try {
      const productType = await this.productTypeService.findAllProductType(q);
      await q.commitTransaction();
      return productType;
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
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
