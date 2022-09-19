import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Point } from 'geojson'
import { type } from "os";
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
