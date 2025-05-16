import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Resena } from '../../resena/entities/resena.entity';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  calificacion: number;

  @Column()
  cupoMaximo: number;

  @Column()
  estado: number;

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
  @JoinTable()
  inscritos: Estudiante[];


  @OneToMany(() => Resena, (resena) => resena.actividad)
  resenas: Resena[];
}
