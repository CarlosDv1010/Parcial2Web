import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    return this.estudianteService.crearEstudiante(createEstudianteDto);
  }

  @Get(':id')
  async findEstudianteById(@Param('id', ParseIntPipe) id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteService.findEstudianteById(id);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  @Put(':estudianteId/:actividadId')
  async inscribirseActividad(
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
    @Param('actividadId', ParseIntPipe) actividadId: number,
  ): Promise<Estudiante> {
    return this.estudianteService.inscribirseActividad(estudianteId, actividadId);
  }  
}