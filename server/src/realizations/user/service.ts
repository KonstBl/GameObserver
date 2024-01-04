import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { IUserCreateInput, IUserUpdateInput } from "src/abstractions/user";
import { ILike, Repository } from 'typeorm';
import { User } from "./entity";
import { Blog } from "../blog/entity";
import multer from "multer";
import * as fs from 'fs';
import {v4} from "uuid";
import {ImageService} from "../image/service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Blog)
        private blogsRepository: Repository<Blog>,
        private imageService: ImageService
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getById(id: string): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    create(data: IUserCreateInput): Promise<User> {
        return this.usersRepository.save(data)
    }

    update(id: string, data: IUserUpdateInput): Promise<User> {
        return this.usersRepository.save({
            id,
            ...data
        })
    }

    async search(userName: string): Promise<User[]> {
        return this.usersRepository.find({
            where: {
                userName: ILike(`%${userName}%`)
            }
        })
    }

    findByEmail(email:string){
        return this.usersRepository.findOneBy({email})
    }

    async delete(id: string): Promise<User> {
        const user = await this.getById(id)
        await this.blogsRepository.delete({userId:user.id})
        await this.usersRepository.delete(id)
        return user
    }

    async getByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } })
    }

    async checkUserExist(data: Partial<IUserCreateInput>): Promise<void> {
        if (await this.getByEmail(data.email) || await this.getByUsername(data.userName))
            throw new Error('User already exist')
    }

    async getByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { userName: username } })
    }

    async uploadAvatar(id: string, file: Express.Multer.File): Promise<User> {
        const uploadedImage = await this.imageService.uploadImage(file)
        return this.usersRepository.save({ id, image: uploadedImage.id })
    }
}