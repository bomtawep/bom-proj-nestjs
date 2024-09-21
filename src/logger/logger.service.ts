import { Injectable } from '@nestjs/common';
import { Logger } from '~/entities/logger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Logger)
    private readonly loggerRepository: Repository<Logger>,
  ) {}
  public async createLogger(logger: Partial<Logger>) {
    return await this.loggerRepository.save(logger);
  }
}
