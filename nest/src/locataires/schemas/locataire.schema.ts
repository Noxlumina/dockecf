import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument as mongoose } from 'mongoose';

export type LocataireDocument = mongoose<Locataire>;

@Schema()
export class Locataire {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const LocataireSchema = SchemaFactory.createForClass(Locataire);
