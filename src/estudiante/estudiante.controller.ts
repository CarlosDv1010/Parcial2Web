import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: EstudianteService) {}

  @Post()
  async crearUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Estudiante> {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }

  @Get(':id')
  async findUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Estudiante | null> {
    return this.usuarioService.findEstudianteById(id);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.eliminarUsuario(id);
  }
}