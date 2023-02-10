import {Controller, Get} from '@nestjs/common'
import {WhatsappWebService} from "../providers/whatsapp-web-service";
require('dotenv').config()

@Controller('auth')
export class AuthController {
    constructor(private readonly whatsappWebService: WhatsappWebService) {
    }
    @Get('qrCode')
    async qrCode() {
       return this.whatsappWebService.getQrCode()
    }
}