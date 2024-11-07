import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Kanbios Chat API')
    .setDescription("Documentation de l'API Kanbios Chat")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.tags = [
    { name: 'Authentification', description: "Opérations d'authentification" },
    { name: 'Utilisateurs', description: 'Gestion des utilisateurs' },
  ];

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.NODE_PORT ?? 3001);
}

bootstrap();
