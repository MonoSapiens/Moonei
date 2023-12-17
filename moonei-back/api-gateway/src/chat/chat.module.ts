import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [ChatController]
})
export class ChatModule {}
