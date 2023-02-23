import { DataSource } from 'typeorm';
import { Transactions } from './transactions.entity';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transactions),
    inject: ['DATA_SOURCE'],
  },
];
