import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Actividad } from 'src/actividad/entities/actividad.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    private actividadRepository: Repository<Actividad>,
  ) {}

  async crearEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    if (createEstudianteDto.semestre < 1 || createEstudianteDto.semestre > 10) {
      throw new BadRequestException('El semestre debe estar entre 1 y 10.');
    }
    if (createEstudianteDto.correo && !createEstudianteDto.correo.includes('@') && !createEstudianteDto.correo.includes('.')) {
      throw new BadRequestException('El correo electrónico no es válido.');
    }

    const nuevoUsuario = this.estudianteRepository.create(createEstudianteDto);
    return this.estudianteRepository.save(nuevoUsuario);
  }

  async findEstudianteById(id: number): Promise<Estudiante | null> {
    return this.estudianteRepository.findOne({ where: { id } });
  }

  async inscribirseActividad(estudianteId: number, actividadId: number): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteId },
      relations: ['actividades'],
    });

    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado.');
    }

    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadId },
    });

    if (!actividad) {
      throw new BadRequestException('Actividad no encontrada.');
    }

    if (actividad.cupos <= 0) {
      throw new BadRequestException('No hay cupos disponibles para esta actividad.');
    }

    if (actividad.estado != 0){
      throw new BadRequestException('La actividad debe estar en estado 0.');
    }

    estudiante.actividades.push(actividad);
    await this.estudianteRepository.save(estudiante);
  }

}