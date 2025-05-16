import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Actividad } from '../../actividad/entities/actividad.entity';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  comentario: string;

  @Column()
  calificacion: number;

  @Column()
  fecha: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.resenas, { nullable: false })
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => Actividad, (actividad) => actividad.resenas, { nullable: false })
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;
}
