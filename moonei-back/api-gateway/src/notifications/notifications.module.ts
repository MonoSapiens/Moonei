import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
