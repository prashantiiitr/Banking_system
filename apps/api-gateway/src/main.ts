
import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe(),
  );

  const config =
    new DocumentBuilder()
      .setTitle('API Gateway')
      .setDescription(
        'Central Banking Gateway',
      )
      .setVersion('1.0')
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(3000);

  console.log(
    'API Gateway Running on Port 3000',
  );
}

bootstrap();

