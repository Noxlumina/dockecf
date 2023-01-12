import { Locataire } from '../../locataires/schemas/locataire.schema';
import { Vehicule } from './../../vehicules/schemas/vehicule.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as Scheme} from 'mongoose';

// export type LocationDocument = Location & Document;
export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ type: Scheme.Types.ObjectId, ref: 'Vehicule' })
  vehicule: Vehicule;

  @Prop({ type: Scheme.Types.ObjectId, ref: 'Locataire' })
  locataire: Locataire;

  // @Prop()
  // date_de_debut: Date;

  // @Prop()
  // date_de_fin: Date;

  @Prop({ required: true })
  prix: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
