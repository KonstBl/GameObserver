import Decimal from "decimal.js"
import { IRating } from "src/abstractions/rating/index"
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

export const RATING_TABLE_NAME = "rating"

@Entity(RATING_TABLE_NAME)
@Index(['userId', 'gameId'], { unique: true })
export class Rating implements IRating {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    
    @Column("uuid")
    userId!: string

    @Column("uuid")
    gameId!: string

    @Column({type: 'decimal'})
    rating!: Decimal

    @CreateDateColumn()
    createdAt!: Date
}