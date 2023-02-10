import {Body, Controller, Post} from '@nestjs/common';
import {MessagesService} from './messages.service';
import {SendMessageDto} from "./dto/send-message.dto";
import {WhatsappWebService} from "../providers/whatsapp-web-service";

@Controller('messages')
export class MessagesController {
  constructor(private readonly whatsappWebService: WhatsappWebService) {}

  @Post()
  async send(@Body() message: SendMessageDto) {
    //return await this.whatsappWebService.sendMessage(message.chatId, message.message);
  }

}
