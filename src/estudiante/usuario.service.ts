import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolUsuario } from 'src/common/role.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    if (
      createUsuarioDto.rol === RolUsuario.PROFESOR &&
      !['TICSW', 'IMAGINE', 'COMIT'].includes(
        createUsuarioDto.grupoInvestigacion as string,
      )
    ) {
      throw new BadRequestException(
        'Grupo de investigación inválido para el rol Profesor.',
      );
    }

    if (
      createUsuarioDto.rol === RolUsuario.DECANA &&
      (createUsuarioDto.numeroExtension === null ||
        createUsuarioDto.numeroExtension === undefined ||
        createUsuarioDto.numeroExtension.toString().length !== 8)
    ) {
      throw new BadRequestException(
        'El número de extensión debe tener 8 dígitos para el rol Decana.',
      );
    }

    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findUsuarioById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['bonos'],
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado.');
    }

    if (usuario.rol === RolUsuario.DECANA) {
      throw new BadRequestException('No se puede eliminar un usuario con rol Decana.');
    }

    if (usuario.bonos && usuario.bonos.length > 0) {
      throw new BadRequestException('No se puede eliminar un usuario con bonos asociados.');
    }

    await this.usuarioRepository.delete(id);
  }
}