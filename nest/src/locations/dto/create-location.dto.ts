import { Locataire } from '../../locataires/schemas/locataire.schema';
import { Vehicule } from './../../vehicules/schemas/vehicule.schema';
import { IsNumber, IsNotEmpty, IsDate,IsMongoId,IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  readonly vehicule: Vehicule;
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  readonly locataire: Locataire;
  // @IsDate()
  // @IsNotEmpty() 
  // readonly date_de_debut: Date;
  // @IsDate()
  // @IsNotEmpty() 
  // readonly date_de_fin: Date;
  @IsNumber()
  @IsNotEmpty() 
  readonly prix: number
}
