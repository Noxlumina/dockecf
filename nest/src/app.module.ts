import { LocationModule } from './locations/locations.module';
import { Location, LocationSchema } from './locations/schemas/location.schema';
import { Vehicule, VehiculeSchema } from './vehicules/schemas/vehicule.schema';
import { VehiculesModule } from './vehicules/vehicules.module';
import { Locataire, LocataireSchema } from './locataires/schemas/locataire.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocatairesModule } from './locataires/locataires.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/test'),
    MongooseModule.forFeature([ 
      { name: Locataire.name, schema: LocataireSchema }, 
      { name: Vehicule.name, schema: VehiculeSchema }, 
      { name: Location.name, schema: LocationSchema }]),
    LocatairesModule,
    VehiculesModule,
    LocationModule,
  ],
})
export class AppModule { }



