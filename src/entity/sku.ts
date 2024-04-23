import { Entity, PrimaryColumn, Generated, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Sku {
    @PrimaryGeneratedColumn()
    no: number

    @Column()
    @PrimaryColumn()
    @Generated("uuid")
    id: string

    @Column()
    name: string

    @Column()
    barcode: string

    @Column()
    produced_date: Date

    @Column()
    expiration_date: Date

    @Column()
    quality_guarantee_date: number

    @Column()
    quality_gurantee_date_unit: number

    @Column()
    pic: string

    @Column()
    creator_id: string

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date
}
