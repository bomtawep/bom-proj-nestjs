import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { LoggerModule } from '~/logger/logger.module';
import { QueryRunnerModule } from '~/query-runner/query-runner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '~/entities/product.entity';

@Module({
  imports: [
    LoggerModule,
    QueryRunnerModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
