import { IGame } from "src/abstractions/game";
import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "../review/entity";
import Decimal from "decimal.js";

export const GAME_TABLE_NAME = "games"

@Entity(GAME_TABLE_NAME)
export class Game implements IGame {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("text")
    name: string

    @Column({type: 'text', nullable: true})
    description?: string

    @Column({type: 'decimal', default: 0})
    rating!: Decimal

    @Column({type: 'text', nullable: true})
    image?: string

    @Column("text")
    genre?: string

    @Column({type: 'text', nullable: true})
    age?: string

    @Column({type: 'text', nullable: true})
    country?: string

    @Column({type: 'text', nullable: true})
    developer?: string

    @Column({ type: 'timestamp', nullable: true })
    realizeDate?: Date
    
    @CreateDateColumn()
    createdAt!: Date

    @OneToMany(() => Review, (review) => review.game)
    reviews: Review[]
}