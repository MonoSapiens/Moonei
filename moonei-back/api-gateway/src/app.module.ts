import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReminderModule } from './reminder/reminder.module';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';
import { CategoryModule } from './category/category.module';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UserModule,
    ProjectModule,
    AuthModule,
    ProxyModule,
    CashFlowModule,
    NotificationsModule,
    ReminderModule,
    ChatModule,
    HomeModule,
    CategoryModule,
    InvestmentModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
