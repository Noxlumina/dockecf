import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = await this.locationModel.create(createLocationDto);
    return createdLocation;
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().populate('locataire').populate('vehicule').exec();
  }

  async findOne(id: string): Promise<Location> {
    return this.locationModel.findOne({ _id: id }).populate('locataire').populate('vehicule').exec();
  }


  async update(id: string, updateLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationModel.findOneAndUpdate({ _id: id }, updateLocationDto).exec();
  }

  async delete(id: string) {
    const deletedLocation = await this.locationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedLocation;
  }
}
