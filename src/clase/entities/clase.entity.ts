import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../estudiante/entities/usuario.entity';
import { Bono } from '../../bono/entities/bono.entity';

@Entity()
export class Clase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  numeroCreditos: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.clasesImpartidas, { nullable: false })
  @JoinColumn({ name: 'profesorId' })
  profesor: Usuario;

  @Column({ name: 'profesorId' })
  profesorId: number;

  @OneToMany(() => Bono, (bono) => bono.clase)
  bonos: Bono[];
}
