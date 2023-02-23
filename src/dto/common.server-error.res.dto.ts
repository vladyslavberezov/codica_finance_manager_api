import { ApiProperty } from '@nestjs/swagger';

export class CommonServerErrorResDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  error: string;
  @ApiProperty()
  message: string;
}
