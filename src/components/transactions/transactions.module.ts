import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { bankProviders } from '../bank/entity/bank.providers';
import { categoryProviders } from '../category/entity/category.providers';
import { categoryTransactionsProviders } from '../category_transactions/entity/transactions-category.providers';
import { transactionProviders } from './entity/transactions.providers';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ...transactionProviders,
    ...categoryTransactionsProviders,
    ...categoryProviders,
    ...bankProviders,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
