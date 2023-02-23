import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { PageOptionsDto } from '../../dto/page-options.dto';
import { PageMetaDto } from '../../dto/page.meta.res.dto';
import { Bank } from '../bank/entity/bank.entity';
import { Category } from '../category/entity/category.entity';
import { CategoryTransactions } from '../category_transactions/entity/category_transactions.entity';
import { CreateTransactionPayloadReqDto } from './dto/create-transaction-payload.req.dto';
import { TransactionsDto } from './dto/get-all-transactions.res.dto';
import { PageDto } from './dto/page-transaction-pagination.res.dto';
import { Transactions } from './entity/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionsRepository: Repository<Transactions>,
    @Inject('CATEGORY_TRANSACTIONS_REPOSITORY')
    private categoryTransactionsRepository: Repository<CategoryTransactions>,
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<Bank>,
  ) {}

  async createTransaction(data: CreateTransactionPayloadReqDto): Promise<any> {
    const { amount, type, bankId } = data;
    const transaction = await this.transactionsRepository.create({
      amount: amount,
      type: type,
      bank: bankId,
    });
    const savedTransaction = await this.transactionsRepository.save(transaction);
    //recalculation of the bank balance
    // if (savedTransaction) {
    //   await this.bankRepository
    //     .createQueryBuilder()
    //     .update()
    //     .set({
    //       balance: () => {
    //         return this.transactionsRepository
    //           .createQueryBuilder()
    //           .select('SUM(CASE WHEN t.type = :profitable THEN t.amount ELSE -t.amount END)')
    //           .where('t.bankId = b.id', { bankId: 'bankId' })
    //           .getQuery();
    //       },
    //     })
    //     .where('EXISTS (SELECT * FROM Transactions t WHERE t.bankId = b.id)')
    //     .execute();
    // }
    const category = await this.categoryRepository.findOneById(data.categoryId);
    const ct = await this.categoryTransactionsRepository.create({
      transactionsId: savedTransaction.id,
      categoryId: category.id,
    });
    await this.categoryTransactionsRepository.save(ct);
    return savedTransaction;
  }

  async getAllTransactions(pageOptionsDto: PageOptionsDto): Promise<PageDto<TransactionsDto>> {
    const queryBuilder = this.transactionsRepository.createQueryBuilder('transactions');
    queryBuilder
      .orderBy('transactions.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async deleteTransaction(id: number): Promise<DeleteResult> {
    return await this.transactionsRepository.delete(id);
    //recalculation of the bank balance
    // await this.bankRepository
    //   .createQueryBuilder()
    //   .update()
    //   .set({
    //     balance: () => {
    //       return this.transactionsRepository
    //         .createQueryBuilder()
    //         .select('SUM(CASE WHEN t.type = :profitable THEN t.amount ELSE -t.amount END)')
    //         .where('t.bankId = b.id', { bankId: 'bankId' })
    //         .getQuery();
    //     },
    //   })
    //   .where('EXISTS (SELECT * FROM Transactions t WHERE t.bankId = b.id)')
    //   .exec
  }

  async findTransaction(id: string): Promise<Transactions[]> {
    return this.transactionsRepository.find({
      where: {
        bank: id,
      },
    });
  }
}
