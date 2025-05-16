import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }

  @Get(':id')
  async findUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario | null> {
    return this.usuarioService.findUsuarioById(id);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.eliminarUsuario(id);
  }
}