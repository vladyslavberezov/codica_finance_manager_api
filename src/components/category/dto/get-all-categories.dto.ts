import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entity/category.entity';

/** get categories res payload */
export class GetAllCategoriesResDto {
  @ApiProperty({ required: true, format: 'string' })
  public Categories: Category[];
}
