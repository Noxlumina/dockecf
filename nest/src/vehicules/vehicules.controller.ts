import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { Vehicule } from './schemas/vehicule.schema';

@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Post()
  async create(@Body() createVehiculeDto: CreateVehiculeDto) {
    await this.vehiculesService.create(createVehiculeDto);
  }

  @Get()
  async findAll(): Promise<Vehicule[]> {
    return this.vehiculesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicule> {
    return this.vehiculesService.findOne(id);
  }

  @Get('immatriculation/:immatriculation')
  async findImmatriculation(@Param('immatriculation') immatriculation: string): Promise<Vehicule> {
    return this.vehiculesService.findImmatriculation(immatriculation);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vehiculesService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Body() createVehiculeDto: CreateVehiculeDto) {
    return this.vehiculesService.update(id,createVehiculeDto);
  }
}
