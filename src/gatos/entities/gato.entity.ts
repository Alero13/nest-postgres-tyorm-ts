import { Raza } from "../../razas/entities/raza.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, } from "typeorm";

@Entity()
export class Gato {
    //@PrimaryGeneratedColumn
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    edad: number;

   /*  @Column() */
   /*  raza: string */

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne( () => Raza, (raza) => raza.id, {
        
        eager: true //Para traer las razas al hacer un findOne
    }) 
    
    /* raza_id: number */

    raza: Raza

    @ManyToOne( () => Usuario )

    @JoinColumn({ name: 'usuarioEmail', referencedColumnName: 'email'})
    usuario: Usuario

    @Column()
    usuarioEmail: string

}
