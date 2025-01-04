import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uploadPath = './uploads';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        return {
          storage: diskStorage({
            destination(req, file, callback) {
              callback(null, uploadPath);
            },
          }),
          dest: configService.get<string>('MULTER_DEST'),
          limits: {
            fileSize: configService.get<number>('MULTER_MAX_FILE_SIZE'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class ImagesModule {}
