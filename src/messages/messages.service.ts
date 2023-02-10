import { Injectable } from '@nestjs/common';
import {WhatsappWebService} from "../providers/whatsapp-web-service";
import {SendMessageDto} from "./dto/send-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly whatsappWebService: WhatsappWebService){}
  async send(message: SendMessageDto){
    //return await this.whatsappWebService.sendMessage(message.chatId, message.message);
  }
}
