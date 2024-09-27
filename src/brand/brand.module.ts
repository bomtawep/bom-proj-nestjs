import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { LoggerModule } from '~/logger/logger.module';
import { QueryRunnerModule } from '~/query-runner/query-runner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from '~/entities/product-type.entity';

@Module({
  imports: [
    LoggerModule,
    QueryRunnerModule,
    TypeOrmModule.forFeature([ProductType]),
  ],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
