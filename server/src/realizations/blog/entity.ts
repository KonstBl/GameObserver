import { IBlog } from "src/abstractions/blog";
import { Column, CreateDateColumn, ManyToOne, Entity, Generated, PrimaryColumn } from "typeorm";
import {JoinColumn} from "typeorm";
import {User} from "../user/entity";

export const BLOG_TABLE_NAME = "blogs"

@Entity(BLOG_TABLE_NAME)
export class Blog implements IBlog {
    @PrimaryColumn("varchar", {
        unique: true,
    })
    @Generated("uuid")
    id!: string

    @Column("text")
    name!: string

    @Column("text")
    text!: string

    @Column("text")
    image!: string

    @Column("text")
    userId!: string

    @ManyToOne(() => User, (user) => user.blogs)
    @JoinColumn({ name: 'userId' })
    user: User
    
    @CreateDateColumn()
    createdAt!: Date
}