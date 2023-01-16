import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    appid: string

    @Column()
    secret: string
}
