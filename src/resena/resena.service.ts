import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './entities/resena.entity';
import { EstudianteService } from '../estudiante/estudiante.service';
import { CreateResenaDTO } from './dto/create-resena.dto';
import { Actividad } from '../actividad/entities/actividad.entity';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private resenaRepository: Repository<Resena>,
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
    private estudianteService: EstudianteService,
  ) {}

  async agregarResena(createResenaDto: CreateResenaDTO): Promise<Resena> {
    // Verificar existencia del estudiante
    const estudiante = await this.estudianteService.findEstudianteById(createResenaDto.estudianteId);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createResenaDto.estudianteId} no encontrado`);
    }

    // Verificar existencia de la actividad
    const actividad = await this.actividadRepository.findOne({
      where: { id: createResenaDto.actividadId },
      relations: ['inscritos']
    });
    
    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${createResenaDto.actividadId} no encontrada`);
    }

    // Verificar que la actividad esté finalizada (estado 2)
    if (actividad.estado !== 2) {
      throw new BadRequestException('Solo se pueden agregar reseñas a actividades finalizadas');
    }

    // Verificar que el estudiante estuvo inscrito en la actividad
    const estuvoInscrito = actividad.inscritos.some(
      (inscrito) => inscrito.id === createResenaDto.estudianteId
    );
    
    if (!estuvoInscrito) {
      throw new BadRequestException('El estudiante debe haber estado inscrito en la actividad para poder agregar una reseña');
    }

    // Crear y guardar la reseña
    const nuevaResena = this.resenaRepository.create({
      comentario: createResenaDto.comentario,
      calificacion: createResenaDto.calificacion,
      fecha: createResenaDto.fecha,
      estudiante: estudiante,
      actividad: actividad
    });

    return this.resenaRepository.save(nuevaResena);
  }
}