import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDTO } from './dto/create-actividad.dto';
import { Actividad } from './entities/actividad.entity';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  async crearActividad(@Body() createActividadDto: CreateActividadDTO): Promise<Actividad> {
    return this.actividadService.crearActividad(createActividadDto);
  }

  @Put(':id/:estado')
  async cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Param('estado', ParseIntPipe) estado: number,
  ): Promise<Actividad> {
    return this.actividadService.cambiarEstado(id, estado);
  }

  @Get(':fecha')
  async findAllActividadesByDate(@Param('fecha') fecha: string): Promise<Actividad[]> {
    return this.actividadService.findAllActividadesByDate(fecha);
  }
}