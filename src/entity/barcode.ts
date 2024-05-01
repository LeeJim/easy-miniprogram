import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Barcode {
    @PrimaryGeneratedColumn()
    no: number

    @PrimaryColumn()
    barcode: string

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    name: string

    @Column({ default: 'unknown' })
    unspsc?: string // 分类

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    brand: string

    @Column({ default: 'unknown' })
    type?: string // 规格型号

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    width: string

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    height: string

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    depth: string

    @Column({ default: 'unknown' })
    origincountry?: string

    @Column({ default: 'unknown' })
    originplace?: string

    @Column({ default: 'unknown' })
    assemblycountry?: string

    @Column({ default: 'unknown' })
    barcodetype?: string // 条码类型

    @Column({ default: 'unknown' })
    catena?: string // 产品系列

    @Column({ default: 0 })
    isbasicunit?: number // 是否是基础单元

    @Column({ default: 'unknown' })
    packagetype?: string // 包装类型

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    grossweight: string // 毛重

    @Column({ default: 'unknown' })
    netweight?: string // 净重

    @Column({ default: 'unknown' })
    description?: string // 描述

    @Column({ default: 'unknown' })
    keyword?: string // 关键字

    @Column()
    pic: string

    @Column({ default: 'unknown' })
    price?: string

    @Column({ default: 'unknown' })
    licensenum?: string // 生产许可证

    @Column({ default: 'unknown' })
    healthpermitnum?: string // 卫生许可证

    @Column({ default: 'unknown' })
    netcontent?: string // 净含量

    @Column({charset: 'utf8mb4',collation: 'utf8mb4_unicode_ci'})
    company: string
}
