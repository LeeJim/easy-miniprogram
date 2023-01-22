import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm"

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    @Generated("uuid")
    id: string

    @Column()
    type: string

    @Column()
    openid: string

    @Column()
    unionid: string

    @Column()
    appid: string

    @Column({ default: false })
    isDelete: boolean

    @UpdateDateColumn()
    updateDate: Date

    @CreateDateColumn()
    createdDate: Date
}
