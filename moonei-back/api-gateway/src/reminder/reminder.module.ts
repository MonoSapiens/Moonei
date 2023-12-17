import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [ReminderController]
})
export class ReminderModule {}
