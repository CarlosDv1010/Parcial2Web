import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { Actividad } from '../actividad/entities/actividad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resena, Actividad]), 
    EstudianteModule
  ],
  controllers: [ResenaController],
  providers: [ResenaService],
  exports: [ResenaService]
})
export class ResenaModule {}