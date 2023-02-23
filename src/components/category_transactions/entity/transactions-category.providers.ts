import { DataSource } from 'typeorm';
import { CategoryTransactions } from './category_transactions.entity';

export const categoryTransactionsProviders = [
  {
    provide: 'CATEGORY_TRANSACTIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoryTransactions),
    inject: ['DATA_SOURCE'],
  },
];
