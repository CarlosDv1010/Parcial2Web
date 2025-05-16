import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './estudiante/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';
import { Usuario } from './estudiante/entities/usuario.entity';
import { Bono } from './bono/entities/bono.entity';
import { Clase } from './clase/entities/clase.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Usuario, Bono, Clase],
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