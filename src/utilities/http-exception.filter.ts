import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '~/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService)
    private readonly loggerService: LoggerService,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    console.log("LOG ERROR => Status code: " + status + " | Message: " + exception.message);
    this.loggerService
      .createLogger({
        statusCode: status.toString(),
        message: exception.message,
        timestamp: new Date(),
        path: request.url,
        stack: exception.stack,
      })
      .then(() =>
        console.error(
          `LOG ERROR => Status code: ${status}` +
            ` | Message: ${exception.message}`,
        ),
      );
  }
}
