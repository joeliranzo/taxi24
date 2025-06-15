import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { InvoiceService } from '../../application/invoice/invoice.service';
import { InvoiceDto } from '../../application/invoice/dto/invoice.dto';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('trip/:tripId')
  @ApiOperation({ summary: 'Get invoice for a trip' })
  @ApiParam({ name: 'tripId', type: String })
  @ApiResponse({ status: 200, type: InvoiceDto })
  findByTripId(@Param('tripId') tripId: string) {
    return this.invoiceService.findByTripId(tripId);
  }
}
