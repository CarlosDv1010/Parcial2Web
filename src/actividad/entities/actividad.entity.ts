import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Resena } from '../../resena/entities/resena.entity';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  fecha: string;


  @Column()
  calificacion: number;

  @Column()
  cupos: number;

  @Column()
  estado: number;

  @ManyToOne(() => Estudiante, (usuario) => usuario.actividades, { nullable: false })
  @JoinColumn({ name: 'inscritosIds' })
  inscritos: Estudiante[];

  @Column({ name: 'profesorId' })
  profesorId: number;

  @OneToMany(() => Resena, (bono) => bono.actividad)
  resenas: Resena[];
}
