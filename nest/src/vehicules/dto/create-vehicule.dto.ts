import { IsString,IsNotEmpty,IsNumber,IsBoolean } from 'class-validator';


export class CreateVehiculeDto {
  @IsString()
  @IsNotEmpty() 
  readonly immatriculation: string;
  @IsString()
  @IsNotEmpty() 
  readonly marque: string;
  @IsString()
  @IsNotEmpty() 
  readonly modele: string;
  @IsString()
  @IsNotEmpty() 
  readonly etat: string;
  @IsNumber()
  @IsNotEmpty() 
  readonly prix: number;
  @IsBoolean()
  @IsNotEmpty() 
  readonly disponibilite: boolean;
  @IsString()
  @IsNotEmpty() 
  readonly type: string;
}

