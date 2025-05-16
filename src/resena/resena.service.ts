import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './entities/resena.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { CreateResenaDTO } from './dto/create-resena.dto';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private resenaRepository: Repository<Resena>,
    private usuarioService: EstudianteService,
  ) {}

  async agregarResena(createResenaDto: CreateResenaDTO, userId: number): Promise<Resena> {
    const usuario = await this.usuarioService.findEstudianteById(userId);
    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const nuevaResena = this.resenaRepository.create({
      ...createResenaDto});
    return this.resenaRepository.save(nuevaResena);
  }
}