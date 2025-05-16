import { Injectable, BadRequestException } from '@nestjs/common';
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
    if (createActividadDto.titulo.length < 15 ){
      throw new BadRequestException('La actividad debe tener un título con mínimo 15 caracteres.');
    }    

    const nuevaActividad = this.actividadRepository.create(createActividadDto);
    return this.actividadRepository.save(nuevaActividad);
  }

  async findAllActividadesByDate(fecha: string): Promise<Actividad[]> {
    return this.actividadRepository.find({
      where: { fecha },
    });
  }
}