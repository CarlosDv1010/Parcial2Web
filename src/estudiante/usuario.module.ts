import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [UsuarioController],
  providers: [EstudianteService],
  exports: [EstudianteService],
})
export class UsuarioModule {}