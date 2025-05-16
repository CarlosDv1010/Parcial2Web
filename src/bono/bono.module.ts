import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';
import { UsuarioModule } from '../estudiante/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bono]), UsuarioModule],
  controllers: [BonoController],
  providers: [BonoService],
})
export class BonoModule {}