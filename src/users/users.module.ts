import { Module } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users.entity';
import { UsersController } from '~/users/users.controller';
import { LoggerModule } from '~/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
