import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { OperationIds } from '../../core/helpers/objectIds.enum';
import { TRANSACTIONS_TAG } from '../../docs/tags';
import { CommonServerErrorResDto } from '../../dto/common.server-error.res.dto';
import { PageOptionsDto } from '../../dto/page-options.dto';
import { WebhookReqDto } from './dto/create-webhook.req.dto';
import { TransactionsDto } from './dto/get-all-transactions.res.dto';
import { PageDto } from './dto/page-transaction-pagination.res.dto';
import { Transactions } from './entity/transactions.entity';
import { TransactionsService } from './transactions.service';

@ApiTags(TRANSACTIONS_TAG)
@Controller(TRANSACTIONS_TAG)
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);

  @Inject(TransactionsService)
  private readonly transactionsService: TransactionsService;

  /**
   * / endpoint handler - create transaction
   * @param {WebhookReqDto} body - create object
   * @param req
   * @returns {Promise} - { Transaction }
   */
  @ApiOperation({
    description: 'create transaction',
    operationId: OperationIds.TRANSACTION_CREATE,
  })
  @ApiBody({ type: WebhookReqDto })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: Transactions,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  @Post('/webhook')
  handleWebhook(@Body() body: WebhookReqDto): Promise<Transactions> {
    this.logger.log(`Webhook body : ${body}`);
    switch (body.event) {
      case 'webhook:create':
        return this.transactionsService.createTransaction(body.payload);
      // case 'another-event':
      //   return this.service.webhook(body.payload);
    }
  }

  /**
   * / endpoint handler - get all transactions
   *
   * @returns {Promise<PageDto<TransactionsDto>>>} - { Promise }
   */
  @Get()
  @ApiOperation({
    description: 'get transactions',
    operationId: OperationIds.TRANSACTION_GET_ALL,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: TransactionsDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getTransactions(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<TransactionsDto>> {
    this.logger.log(`Get transactions with pagination: ${pageOptionsDto}`);
    return this.transactionsService.getAllTransactions(pageOptionsDto);
  }

  /**
   * / endpoint handler - delete one transaction
   /  @param {id} - id deleted transaction
   * @returns {Promise} - { DeleteResult }
   */
  @Delete('/:id')
  @ApiOperation({
    description: 'delete transaction',
    operationId: OperationIds.TRANSACTION_DELETE_ONE,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  deleteTransaction(@Param('id') id: number): Promise<DeleteResult> {
    this.logger.log(`Delete transaction with id ${id}`);
    return this.transactionsService.deleteTransaction(id);
  }
}
