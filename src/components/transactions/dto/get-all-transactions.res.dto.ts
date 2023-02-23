import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**  transaction  dto */
export class TransactionsDto {
  @ApiProperty({ required: true, format: 'number' })
  @IsNumber()
  public id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: string;
}
