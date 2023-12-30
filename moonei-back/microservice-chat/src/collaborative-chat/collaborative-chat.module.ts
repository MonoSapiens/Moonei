import { Module } from '@nestjs/common';
import { CollaborativeChatController } from './collaborative-chat.controller';
import { CollaborativeChatService } from './collaborative-chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { collaborativeChatSchema } from './schema/collaborative-chat.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'collaborative-chat',
        useFactory: () => collaborativeChatSchema
      },
    ]), 
  ],
  controllers: [CollaborativeChatController],
  providers: [CollaborativeChatService]
})
export class CollaborativeChatModule {}
