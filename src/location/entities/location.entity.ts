import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Point,Polygon } from 'geojson'
import { type } from "os";
import { IsOptional} from 'class-validator'
@Entity('geo')
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'decimal', nullable: true })
    latitude: number;
    @Column({ type: 'decimal', nullable: true })
    longitude: number;
    @Column({ nullable: true })
    city_name: string;
    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point;
    

}

@Entity('PolygonTable')
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  polygon: Polygon;
  @IsOptional()
  position?: number[][];
}







