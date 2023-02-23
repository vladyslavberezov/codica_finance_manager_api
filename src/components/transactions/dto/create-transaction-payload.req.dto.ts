import { ApiProperty } from '@nestjs/swagger';
import { TransactionsType } from '../../../core/helpers/transaction.enum';
import { WebhookEventEnum } from '../../../core/helpers/types.enum';

/** transaction payload */
export class CreateTransactionPayloadReqDto {
  @ApiProperty({
    required: true,
    format: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  bankId: string;

  @ApiProperty({
    format: 'number',
  })
  categoryId?: number;

  @ApiProperty({
    required: true,
    type: 'enum',
    default: TransactionsType.profitable,
    enum: WebhookEventEnum,
  })
  type?: TransactionsType;
}
