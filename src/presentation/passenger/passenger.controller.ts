import { Controller, Get, Param, Query } from '@nestjs/common';
import { PassengerService } from '../../application/passenger/passenger.service';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.passengerService.findById(id);
  }

  @Get(':id/nearest-drivers')
  findNearestDrivers(@Param('id') id: string, @Query('limit') limit = 3) {
    return this.passengerService.findNearestDrivers(id, Number(limit));
  }
}
