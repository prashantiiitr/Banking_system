
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

  app.useGlobalPipes(
    new ValidationPipe(),
  );

  const config =
    new DocumentBuilder()
      .setTitle('Transaction Service')
      .setDescription(
        'Banking Transaction APIs',
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

  await app.listen(3003);

  console.log(
    'Transaction Service Running on Port 3003',
  );
}

bootstrap();

