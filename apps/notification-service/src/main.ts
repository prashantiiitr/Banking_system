
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3005);

  console.log(
    'Notification Service Running on Port 3005',
  );
}

bootstrap();

