import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Actividad } from '../actividad/entities/actividad.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
  ) {}

  async crearEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    if (createEstudianteDto.semestre < 1 || createEstudianteDto.semestre > 10) {
      throw new BadRequestException('El semestre debe estar entre 1 y 10.');
    }
    
    if (!this.isValidEmail(createEstudianteDto.correo)) {
      throw new BadRequestException('El correo electrónico no es válido.');
    }

    const nuevoEstudiante = this.estudianteRepository.create({
      ...createEstudianteDto,
      actividades: [],
      resenas: []
    });
    
    return this.estudianteRepository.save(nuevoEstudiante);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async findEstudianteById(id: number): Promise<Estudiante | null> {
    const estudiante = await this.estudianteRepository.findOne({ 
      where: { id },
      relations: ['actividades', 'resenas']
    });
    
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
    }
    
    return estudiante;
  }

  async inscribirseActividad(estudianteId: number, actividadId: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteId },
      relations: ['actividades'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadId },
      relations: ['inscritos'],
    });

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada.');
    }

    const inscritosCount = actividad.inscritos ? actividad.inscritos.length : 0;
    if (inscritosCount >= actividad.cupoMaximo) {
      throw new BadRequestException('No hay cupos disponibles para esta actividad.');
    }

    if (actividad.estado !== 0) {
      throw new BadRequestException('La actividad debe estar en estado 0 (abierta) para inscribirse.');
    }

    const yaInscrito = estudiante.actividades.some(act => act.id === actividadId);
    if (yaInscrito) {
      throw new BadRequestException('El estudiante ya está inscrito en esta actividad.');
    }

    estudiante.actividades.push(actividad);
    
    return this.estudianteRepository.save(estudiante);
  }
}