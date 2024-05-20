import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckResponse } from './types/healthCheck';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'Auhtorization',
  description: 'google auth header',
})
@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Well Hello' })
  @ApiResponse({ status: 200, description: 'Whell Hello' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/check')
  @ApiOperation({ summary: 'Return time and env' })
  @ApiResponse({
    status: 200,
    description: 'Return and "check" the app status',
  })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({
    status: 500,
    description:
      'App can not connect to the db, retrive env configuraiton or system time',
  })
  public getCheck(): HealthCheckResponse {
    return this.appService.getHealthCheck();
  }
}
