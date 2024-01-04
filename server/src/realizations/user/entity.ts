import { IUser } from "src/abstractions/user";
import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "../review/entity";
import { Blog } from "../blog/entity";

export const USER_TABLE_NAME = "users"

@Entity(USER_TABLE_NAME)
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text", nullable: true})
    userName: string

    @Column("text")
    email!: string

    @Column({type: "text", nullable: true})
    image: string

    @Column("text")
    password!: string
    
    @CreateDateColumn()
    createdAt!: Date

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}