import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UserModule,
    AuthModule,
  ],
  providers: [MessageService, ChatGateway],
})
export class ChatModule {}
