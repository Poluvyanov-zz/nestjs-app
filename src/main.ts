import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NODE_ENV, SERVER_PORT } from './app.constants';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
    }),
  );
  await app.listen(SERVER_PORT);
}

bootstrap();
