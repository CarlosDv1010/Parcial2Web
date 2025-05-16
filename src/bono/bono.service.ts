import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bono } from './entities/bono.entity';
import { UsuarioService } from 'src/estudiante/usuario.service';
import { CreateBonoDto } from './dto/create-bono.dto';
import { RolUsuario } from 'src/common/role.enum';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(Bono)
    private bonoRepository: Repository<Bono>,
    private usuarioService: UsuarioService,
  ) {}

  async crearBono(createBonoDto: CreateBonoDto): Promise<Bono> {
    if (!createBonoDto.monto || createBonoDto.monto <= 0) {
      throw new BadRequestException('El monto del bono debe ser positivo.');
    }

    const usuario = await this.usuarioService.findUsuarioById(
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

  async findBonoByCodigo(cod: number): Promise<Bono | null> {
    return this.bonoRepository.findOne({ where: { id: cod } });
  }

  async findAllBonosByUsuario(userID: number): Promise<Bono[]> {
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