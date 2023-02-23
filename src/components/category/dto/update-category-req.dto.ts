import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

/** update category response */
export class UpdateCategoryReqDto {
  @ApiProperty({ required: true, format: 'string' })
  @IsString()
  @MinLength(2)
  public name?: string;
}
