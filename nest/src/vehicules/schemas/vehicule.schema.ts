import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument as mongoose } from 'mongoose';

export type VehiculeDocument = mongoose<Vehicule>;

@Schema()
export class Vehicule {
  @Prop({ required: true })
  immatriculation: string;

  @Prop({ required: true })
  marque: string;

  @Prop({ required: true })
  modele: string;

  @Prop({ required: true })
  etat: string;

  @Prop({ required: true })
  prix: number;

  @Prop({ required: true })
  disponibilite: boolean;

  @Prop({ required: true })
  type: string;

  
}

export const VehiculeSchema = SchemaFactory.createForClass(Vehicule);





