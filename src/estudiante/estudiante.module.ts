import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Actividad } from '../actividad/entities/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Actividad])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService]
})
export class EstudianteModule {}