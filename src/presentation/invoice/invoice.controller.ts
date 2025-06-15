import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from '../../application/invoice/invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('trip/:tripId')
  findByTripId(@Param('tripId') tripId: string) {
    return this.invoiceService.findByTripId(tripId);
  }
}
