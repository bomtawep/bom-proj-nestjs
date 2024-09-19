import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        map((data) => ({
          data: {...data},
          url,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
        })),
      );
  }
}