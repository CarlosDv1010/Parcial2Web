import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

}