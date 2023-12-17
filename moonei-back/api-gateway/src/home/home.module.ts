import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [HomeController]
})
export class HomeModule {}
