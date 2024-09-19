import { Module, SetMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '~/entities';
import { AppService } from '~/app.service'
import { AppController } from '~/app.controller';
import appConfig from '~/configs/configuration';
import { UsersModule } from '~/users/users.module';
import { bomDataSource } from '~/constants/datasource';
import { APP_GUARD } from '@nestjs/core';
// import { ScheduleModule } from '@nestjs/schedule';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '~/auth/constants';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [...entities],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: bomDataSource.BOM,
      useFactory: (configService: ConfigService) => {
          return ({
            ...configService.get('database'),
            entities: [...entities],
          })
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: (join(__dirname, '../uploads')),
      serveRoot: '/uploads/',
    }),
    // ScheduleModule.forRoot(),
    // ThrottlerModule.forRoot({ ttl: 60, limit: 60 }),
    // EventEmitterModule.forRoot({
    //   ignoreErrors: true,
    // }),
    UsersModule,
    AuthModule,
    LoggerModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
