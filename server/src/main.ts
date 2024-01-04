import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import process from 'process';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  const config = new DocumentBuilder()
  .setTitle("Game Observer")
  .setVersion("1.0")
  .addBearerAuth()
  .build()
const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup("docs", app, document)
  await app.listen(3000, async () => {
    console.log(`Server started on port: 3000`)
  });
}
bootstrap();
