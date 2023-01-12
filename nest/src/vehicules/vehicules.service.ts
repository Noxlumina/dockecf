import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { Vehicule, VehiculeDocument } from './schemas/vehicule.schema';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectModel(Vehicule.name) private readonly vehiculeModel: Model<VehiculeDocument>,
  ) {}

  async create(createCatDto: CreateVehiculeDto): Promise<Vehicule> {
    const createdCat = await this.vehiculeModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Vehicule[]> {
    return this.vehiculeModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicule> {
    return this.vehiculeModel.findOne({ _id: id }).exec();
  }

  async findImmatriculation(immatriculation: string): Promise<Vehicule> {
    return this.vehiculeModel.findOne({ immatriculation: immatriculation }).exec();
  }


  async update(id: string, updateVehiculeDto: CreateVehiculeDto): Promise<Vehicule> {
    return this.vehiculeModel.findOneAndUpdate({ _id: id }, updateVehiculeDto).exec();
  }


  async delete(id: string) {
    const deletedVehicule = await this.vehiculeModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedVehicule;
  }
}
