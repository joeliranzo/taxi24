import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../domain/invoice/invoice.repository';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepo: InvoiceRepository) {}

  async findByTripId(tripId: string): Promise<InvoiceDto | null> {
    return (await this.invoiceRepo.findByTripId(tripId)) as InvoiceDto;
  }
}
