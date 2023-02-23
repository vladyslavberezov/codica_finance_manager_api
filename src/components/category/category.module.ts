import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { categoryTransactionsProviders } from '../category_transactions/entity/transactions-category.providers';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryProviders } from './entity/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders, ...categoryTransactionsProviders],
  exports: [CategoryService],
})
export class CategoryModule {}
