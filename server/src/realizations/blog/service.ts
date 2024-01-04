import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { IBlogCreateInput, IBlogUpdateInput } from "src/abstractions/Blog";
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Blog } from "./entity";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private BlogsRepository: Repository<Blog>,
    ) {}

    findAll(): Promise<Blog[]> {
        return this.BlogsRepository.find({            
            relations: ['user'],
            order: {createdAt: 'desc'},
            select: {
                user: {userName: true, image: true}
            }
        });
    }

    findOne(id: string): Promise<Blog> {
        return this.BlogsRepository.findOneBy({ id });
    }

    create(data: IBlogCreateInput): Promise<Blog> {
        return this.BlogsRepository.save(data)
    }

    update(id: string, data: IBlogUpdateInput): Promise<Blog> {
        return this.BlogsRepository.save({
            id,
            ...data
        })
    }

    async getUserBlogs(userId: string) {
        return this.BlogsRepository.find({
            where: {
                userId
            }
        })
    }

    async delete(id: string): Promise<Blog> {
        const Blog = await this.findOne(id)
        await this.BlogsRepository.delete(id)
        return Blog
    }

    async search(title: string): Promise<Blog[]> {
        return this.BlogsRepository.find({
            where: {
                name: ILike(`%${title}%`)
            }
        })
    }
}