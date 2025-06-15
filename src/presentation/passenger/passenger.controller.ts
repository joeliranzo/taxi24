import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PassengerService } from '../../application/passenger/passenger.service';
import { PassengerDto } from '../../application/passenger/dto/passenger.dto';
import { DriverDto } from '../../application/driver/dto/driver.dto';

@ApiTags('passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  @ApiOperation({ summary: 'List all passengers' })
  @ApiResponse({ status: 200, type: [PassengerDto] })
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single passenger by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: PassengerDto })
  findById(@Param('id') id: string) {
    return this.passengerService.findById(id);
  }

  @Get(':id/nearest-drivers')
  @ApiOperation({ summary: 'Return the closest drivers to the passenger’s pick-up point' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of drivers to return (default 3)' })
  @ApiResponse({ status: 200, type: [DriverDto] })
  findNearestDrivers(@Param('id') id: string, @Query('limit') limit = 3) {
    return this.passengerService.findNearestDrivers(id, Number(limit));
  }
}
