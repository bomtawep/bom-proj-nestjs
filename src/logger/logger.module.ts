import { Module } from '@nestjs/common';
import { LoggerService } from '~/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '~/entities/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logger])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
