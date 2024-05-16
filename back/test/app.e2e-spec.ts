import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { healthCheckResponse, systemDate } from './fixture/healthCheck';
// eslint-disable-next-line
const Docker = require('dockerode');

describe('AppController (e2e)', () => {
  jest.setTimeout(6000);
  let app: INestApplication;

  const docker = new Docker();

  let postgresContainer;

  const postgresImageName: string = 'postgres:latest';
  const containerPort: string = `${process.env.POSTGRES_PORT}/tcp`;
  const portBindings = {};
  const exposedPorts = {};

  portBindings[containerPort] = [{ HostPort: `${process.env.POSTGRES_PORT}` }];
  exposedPorts[containerPort] = portBindings;

  beforeAll(async () => {
    docker.pull(postgresImageName);
    postgresContainer = await docker.createContainer({
      Image: postgresImageName,
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      ExposedPorts: exposedPorts,
      HostConfig: {
        PortBindings: portBindings,
      },
      Env: [
        `POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD}`,
        `POSTGRES_PORT=${process.env.POSTGRES_PORT}`,
        `POSTGRES_DB=${process.env.POSTGRES_DB}`,
        `POSTGRES_USER=${process.env.POSTGRES_USER}`,
      ],
    });
    await postgresContainer.start();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(async () => {
    await postgresContainer.stop();
    await postgresContainer.remove();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/check (GET)', () => {
    jest.useFakeTimers().setSystemTime(systemDate);
    healthCheckResponse.environment = 'LOCAL';
    return request(app.getHttpServer())
      .get('/check')
      .expect(200)
      .expect(healthCheckResponse);
  });
});
