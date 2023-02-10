import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatsModule } from './chats/chats.module';
import {WhatsappWebService} from "./providers/whatsapp-web-service";
import {MessagesModule} from "./messages/messages.module";


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), ChatsModule],
  controllers: [AuthController],
  providers: [WhatsappWebService],
})
export class AppModule {}
