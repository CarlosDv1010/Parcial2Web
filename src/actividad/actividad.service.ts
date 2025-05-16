import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDTO } from './dto/create-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
  ) {}

  async crearActividad(createActividadDto: CreateActividadDTO): Promise<Actividad> {
    if (createActividadDto.titulo.length < 15) {
      throw new BadRequestException('La actividad debe tener un título con mínimo 15 caracteres.');
    }
    
    const regexSoloLetrasNumeros = /^[a-zA-Z0-9\s]+$/;
    if (!regexSoloLetrasNumeros.test(createActividadDto.titulo)) {
      throw new BadRequestException('El título no puede contener símbolos, solo letras y números.');
    }

    var cupos = createActividadDto.inscritosids ? createActividadDto.inscritosids.length : 0;  
    if (cupos > createActividadDto.cupoMaximo) {
      throw new BadRequestException('Los cupos no pueden exceder el cupo máximo establecido.');
    }

    const nuevaActividad = this.actividadRepository.create({
      ...createActividadDto,
      estado: 0,
    });
    
    return this.actividadRepository.save(nuevaActividad);
  }

  async cambiarEstado(actividadID: number, estado: number): Promise<Actividad> {
    if (![0, 1, 2].includes(estado)) {
      throw new BadRequestException('El estado debe ser 0 (abierta), 1 (cerrada) o 2 (finalizada)');
    }

    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadID },
      relations: ['inscritos']
    });

    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${actividadID} no encontrada`);
    }

    const porcentajeOcupacion = actividad.inscritos ? (actividad.inscritos.length / actividad.cupoMaximo) * 100 : 0;
    
    if (estado === 1 && porcentajeOcupacion < 80) {
      throw new BadRequestException('La actividad solo puede ser cerrada si el 80% del cupo está lleno');
    }

    if (estado === 2 && porcentajeOcupacion < 100) {
      throw new BadRequestException('La actividad solo puede ser finalizada si no hay cupo disponible');
    }

    actividad.estado = estado;
    return this.actividadRepository.save(actividad);
  }

  async findAllActividadesByDate(fecha: string): Promise<Actividad[]> {
    return this.actividadRepository.find({
      where: { fecha },
    });
  }
}