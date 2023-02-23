import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

/** category payload */
export class CreateCategoryReqDto {
  @ApiProperty({ required: true, format: 'string' })
  @IsString()
  @MinLength(2)
  public name: string;

  @ApiProperty({ required: true, format: 'string' })
  @IsString()
  public transactionId: string;
}
