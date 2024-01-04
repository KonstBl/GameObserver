import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IImage} from "../../abstractions/image";

export const IMAGE_TABLE_NAME = "images"

@Entity(IMAGE_TABLE_NAME)
export class Image implements IImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "text", nullable: true })
  fileName: string

  @Column({ type: "text", nullable: true })
  src: string

  @CreateDateColumn()
  createdAt!: Date
}