import { Invoice } from './invoice.entity';

export interface InvoiceRepository {
  findByTripId(tripId: string): Promise<Invoice | null>;
  create(invoice: Partial<Invoice>): Promise<Invoice>;
}
