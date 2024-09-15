import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelpCheck(): string {
    return 'Service is up and running!';
  }
}
