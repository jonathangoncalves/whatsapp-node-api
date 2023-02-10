import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import {WhatsappWebService} from "../providers/whatsapp-web-service";

@Module({
  controllers: [MessagesController],
  providers: [WhatsappWebService]
})
export class MessagesModule {}
