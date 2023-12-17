import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [InvestmentController]
})
export class InvestmentModule {}
