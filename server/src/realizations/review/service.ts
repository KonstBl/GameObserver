import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "../blog/entity";
import {Repository} from "typeorm";
import {IBlogCreateInput, IBlogUpdateInput} from "../../abstractions/blog";
import {Review} from "./entity";
import {IReviewCreateInput, IReviewUpdateInput} from "../../abstractions/review";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    findAll(): Promise<Review[]> {
        return this.reviewRepository.find();
    }

    findOne(id: string): Promise<Review> {
        return this.reviewRepository.findOneBy({ id });
    }

    async create(data: IReviewCreateInput): Promise<Review> {
        const review = await this.reviewRepository.save(data)
        return this.reviewRepository.findOne({
            where: {
                id: review.id
            }, 
            relations: ['user']
        })
    }

    update(id: string, data: IReviewUpdateInput): Promise<Review> {
        return this.reviewRepository.save({
            id,
            ...data
        })
    }

    async delete(id: string): Promise<Review> {          
        const review = await this.findOne(id)
        await this.reviewRepository.delete({id: id})
        return review
    }

    async getGameReviews(gameId: string) {
        return this.reviewRepository.find({
            where: { gameId },
            relations: ['user'],
            order: {createdAt: 'desc'},
            select: {
                user: {userName: true, image: true}
            }
        })
    }
}