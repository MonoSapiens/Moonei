import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaborativeChatModule } from './collaborative-chat/collaborative-chat.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CollaborativeChatModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB_COLLABORATIVE_CHAT)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
