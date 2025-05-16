import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from './entities/clase.entity';
import { CreateClaseDto } from './dto/create-clase.dto';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
  ) {}

  async crearClase(createClaseDto: CreateClaseDto): Promise<Clase> {
    if (createClaseDto.codigo.length !== 10) {
      throw new BadRequestException('El código de la clase debe tener 10 caracteres.');
    }

    const nuevaClase = this.claseRepository.create(createClaseDto);
    return this.claseRepository.save(nuevaClase);
  }

  async findClaseById(id: number): Promise<Clase | null> {
    return this.claseRepository.findOne({ where: { id } });
  }
}