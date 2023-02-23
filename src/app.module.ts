import { Module } from '@nestjs/common';
import { BankModule } from './components/bank/bank.module';
import { CategoryModule } from './components/category/category.module';
import { TransactionsModule } from './components/transactions/transactions.module';

@Module({
  imports: [BankModule, CategoryModule, TransactionsModule],
})
export class AppModule {}
