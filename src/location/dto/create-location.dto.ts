import { Column, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {Point} from "geojson"
export class CreateLocationDto {
    // @PrimaryColumn()
    // id: number;

    // @Column()
    // lat: string;

    // @Column()
    // lag: string;
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    latitude: number;
    @Column()
    longitude: number;
    @Column()
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
