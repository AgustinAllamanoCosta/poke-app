import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckResponse } from './types/healthCheck';
import { healthCheckResponse, systemDate } from '../test/fixture/healthCheck';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(systemDate);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    const configurationService: ConfigService =
      app.get<ConfigService>(ConfigService);
    configurationService.set('environment', 'test');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return the system time', () => {
      const healthCheck: HealthCheckResponse = appController.getCheck();

      expect(healthCheck).toStrictEqual(healthCheckResponse);
    });
  });
});
