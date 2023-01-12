import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocatairesController } from './locataires.controller';
import { LocatairesService } from './locataires.service';
import { Locataire, LocataireSchema } from './schemas/locataire.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Locataire.name, schema: LocataireSchema }])],
  controllers: [LocatairesController],
  providers: [LocatairesService],
})
export class LocatairesModule {}
