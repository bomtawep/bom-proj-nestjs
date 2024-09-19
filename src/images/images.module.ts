import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination(req, file, callback) {
            callback(null, './uploads');
          },
          // filename(req, file, callback) {
          //   const newFileName = new Date().getTime() + '_' + file.originalname;
          //   callback(null, newFileName);
          // },
        }),
        dest: configService.get<string>('MULTER_DEST'),
        limits: {
          fileSize: configService.get<number>('MULTER_MAX_FILE_SIZE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ImagesModule {}
