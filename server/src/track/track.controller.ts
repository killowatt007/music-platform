import { Controller, Get } from "@nestjs/common";
import { get } from "http";

@Controller('/tracks')
export class TrackController {
  create()
  {

  }

  @Get()
  getAll()
  {
    return 'get'
  }

  getOne()
  {

  }

   elete()
  {
    
  }
}