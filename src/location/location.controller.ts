import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Observable } from 'rxjs';
import { location_location } from './location.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';
import {parse} from "papaparse"

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


  // @Post('file')
  // @UseInterceptors(
  //   FileInterceptor('file_asset',{
  //     storage:diskStorage({
  //       destination:'./files',
  //     })
  //   })
  // )
  // async uploadFile(){
  //   console.log("file uploaded")
  //   return 'file upload'
  // }



  @Post('file')
  @UseInterceptors(
    FileInterceptor('file_asset',{
      storage:diskStorage({
        destination:'./files',
      })
    })
  )
  async uploadFile(){
    const csvFile = readFileSync('files/1.csv')
    const csvData = csvFile.toString()
    const parsedCsv = await parse(csvData,{
      header:true,
      skipEmptyLines:true,
      transformHeader:(header)=> header.toLowerCase().replace('#', '').trim(),
      complete:(results)=>results.data,
     });
     console.log(parsedCsv)
    }



  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.locationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
  //   return this.locationService.update(+id, updateLocationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationService.remove(+id);
  // }
}
