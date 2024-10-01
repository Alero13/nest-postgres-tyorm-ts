import { Gato } from "src/gatos/entities/gato.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Raza {

    @Column({ primary: true, generated: true })
    id: number

    @Column({ length: 500 })
    name: string

    /* @OneToMany( () => Gato, (gato) => gato.id) */
    @OneToMany( () => Gato, (gato) => gato.raza)
    gatos: Gato[];

    @DeleteDateColumn()
    deletedAt: Date
}
