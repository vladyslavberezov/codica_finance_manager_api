import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service';
import { UpdateBankReqDto } from './dto/update-bank-req.dto';
import { Bank } from './entity/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<Bank>,
    private transactionsService: TransactionsService,
  ) {}

  async createBank(name: string, balance: number): Promise<Bank> {
    const bank = this.bankRepository.create({
      name: name,
      balance: balance,
    });
    return this.bankRepository.save(bank);
  }

  async getAllBanks(): Promise<Bank[]> {
    return this.bankRepository.find({
      select: {
        id: true,
        name: true,
        balance: true,
      },
    });
  }

  async getOne(id: number): Promise<Bank> {
    return this.bankRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteBank(id: string): Promise<DeleteResult> {
    const transaction = await this.transactionsService.findTransaction(id);
    if (!transaction) {
      return this.bankRepository.delete(id);
    }
    throw new ConflictException('Check transaction inside bank :)');
  }

  async updateBank(id?: number, data?: UpdateBankReqDto): Promise<UpdateResult> {
    return this.bankRepository.update(
      {
        id,
      },
      {
        name: data.name,
        balance: data.balance,
      },
    );
  }
}
