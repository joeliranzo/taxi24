import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverController } from './presentation/driver/driver.controller';
import { DriverService } from './application/driver/driver.service';
import { PrismaDriverRepository } from './infrastructure/driver/prisma-driver.repository';
import { PrismaClient } from '@prisma/client';
import { PassengerController } from './presentation/passenger/passenger.controller';
import { PassengerService } from './application/passenger/passenger.service';
import { PrismaPassengerRepository } from './infrastructure/passenger/prisma-passenger.repository';
import { TripController } from './presentation/trip/trip.controller';
import { TripService } from './application/trip/trip.service';
import { PrismaTripRepository } from './infrastructure/trip/prisma-trip.repository';
import { InvoiceController } from './presentation/invoice/invoice.controller';
import { InvoiceService } from './application/invoice/invoice.service';
import { PrismaInvoiceRepository } from './infrastructure/invoice/prisma-invoice.repository';

@Module({
  imports: [],
  controllers: [AppController, DriverController, PassengerController, TripController, InvoiceController],
  providers: [
    AppService,
    DriverService,
    PassengerService,
    TripService,
    InvoiceService,
    PrismaClient,
    { provide: 'DriverRepository', useClass: PrismaDriverRepository },
    { provide: 'PassengerRepository', useClass: PrismaPassengerRepository },
    { provide: 'TripRepository', useClass: PrismaTripRepository },
    { provide: 'InvoiceRepository', useClass: PrismaInvoiceRepository },
  ],
})
export class AppModule {}
