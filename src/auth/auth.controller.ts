import {Controller, Get} from '@nestjs/common'
import * as fs from "fs"
import * as QRCode from "qrcode"
require('dotenv').config()

@Controller('auth')
export class AuthController {
    @Get('qrCode')
    async qrCode() {
        let wp = fs.readFileSync(process.env.QRCODE_PATH).toString()
        let base64 = await QRCode.toDataURL(wp, {version: 11})

        return {
            url: process.env.APP_URL + '/assets/images/last-qr.jpg',
            base64: base64,
        }
    }
}