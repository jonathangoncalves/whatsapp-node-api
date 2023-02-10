import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {WhatsappWebService} from "./providers/whatsapp-web-service";

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whatsappWebService = app.get(WhatsappWebService);

  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API description')
      .setVersion(process.env.APP_VERSION)
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  whatsappWebService.initialize();

  await app.listen(3000);
}

bootstrap();
