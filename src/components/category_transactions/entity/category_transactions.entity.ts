import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { Transactions } from '../../transactions/entity/transactions.entity';

@Entity('category_transactions')
export class CategoryTransactions {
  @PrimaryColumn({ name: 'transactions_id' })
  transactionsId: number;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Transactions, (transaction) => transaction.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'transactions_id', referencedColumnName: 'id' }])
  transactions: Transactions[];

  @ManyToOne(() => Category, (category) => category.transactions, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  categories: Category[];
}
