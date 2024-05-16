import { Injectable } from '@nestjs/common';
import { HealthCheckResponse } from './types/healthCheck';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configuration: ConfigService) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public getHealthCheck(): HealthCheckResponse {
    return {
      systemTime: new Date().toISOString(),
      environment: this.configuration.get<string>('environment'),
    };
  }
}
