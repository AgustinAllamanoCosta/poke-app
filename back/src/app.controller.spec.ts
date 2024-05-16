import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckResponse } from './types/healthCheck';
import { healthCheckResponse, systemDate } from '../test/fixture/healthCheck';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(systemDate);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
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
