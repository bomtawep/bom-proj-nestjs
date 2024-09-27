import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '~/images/images.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Controller('images')
export class ImagesController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly imagesService: ImagesService,
  ) {}

  private async getQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const q = await this.getQueryRunner();
    await q.startTransaction();
    try {
      const image = await this.imagesService.uploadFile(q, file);
      await q.commitTransaction();
      return image;
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }

  // @Get(':id')
  // async getFiles(@Param('id') id: string) {
  //   const q = await this.getQueryRunner()
  //   await q.startTransaction()
  //   try {
  //     return await this.imagesService.findOne(q, id)
  //   } catch (error) {
  //     throw error
  //   } finally {
  //     await q.release()
  //   }
  // }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    const q = await this.getQueryRunner();
    await q.startTransaction();
    try {
      const file = await this.imagesService.findOne(q, id);
      await q.commitTransaction();
      return file;
    } catch (error) {
      await q.rollbackTransaction();
      return error;
    } finally {
      await q.release();
    }
  }
}
