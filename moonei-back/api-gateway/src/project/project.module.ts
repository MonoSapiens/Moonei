import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [ProjectController]
})
export class ProjectModule {}
