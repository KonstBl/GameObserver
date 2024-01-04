import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {IReview} from "../../abstractions/review";
import {User} from "../user/entity";
import {JoinColumn} from "typeorm";
import {Game} from "../game/entity";

export const REVIEW_TABLE_NAME = "reviews"

@Entity(REVIEW_TABLE_NAME)
export class Review implements IReview {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @PrimaryColumn('uuid')
    userId: string

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column("text")
    content!: string

    @PrimaryColumn('uuid')
    gameId: string

    @ManyToOne(() => Game, (game) => game.reviews)
    @JoinColumn({ name: 'gameId' })
    game: Game

    @CreateDateColumn()
    createdAt!: Date
}