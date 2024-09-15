import { Module, SetMetadata } from '@nestjs/common';
import { AuthService } from '~/auth/auth.service';
import { UsersModule } from '~/users/users.module';
import { AuthController } from '~/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users.entity';
import { LoggerModule } from '~/logger/logger.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '~/auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}