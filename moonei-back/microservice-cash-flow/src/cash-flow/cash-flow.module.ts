import { Module } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowController } from './cash-flow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashFlowSchema } from './schema/cash-flow.schema';
import { CASH_FLOW } from './common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CASH_FLOW.name,
        useFactory: () => CashFlowSchema,
      },
    ])
  ],
  providers: [CashFlowService],
  controllers: [CashFlowController]
})
export class CashFlowModule {}
