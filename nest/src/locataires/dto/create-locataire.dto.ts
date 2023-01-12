import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateLocataireDto {
  @IsString()
  @IsNotEmpty()
  readonly nom: string;
  @IsString()
  @IsNotEmpty() 
  readonly prenom: string;
  @IsString()
  @IsNotEmpty() 
  readonly email: string;
  @IsString()
  @IsNotEmpty() 
  readonly password: string;
}
