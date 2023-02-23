import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionsType } from '../../../core/helpers/transaction.enum';
import { Bank } from '../../bank/entity/bank.entity';
import { Category } from '../../category/entity/category.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int')
  @IsNumber()
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionsType,
    default: TransactionsType.profitable,
  })
  type: TransactionsType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  @ManyToOne(() => Bank, (bank) => bank.id)
  bank: string;

  @ManyToMany(() => Category, (category) => category.transactions, {
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'category_transactions',
    joinColumn: {
      name: 'transactions_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories?: Category[];
}
