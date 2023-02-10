import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {WhatsappWebService} from "../providers/whatsapp-web-service";
import {SendMessageDto} from "../messages/dto/send-message.dto";
import {ApiQuery, ApiResponse} from "@nestjs/swagger";
import {Chat} from "./entities/chat.entity";


@Controller()
export class ChatsController {
    constructor(private readonly whatsappWebService: WhatsappWebService) {
    }

    @Get('/chats')
    async findAll(page = 1, limit = 10) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Apply the pagination logic to your data here
        const allResults = await this.whatsappWebService.getChats();
        return allResults.slice(startIndex, endIndex);
    }

    @Get('/chat/:id')
    @ApiResponse({ status: 200, description: 'The found record', type: Chat })
    findOne(@Param('id') id: string) {
        return this.whatsappWebService.getChatById(id);
    }

    @Get('/chat/:id/messages')
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getChatMessages(
        @Param('id') id: string,
        @Query('page') page = 1,
        @Query('limit') limit  = 10
    ) {
        const startIndex = (page - 1) * +limit;
        const endIndex = startIndex + +limit;

        // Apply the pagination logic to your data here
        const allResults = (await this.whatsappWebService.getChatMessages(id)).reverse();
        return allResults.slice(startIndex, endIndex);
    }


    @Post("/chat/:id/message")
    async send(@Param('id') id: string,
               @Body() message: SendMessageDto) {
        return await this.whatsappWebService.sendMessage(id, message.message);
    }

}
