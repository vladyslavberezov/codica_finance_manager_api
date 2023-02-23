import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transactions } from '../../transactions/entity/transactions.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @IsString()
  @Column('varchar', { name: 'name', length: 50, unique: true })
  name: string;

  @ManyToMany(() => Transactions, (transaction) => transaction.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  transactions?: Transactions[];
}
