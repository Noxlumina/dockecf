import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { Vehicule, VehiculeSchema } from './schemas/vehicule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicule.name, schema: VehiculeSchema }])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}
