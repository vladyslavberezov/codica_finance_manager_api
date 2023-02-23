import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transactions } from '../../transactions/entity/transactions.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @IsString()
  @Column('varchar', { name: 'name', length: 50, unique: true })
  name: string;

  @IsNumber()
  @Column('int')
  balance: number;

  @OneToMany(() => Transactions, (transaction) => transaction.bank)
  transactions: Transactions[];
}
