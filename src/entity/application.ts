import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    appid: string

    @Column()
    secret: string
}
