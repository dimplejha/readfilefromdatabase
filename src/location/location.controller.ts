import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Observable } from 'rxjs';
import { location_location } from './location.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';
import {parse} from "papaparse";

@Controller('gisData')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

 

  @Post()
  create(@Body() createLocation: CreateLocationDto): Observable<location_location> {
    console.log(createLocation)
    return this.locationService.create(createLocation);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }





  @Post('file')
  @UseInterceptors(
    FileInterceptor('file_asset',{
      storage:diskStorage({
        destination:'./files',
      })
    })
  )
 
  async uploadFile() {
    const csvFile = readFileSync('files/1.csv')
    const csvData = csvFile.toString()
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    /////////////////////////////////
    console.log(parsedCsv)

    
    console.log("parsedCsv", parsedCsv.data)


    var a = [1, 2, 3, 4, 5]
    for (var i of a) {
      console.log(i)
    }


    for (let data of parsedCsv.data) {
      console.log("this is come from first looop data", data)
    }


    var add = {}
    for (let i of parsedCsv.data) {
      console.log("this data come from loop", i)
      //console.log("parsedCsv", parsedCsv.data)
      var point = { type: 'Point', coordinates: [i.latitude, i.longitude] };
      add = {
        // pk_id: parsedCsv.data.pk_id,
        latitude: i.latitude,
        longitude: i.longitude,
        city_name: i.city_name,
        location: point,
      };
      console.log('Data: ', add)
      //return this.locationService.create(add);
      console.log(this.locationService.create(add))
      //return "data added!!!!!!!!!!!!!!!!!!!!!!!"
    }
    ////////////////////////////
    return "data stored in databse!!!!!!!!!!!!!!!!!!!!!!!"
    // console.log(parsedCsv)
  }

  //======================================================================================






//   @Post('file')
//   async uploadFile() {
//     const csvFile = readFileSync('files/1.csv')
//     const csvData = csvFile.toString()
//     const parsedCsv = await parse(csvData, {
//       header: true,
//       skipEmptyLines: true,
//       transformHeader: (header: string) => header.toLowerCase().replace('#', '').trim(),
//       complete: (results: { data: any; }) => results.data,
//     });
//     console.log(parsedCsv.data)
//     var newData = {}
//     for (let a of parsedCsv.data) {
//       console.log(a)
//       var point = { type: 'Point', coordinates: [a.latitude, a.longitude] };
//       newData = {
//         latitude: a.latitude,
//         longitude: a.longitude,
//         city_name: a.city_name,
//         location: point,
//       };
//       console.log(newData)
//       console.log(this.locationService.create(newData))
//     }
//     //return this.locationService.create(newData)
//     //console.log(parsedCsv)
//   }
// }
























//   //   var newGeom = {
//   //     type: 'Point',
//   //     coordinates: [parsedCsv.data[0]['latitude'],parsedCsv.data[0]['longitude']]
//   //   }
//   //   let newData = {
//   //     id: parsedCsv.data[0]['id'],
//   //     longitude: parsedCsv.data[0]['longitude'],
//   //     latitude: parsedCsv.data[0]['latitude'],
//   //     city_name: parsedCsv.data[0]['city_name'],
//   //     location:newGeom
//   //   }
//   //   console.log(newData)
//   //   return this.locationService.create(newData);

//   // }







    



  

//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.locationService.findOne(+id);
//   // }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
//   //   return this.locationService.update(+id, updateLocationDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.locationService.remove(+id);
//   // }
}
