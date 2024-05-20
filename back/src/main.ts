import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pjson from '../package.json';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import fs from 'fs';

async function bootstrap() {
  
  const appOptions: NestApplicationOptions = {
    logger: ['error', 'log', 'debug', 'warn'],
  };

  if(process.env.environment === 'production'){
    appOptions.httpsOptions = {
      key: fs.readFileSync(__dirname +'/secrets/key.pem'),
      cert: fs.readFileSync(__dirname +'/secrets/cert.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, appOptions);

  const config = new DocumentBuilder()
    .setTitle('Poken App Backend')
    .setDescription('The API for CookUnity challenge')
    .setVersion(pjson.version)
    .addTag('pokemon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
