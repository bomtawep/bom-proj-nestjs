import { Body, Controller } from '@nestjs/common';
import { Logger } from '~/entities/logger.entity';
import { LoggerService } from '~/logger/logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  async create(@Body() createUserDto: Logger) {
    return await this.loggerService.createLogger(createUserDto);
  }
}
