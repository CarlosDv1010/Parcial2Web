import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './estudiante/usuario.module';
import { BonoModule } from './resena/bono.module';
import { ClaseModule } from './actividad/actividad.module';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Resena } from './resena/entities/resena.entity';
import { Actividad } from './actividad/entities/actividad.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Estudiante, Resena, Actividad],
      synchronize: true,
    }),
    UsuarioModule,
    BonoModule,
    ClaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}