import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';

@Controller('clases')
export class ActividadController {
  constructor(private readonly claseService: ActividadService) {}

}