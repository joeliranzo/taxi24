import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TripService } from '../../application/trip/trip.service';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('active')
  findActive() {
    return this.tripService.findActive();
  }

  @Post()
  create(@Body() trip: any) {
    return this.tripService.create(trip);
  }

  @Put(':id/complete')
  complete(@Param('id') id: string) {
    return this.tripService.complete(id);
  }
}
