import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app-rooot/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Users API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);

    console.log(`Swagger: http://localhost:${process.env.PORT ?? 3000}/docs`);

    console.log(
      `Health Check: http://localhost:${process.env.PORT ?? 3000}/healthcheck`,
    );
  });
}
bootstrap();
