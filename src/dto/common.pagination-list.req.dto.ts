import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export interface IPaginationList {
  search?: string;
  searchBy?: string;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  perPage?: number;
  page?: number;
  isDeleted?: boolean;
  // TODO: hidden property, unlock for cursor pagination
  next?: string;
  previous?: string;
}

export class CommonPaginationListReqDto implements IPaginationList {
  @ApiProperty({
    description: 'Search string',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Search key | keys',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsString()
  searchBy?: string;

  @ApiProperty({
    description: 'Sorting direction',
    required: false,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Sorting by field',
    required: false,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    description: 'Message id',
    required: false,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  messageId?: string;

  @ApiProperty({
    description: 'Limit resulting elements(default *10*).',
    required: false,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Transform((value) => Number(value))
  perPage?: number = 10000;

  @ApiProperty({
    description: 'Number of current page.(default *1*).',
    required: false,
    format: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform((value) => Number(value))
  page?: number = 1;

  // TODO: hidden property, unlock for cursor pagination
  @IsString()
  @IsOptional()
  next?: string;

  // TODO: hidden property, unlock for cursor pagination
  @IsString()
  @IsOptional()
  previous?: string;
}
