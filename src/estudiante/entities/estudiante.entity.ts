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
import { Actividad } from '../../actividad/entities/actividad.entity';
import { Resena } from '../../resena/entities/resena.entity';

@Entity('usuarios')
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', unique: true })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  programa: string;

  @Column({ type: 'integer'})
  semestre: number;

  @Column()
  correo: string;

  @OneToMany(() => Resena, (resena) => resena.estudiante)
  resenas: Actividad[];

  @ManyToMany(() => Actividad, (actividad) => actividad.inscritos)
  @JoinTable()
  actividades: Actividad[];
}
