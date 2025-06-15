import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tripId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  issuedAt: Date;
}
