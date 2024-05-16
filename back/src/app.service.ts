import { Injectable } from '@nestjs/common';
import { HealthCheckResponse } from './types/healthCheck';

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Hello World!';
  }

  public getHealthCheck(): HealthCheckResponse {
    return {
      systemTime: new Date().toISOString(),
    };
  }
}
