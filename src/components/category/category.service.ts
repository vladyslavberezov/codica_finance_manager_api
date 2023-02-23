import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoryTransactions } from '../category_transactions/entity/category_transactions.entity';
import { GetStatisticReqDto } from './dto/get-statistic-req.dto';
import { UpdateCategoryReqDto } from './dto/update-category-req.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('CATEGORY_TRANSACTIONS_REPOSITORY')
    private categoryTransactionsRepository: Repository<CategoryTransactions>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = await this.categoryRepository.create({
      name: name,
    });
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getOneCategory(id: number): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    const transaction = await this.categoryTransactionsRepository.find({
      where: {
        categoryId: id,
      },
    });
    if (transaction) {
      throw new ConflictException('Check categories inside transactions :)');
    }
    return this.categoryRepository.delete(id);
  }

  async updateCategory(id?: number, data?: UpdateCategoryReqDto): Promise<UpdateResult> {
    return this.categoryRepository.update(
      {
        id,
      },
      {
        name: data.name,
      },
    );
  }

  async getStat(data: GetStatisticReqDto): Promise<Category[]> {
    const from = new Date(data.fromPeriod);
    const to = new Date(data.toPeriod);
    return this.categoryRepository
      .createQueryBuilder('c')
      .select(['c.name', 't.amount'])
      .innerJoin('category_transactions', 'ct', 'ct.category_id = c.id')
      .innerJoin('Transactions', 't', 't.id = ct.transaction_id')
      .where('category.categoryIds IN (:...categoryIds)', { categoryIds: data.categoryIds })
      .andWhere('t.amount BETWEEN :periodA AND :periodB', { periodA: from.toISOString(), periodB: to.toISOString() })
      .getMany();
  }
}
