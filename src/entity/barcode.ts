import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Barcode {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    barcode: string

    @Column()
    name: string

    @Column()
    ename: string

    @Column()
    unspsc: string

    @Column()
    brand: string

    @Column()
    type: string

    @Column()
    width: string

    @Column()
    height: string

    @Column()
    depth: string

    @Column()
    origincountry: string

    @Column()
    originplace: string

    @Column()
    assemblycountry: string

    @Column()
    barcodetype: string

    @Column()
    catena: string

    @Column()
    isbasicunit: number

    @Column()
    packagetype: string

    @Column()
    grossweight: string

    @Column()
    netweight: string

    @Column()
    description: string

    @Column()
    keyword: string

    @Column()
    pic: string

    @Column()
    price: string

    @Column()
    licensenum: string

    @Column()
    healthpermitnum: string

    @Column()
    netcontent: string

    @Column()
    company: string

    @Column()
    expirationdate: string
}
