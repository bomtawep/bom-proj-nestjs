import { Module } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users.entity';
import { UsersController } from '~/users/users.controller';
import { LoggerModule } from '~/logger/logger.module';
import { QueryRunnerModule } from '~/query-runner/query-runner.module';

@Module({
  imports: [
    LoggerModule,
    QueryRunnerModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
