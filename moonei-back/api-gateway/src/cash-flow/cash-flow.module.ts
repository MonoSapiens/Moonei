import { Module } from '@nestjs/common';
import { CashFlowController } from './cash-flow.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [CashFlowController]
})
export class CashFlowModule {}
