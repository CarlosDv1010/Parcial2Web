import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './entities/resena.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { CreateBonoDto } from './dto/create-resena.dto';
import { RolUsuario } from 'src/common/role.enum';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(Resena)
    private bonoRepository: Repository<Resena>,
    private usuarioService: EstudianteService,
  ) {}

  async crearBono(createBonoDto: CreateBonoDto): Promise<Resena> {
    if (!createBonoDto.monto || createBonoDto.monto <= 0) {
      throw new BadRequestException('El monto del bono debe ser positivo.');
    }

    const usuario = await this.usuarioService.findEstudianteById(
      createBonoDto.usuarioId,
    );

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado.');
    }

    if (usuario.rol !== RolUsuario.PROFESOR) {
      throw new BadRequestException(
        'Solo los usuarios con rol Profesor pueden tener bonos.',
      );
    }

    const nuevoBono = this.bonoRepository.create(createBonoDto);
    return this.bonoRepository.save(nuevoBono);
  }

  async findBonoByCodigo(cod: number): Promise<Resena | null> {
    return this.bonoRepository.findOne({ where: { id: cod } });
  }

  async findAllBonosByUsuario(userID: number): Promise<Resena[]> {
    return this.bonoRepository.find({ where: { usuarioId: userID } });
  }

  async deleteBono(id: number): Promise<void> {
    const bono = await this.bonoRepository.findOne({ where: { id } });

    if (!bono) {
      throw new BadRequestException('Bono no encontrado.');
    }

    if (bono.calificacion > 4) {
      throw new BadRequestException(
        'No se puede eliminar un bono con calificación mayor a 4.',
      );
    }

    await this.bonoRepository.delete(id);
  }
}