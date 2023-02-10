import { Injectable } from '@nestjs/common';

import {WhatsappWebService} from "../providers/whatsapp-web-service";

@Injectable()
export class ChatsService {
  constructor(private readonly whatsappWebService: WhatsappWebService){}

  async findAll() {
    return await this.whatsappWebService.getChats();
  }

}
