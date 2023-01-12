import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './schemas/location.schema';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    await this.locationsService.create(createLocationDto);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Location> {
    return this.locationsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.locationsService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.update(id,createLocationDto);
  }
}
