import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocataireDto } from './dto/create-locataire.dto';
import { Locataire, LocataireDocument } from './schemas/locataire.schema';

@Injectable()
export class LocatairesService {
  constructor(
    @InjectModel(Locataire.name) private readonly locataireModel: Model<LocataireDocument>,
  ) {}

  async create(createLocataireDto: CreateLocataireDto): Promise<Locataire> {
    const createdLocataire = await this.locataireModel.create(createLocataireDto);
    return createdLocataire;
  }

  async findAll(): Promise<Locataire[]> {
    return this.locataireModel.find().exec();
  }

  async findOne(id: string): Promise<Locataire> {
    return this.locataireModel.findOne({ _id: id }).exec();
  }

  async findEmail(email: string): Promise<Locataire> {
    return this.locataireModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateVehiculeDto: CreateLocataireDto): Promise<Locataire> {
    return this.locataireModel.findOneAndUpdate({ _id: id }, updateVehiculeDto).exec();
  }

  async delete(id: string) {
    const deletedLocataire = await this.locataireModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedLocataire;
  }
}
