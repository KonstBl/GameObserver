import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { IGameCreateInput, IGameUpdateInput } from "src/abstractions/game";
import {DeleteResult, ILike, Repository} from 'typeorm';
import { Game } from "./entity";
import { log } from "console";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
    ) {}

    findAll(): Promise<Game[]> {
        return this.gamesRepository.find();
    }

    findOne(id: string): Promise<Game> {
        return this.gamesRepository.findOne({
            where: { id }
        });
    }

    create(data: IGameCreateInput): Promise<Game> {
        return this.gamesRepository.save(data)
    }

    update(id: string, data: IGameUpdateInput): Promise<Game> {
        return this.gamesRepository.save({
            id,
            ...data
        })
    }

    async delete(id: string): Promise<Game> {
        const game = await this.findOne(id)
        await this.gamesRepository.delete(id)
        return game
    }

    async search(title: string): Promise<Game[]> {
        return this.gamesRepository.find({
            where: {
                name: ILike(`%${title}%`)
            }
        })
    }

    async sortByGenre(genre: string): Promise<Game[]> {
        return this.gamesRepository.find({
            where: {
                genre: ILike(`%${genre}%`)
            }
        })
    }

    async sortByRatingUp(): Promise<Game[]> {
        return await this.gamesRepository.createQueryBuilder("games").orderBy("games.rating", "ASC").getMany();   
    }

    async sortByRatingDown(): Promise<Game[]> {
        return await this.gamesRepository.createQueryBuilder("games").orderBy("games.rating", "DESC").getMany();   
    }
}