import { Injectable, Res } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Files } from '~/entities/files.entity';
import { plainToInstance } from 'class-transformer';
import { ErrorException } from '~/utilities/http-exception';

const { NotFound } = ErrorException()

@Injectable()
export class ImagesService {
  constructor() {}

  async uploadFile(q: QueryRunner, file: Express.Multer.File) {
    return await q.manager.save(Files, file)
  }

  async findOne(q: QueryRunner, id: string) {
    const file = await q.manager.findOne(Files, { where: { id: id } })
    if (!file) throw NotFound

    const files = plainToInstance(Files, file)
    console.log('files', files)
    return files
  }
}
