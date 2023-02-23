import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

/** common bank response */
export class UpdateBankReqDto {
  @ApiProperty({ required: true, format: 'string' })
  @IsString()
  @MinLength(2)
  public name?: string;

  @ApiProperty({ required: true, format: 'number' })
  @IsNumber()
  public balance?: number;
}
