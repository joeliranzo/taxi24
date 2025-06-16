import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TripService } from '../../application/trip/trip.service';
import { TripDto } from '../../application/trip/dto/trip.dto';
import { CreateTripDto, UpdateTripDto } from '../../application/trip/dto/trip-action.dto';

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('active')
  @ApiOperation({ summary: 'List all active trips' })
  @ApiResponse({ status: 200, type: [TripDto] })
  findActive() {
    return this.tripService.findActive();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new trip, assigning a driver to a passenger' })
  @ApiResponse({ status: 201, type: TripDto })
  create(@Body() trip: CreateTripDto) {
    return this.tripService.create(trip);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete a trip' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: TripDto })
  complete(@Param('id') id: string, @Body() update: UpdateTripDto) {
    return this.tripService.complete(id, update);
  }
}
