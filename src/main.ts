import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NODE_ENV, SERVER_PORT } from './app.constants';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet/dist';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.setBaseViewsDir(join(__dirname, '..', 'resources/email_templates'));
  app.setViewEngine('hbs');

  await app.listen(SERVER_PORT);
}

bootstrap();
