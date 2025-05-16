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
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('double precision')
  calificacion: number;

  @Column()
  comentario: string;

  @Column()
  fecha: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.resenas)
  @JoinColumn({ name: 'usuarioId' })
  estudiante: Estudiante;


  @ManyToOne(() => Actividad, (actividad) => actividad.resenas, { nullable: false })
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;

  

}
