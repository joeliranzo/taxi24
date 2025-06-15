import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Invoice } from '../../domain/invoice/invoice.entity';
import { InvoiceRepository } from '../../domain/invoice/invoice.repository';

@Injectable()
export class PrismaInvoiceRepository implements InvoiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByTripId(tripId: string): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({ where: { tripId } });
  }

  async create(invoice: { tripId: string; amount: number; issuedAt?: Date }): Promise<Invoice> {
    return this.prisma.invoice.create({ data: {
      tripId: invoice.tripId,
      amount: invoice.amount,
      issuedAt: invoice.issuedAt ?? new Date(),
    }});
  }
}
