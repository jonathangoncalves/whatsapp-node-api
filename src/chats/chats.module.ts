import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import {WhatsappWebService} from "../providers/whatsapp-web-service";

@Module({
  controllers: [ChatsController],
  providers: [WhatsappWebService]
})
export class ChatsModule {}
