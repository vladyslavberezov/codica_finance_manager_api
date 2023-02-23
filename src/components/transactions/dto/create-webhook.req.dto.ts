import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WebhookEventEnum } from '../../../core/helpers/types.enum';
import { CreateTransactionPayloadReqDto } from './create-transaction-payload.req.dto';

/** webhook payload */
export class WebhookReqDto {
  @ApiProperty({
    required: true,
    default: WebhookEventEnum.CREATE,
    enum: WebhookEventEnum,
  })
  @IsEnum(WebhookEventEnum)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  event: string;

  @ApiProperty({
    required: true,
    // type: CreateTransactionPayloadReqDto,
    format: 'object',
  })
  @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => CreateTransactionPayloadReqDto)
  payload: CreateTransactionPayloadReqDto;
}
