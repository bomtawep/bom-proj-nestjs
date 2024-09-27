import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { QueryRunnerService } from '~/query-runner/query-runner.service';
import { ProductService } from '~/product/product.service';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesGuard } from '~/auth/roles.guard';
import { Roles } from '~/auth/auth.decorator';
import { Role } from '~/constants/enum';
import { Product } from '~/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(QueryRunnerService)
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() product: Product) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const productType = await this.productService.createProduct(q, product);
      await q.commitTransaction()
      return productType
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }
}
