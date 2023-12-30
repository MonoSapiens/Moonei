import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CashFlowModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB_CASH_FLOW)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
