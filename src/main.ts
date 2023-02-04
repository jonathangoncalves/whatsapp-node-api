import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {Client} from "whatsapp-web.js";
import * as fs from "fs";
import * as QRCode from "qrcode"

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API description')
      .setVersion('0.0.1')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
  await whatsappWebBoot();
}

async function whatsappWebBoot(){
  const client = new Client({
    puppeteer: {
      args: ['--no-sandbox'],
    }
  })

  client.on('qr', async (qr) => {
    console.log('QRCODE: ', qr)
    fs.writeFile(process.env.QRCODE_PATH, qr, (err) => {
      if (err) throw err;
    });

    let imageUrl = await QRCode.toDataURL(qr, {version: 11})

    const binary = Buffer.from(imageUrl.split(",")[1], "base64");
    // Write the binary data to a file
    fs.writeFileSync("./public/assets/images/last-qr.jpg", binary);

  })

  client.on('ready', () => {
    console.log('Client is ready!')
  })

  client.on('authenticated', () => {
    console.log('Client is auhtenticated!')
  })

  await client.initialize();
}

bootstrap();
