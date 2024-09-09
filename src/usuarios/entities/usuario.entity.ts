/* import { Role } from "src/common/roles.enum"; */
import { Role } from "../../common/roles.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    //@Column({primary: true, generated: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({unique: true, nullable: false })
    email: string;

    /* @Column({ nullable: false }) */
    @Column({ nullable: false, select: false })
    contraseña: string;

    /* @Column({ default: 'usuario'}) */
    @Column({ type: 'enum', default: Role.USUARIO, enum: Role})
    /* rol: string; */
    rol: Role;

    @DeleteDateColumn()
    deletedAT: Date;

}
