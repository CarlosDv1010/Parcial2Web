import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RolUsuario } from '../../common/role.enum';
import { Clase } from '../../clase/entities/clase.entity';
import { Bono } from '../../bono/entities/bono.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', unique: true })
  cedula: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  grupoInvestigacion: string;

  @Column({ type: 'integer', nullable: true })
  numeroExtension: number;

  @Column({
    type: 'simple-enum',
    enum: RolUsuario,
  })
  rol: RolUsuario;

  @ManyToOne(() => Usuario, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'jefe_id' })
  jefe?: Usuario;

  @OneToMany(() => Clase, (clase) => clase.profesor)
  clasesImpartidas: Clase[];

  @OneToMany(() => Bono, (bono) => bono.usuario)
  bonos: Bono[];
}
