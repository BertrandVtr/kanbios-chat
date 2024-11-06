import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.reduce((acc, { property, constraints }) => {
          acc[property] = Object.values(constraints);
          return acc;
        }, {});

        return new BadRequestException(message);
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.NODE_PORT ?? 3001);
}

bootstrap();
