import {Injectable} from '@nestjs/common';
import {Client, LocalAuth, MessageSearchOptions} from "whatsapp-web.js";
import * as fs from "fs";
import * as QRCode from "qrcode"

@Injectable()
export class WhatsappWebService {
    client: Client;
    ready: false;

    async initialize() {
        this.client = new Client({
            puppeteer: {
                args: ['--no-sandbox'],
            },
            authStrategy: new LocalAuth()
        })

        this.client.on('qr', async (qr) => {
            console.log('QRCODE: ', qr)
            fs.writeFile(process.env.QRCODE_PATH, qr, (err) => {
                if (!err) {
                    return
                }
                console.log('System cannot write file: ', process.env.QRCODE_PATH)
                console.log('error: ', err.message)

                throw err
            })

            let imageUrl = await QRCode.toDataURL(qr, {version: 11})

            const binary = Buffer.from(imageUrl.split(",")[1], "base64");
            // Write the binary data to a file
            fs.writeFileSync("./public/assets/images/last-qr.jpg", binary);

        })

        this.client.on('ready', () => {
            console.log('Whatsapp web is ready!')
            if(!fs.existsSync(process.env.QRCODE_PATH)) {
                return;
            }
            fs.unlink(process.env.QRCODE_PATH, (err) => {
                if (err) throw err;
            });
            fs.unlink("./public/assets/images/last-qr.jpg", (err) => {
                if (err) throw err;
            });

        })

        this.client.on('authenticated', () => {
            console.log('Whatsapp web is authenticated!')
        })

        await this.client.initialize();
    }

    async getQrCode() {
        if(!fs.existsSync(process.env.QRCODE_PATH)) {
            return {
                status: "authenticated"
            };
        }
        let wp = fs.readFileSync(process.env.QRCODE_PATH).toString()
        let base64 = await QRCode.toDataURL(wp, {version: 11})

        return {
            status: "not_authenticated",
            url: process.env.APP_URL + '/assets/images/last-qr.jpg',
            base64: base64,
        }
    }
    //TODO: check if service is initialized
    async getChats() {
        const chats = await this.client.getChats()
        return chats
    }

    async sendMessage(chatId: string, message: string) {
        let number = chatId.includes('@c.us') ? chatId : `${chatId}@c.us`;
        let chat = await this.client.getChatById(number);
        chat.sendSeen();
        return await this.client.sendMessage(number, message)
    }

    async getChatById(chatId: string) {
        let number = chatId.includes('@c.us') ? chatId : `${chatId}@c.us`;
        return await this.client.getChatById(number);
    }

    async getChatMessages(chatId: string) {
        let number = chatId.includes('@c.us') ? chatId : `${chatId}@c.us`;
        let chat = await this.client.getChatById(number);

        return await chat.fetchMessages({limit: 100});
    }
}
