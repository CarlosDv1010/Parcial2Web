import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Actividad } from '../../actividad/entities/actividad.entity';
import { Resena } from '../../resena/entities/resena.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @ManyToMany(() => Actividad, (actividad) => actividad.inscritos)
  actividades: Actividad[];

  @OneToMany(() => Resena, (resena) => resena.estudiante)
  resenas: Resena[];
}
