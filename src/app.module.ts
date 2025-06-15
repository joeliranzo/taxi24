import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverController } from './presentation/driver/driver.controller';
import { DriverService } from './application/driver/driver.service';
import { PrismaDriverRepository } from './infrastructure/driver/prisma-driver.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [AppController, DriverController],
  providers: [
    AppService,
    DriverService,
    PrismaClient,
    { provide: 'DriverRepository', useClass: PrismaDriverRepository },
  ],
})
export class AppModule {}
