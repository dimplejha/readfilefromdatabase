import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, Parcel } from './entities/location.entity';
import { location_location } from './location.interface';
import { Polygon } from 'geojson'

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly Location: Repository<Location>,
    @InjectRepository(Parcel) private readonly Parcel: Repository<Parcel>,
  ) {}





  create(createLocationDto: location_location): Observable<location_location> {
    return from(this.Location.save(createLocationDto))
  }

  findAll() {
    return from(this.Location.find())
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} location`;
  // }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} location`;
  // }




  async createParcelPoint(createParcelPointDto: Parcel): Promise<Parcel> {
    const { position } = createParcelPointDto;
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: [position],
    };
    const parcel = this.Parcel.create({
      polygon,
    });
    await this.Parcel.save(parcel);
    return parcel;
  }
}
