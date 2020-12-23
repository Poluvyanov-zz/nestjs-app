import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NODE_ENV, SERVER_PORT } from './app.constants';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet/dist';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
    }),
  );
  // app.use(
    // rateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // limit each IP to 100 requests per windowMs
    // }),
  // );
  await app.listen(SERVER_PORT);
}

bootstrap();
