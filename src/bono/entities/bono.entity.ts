import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../estudiante/entities/usuario.entity';
import { Clase } from '../../clase/entities/clase.entity';

@Entity()
export class Bono {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  monto: number;

  @Column('double precision')
  calificacion: number;

  @Column()
  palabraClave: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.bonos, { nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Clase, (clase) => clase.bonos, { nullable: false })
  @JoinColumn({ name: 'claseId' })
  clase: Clase;

  @Column()
  claseId: number;
}
