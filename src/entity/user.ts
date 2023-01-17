import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    openid: string

    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    avatarUrl: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
}
