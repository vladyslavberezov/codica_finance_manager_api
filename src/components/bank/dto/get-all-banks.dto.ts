import { ApiProperty } from '@nestjs/swagger';
import { Bank } from '../entity/bank.entity';

/** get banks payload */
export class GetAllBanksResDto {
  @ApiProperty({ required: true, format: 'string' })
  public Banks: Bank[];
}
