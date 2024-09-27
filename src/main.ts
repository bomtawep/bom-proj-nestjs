import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { Logger } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '~/utilities/transform-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  const apiPrefix = configService.get('API_PREFIX');
  const logger = new Logger('bootstrap');
  const config = new DocumentBuilder()
    .setTitle('bom')
    .setDescription('The bom API description')
    .setVersion('1.0')
    .addTag('bom')
    .addBearerAuth()
    .addServer(apiPrefix)
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (apiPrefix) app.setGlobalPrefix(apiPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  dayjs.locale('th');
  SwaggerModule.setup('api', app, document);
  try {
    await app.listen(port);
    logger.log(`Server running on ${app.getHttpServer().address().port}`);
  } catch (error) {
    logger.error('Error: ', error);
  }
}
bootstrap();
