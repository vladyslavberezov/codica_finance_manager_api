import { DataSource } from 'typeorm';
import { Bank } from '../../components/bank/entity/bank.entity';
import { Category } from '../../components/category/entity/category.entity';
import { CategoryTransactions } from '../../components/category_transactions/entity/category_transactions.entity';
import { Transactions } from '../../components/transactions/entity/transactions.entity';
import config from '../../config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.dbUserEntry,
        password: config.dbPassword,
        database: config.dbName,
        entities: [Bank, Transactions, Category, CategoryTransactions],
        synchronize: true,
        // logging: true,
      });

      return dataSource.initialize();
    },
  },
];
