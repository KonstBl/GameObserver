import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "./entity";
import { Repository } from "typeorm";
import { IPutRating } from "src/abstractions/rating";
import Decimal from "decimal.js";
import { GameService } from "../game/service";

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>,
        private gameService: GameService
    ) {}
    
    async rate(data: IPutRating): Promise<Rating> {
        const rating = await this.ratingRepository.findOne({
            where:{
                userId: data.userId,
                gameId: data.gameId
            }
        })
        // if(!rating)
        //     return this.ratingRepository.save(data)
        const ratingData = await this.ratingRepository.save({
            ...(rating ? { id: rating.id } : null),
            userId: data.userId,
            gameId: data.gameId,
            rating: data.rating
        })
        const avgRating = await this.calculateRating(data.gameId)
        await this.gameService.update(data.gameId, {
            rating: avgRating.toString()
        })
        return ratingData
    }

    async calculateRating(gameId: string): Promise<number> {
        const ratings = await this.ratingRepository.find({ where:{
             gameId
            }
        })
        let ratingSum = new Decimal(0)
        for (let rating of ratings) {
            ratingSum = ratingSum.add(new Decimal(rating.rating))
        }
        const ratingNum = parseFloat(ratingSum.div(ratings.length).toString())
        return !!ratingNum ? ratingNum : 0
    }

    async isUserRatedAGame(userId: string, gameId: string): Promise<Boolean> {
        const userRating = await this.ratingRepository.find({ where: {
             gameId, userId
            }
        })
        
        return !!userRating.length
    }
}
