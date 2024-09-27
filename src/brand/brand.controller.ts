import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from '~/brand/brand.service';
import { HttpExceptionFilter } from '~/utilities/http-exception.filter';
import { QueryRunnerService } from '~/query-runner/query-runner.service';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesGuard } from '~/auth/roles.guard';
import { Roles } from '~/auth/auth.decorator';
import { Role } from '~/constants/enum';
import { BrandDto } from '~/brand/dto/brand.dto';

@UseFilters(HttpExceptionFilter)
@Controller('brand')
export class BrandController {
  constructor(
    @Inject(QueryRunnerService)
    private readonly queryRunnerService: QueryRunnerService,
    private readonly brandService: BrandService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() brandDto: BrandDto) {
    const q = await this.queryRunnerService.getQueryRunner();
    await q.startTransaction();
    try {
      const brand = await this.brandService.createBrand(q, brandDto);
      await q.commitTransaction();
      return brand;
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
      const brand = await this.brandService.findAllBrand(q);
      await q.commitTransaction();
      return brand;
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }
}
