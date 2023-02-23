import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { bankProviders } from './entity/bank.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => TransactionsModule)],
  controllers: [BankController],
  providers: [BankService, ...bankProviders],
  exports: [BankService],
})
export class BankModule {}
