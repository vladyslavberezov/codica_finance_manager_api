import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/** stat request */
export class GetStatisticReqDto {
  @ApiProperty({ required: true, format: 'string' })
  @IsString()
  @MinLength(2)
  categoryIds: string[];

  @ApiProperty({ required: true, format: 'date-time' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  fromPeriod: string;

  @ApiProperty({ required: true, format: 'date-time' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  toPeriod: string;
}
