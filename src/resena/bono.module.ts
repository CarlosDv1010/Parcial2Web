import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { UsuarioModule } from '../estudiante/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resena]), UsuarioModule],
  controllers: [BonoController],
  providers: [BonoService],
})
export class BonoModule {}