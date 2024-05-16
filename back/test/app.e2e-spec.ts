import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { healthCheckResponse, systemDate } from './fixture/healthCheck';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(systemDate);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/check (GET)', () => {
    return request(app.getHttpServer())
      .get('/check')
      .expect(200)
      .expect(healthCheckResponse);
  });
});
