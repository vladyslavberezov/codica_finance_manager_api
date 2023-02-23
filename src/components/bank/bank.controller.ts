import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OperationIds } from '../../core/helpers/objectIds.enum';
import { BANK_TAG } from '../../docs/tags';
import { CommonServerErrorResDto } from '../../dto/common.server-error.res.dto';
import { BankService } from './bank.service';
import { ICommonBankResDto } from './dto/common-bank-res.dto';
import { CreateBankReqDto } from './dto/create-bank.req.dto';
import { GetAllBanksResDto } from './dto/get-all-banks.dto';
import { UpdateBankReqDto } from './dto/update-bank-req.dto';
import { Bank } from './entity/bank.entity';

@ApiTags(BANK_TAG)
@Controller(BANK_TAG)
export class BankController {
  private readonly logger = new Logger(BankController.name);

  @Inject(BankService)
  private readonly bankService: BankService;

  /**
   * / endpoint handler - create bank
   * @param {CreateBankReqDto} body - create object
   * @returns {Promise} - return Promise<Bank>
   */
  @Post()
  @ApiOperation({
    description: 'create bank',
    operationId: OperationIds.BANK_CREATE,
  })
  @ApiBody({ type: CreateBankReqDto })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: ICommonBankResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  create(@Body() body: CreateBankReqDto): Promise<Bank> {
    this.logger.log(`Create bank: ${body.name}, ${body.balance}`);
    return this.bankService.createBank(body.name, body.balance);
  }

  /**
   * / endpoint handler - get all banks
   * @returns {Promise<Bank[]>} - { Promise<Bank{]}> }
   */
  @Get()
  @ApiOperation({
    description: 'get all banks',
    operationId: OperationIds.BANK_GET_ALL,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: GetAllBanksResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getAllBanks(): Promise<Bank[]> {
    this.logger.log(`Get all banks`);
    return this.bankService.getAllBanks();
  }

  /**
   * / endpoint handler - get one bank
   // * @param {id} - id bank
   * @returns {Bank} - { Bank }
   */
  @Get('/:id')
  @ApiOperation({
    description: 'get one bank',
    operationId: OperationIds.BANK_GET_ONE,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ICommonBankResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getBank(@Param('id') id: number): Promise<Bank> {
    this.logger.log(`Get one bank with id ${id}`);
    return this.bankService.getOne(id);
  }

  /**
   * / endpoint handler - delete one bank
   * @param id
   * @returns {Bank} - { Bank }
   */
  @Delete('/:id')
  @ApiOperation({
    description: 'delete bank',
    operationId: OperationIds.BANK_DELETE_ONE,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  delete(@Param('id') id: string): Promise<DeleteResult> {
    this.logger.log(`Delete bank with id ${id}`);
    return this.bankService.deleteBank(id);
  }

  /**
   * / endpoint handler - update one bank
   /  @param {id} - id bank
   /  @param {UpdateBankReqDto} - body
   * @returns {Promise<UpdateResult>}
   */
  @Patch('/:id')
  @ApiOperation({
    description: 'update bank',
    operationId: OperationIds.BANK_UPDATE,
  })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: UpdateBankReqDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  change(@Body() body: UpdateBankReqDto, @Param('id') id: number): Promise<UpdateResult> {
    this.logger.log(`Change bank`);
    return this.bankService.updateBank(id, body);
  }
}
