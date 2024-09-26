import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { LoggerModule } from '~/logger/logger.module';
import { QueryRunnerModule } from '~/query-runner/query-runner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users.entity';
import { ProductType } from '~/entities/product-type.entity';

@Module({
  imports: [
    LoggerModule,
    QueryRunnerModule,
    TypeOrmModule.forFeature([ProductType]),
  ],
  providers: [ProductTypeService],
  controllers: [ProductTypeController]
})
export class ProductTypeModule {}
