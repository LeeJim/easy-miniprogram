import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    templateid: string

    @Column()
    openid: string

    @Column({ default: true })
    active: boolean

    @Column({ default: null })
    usedDate: Date

    @CreateDateColumn()
    createdDate: Date
}
