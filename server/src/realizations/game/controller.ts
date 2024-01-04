import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common"
import { GameService } from "./service"
import { GameCreateBodyRequest } from "./dto/game-create.request"
import { IGameUpdateInput } from "src/abstractions/game"
import { GameUpdateBodyRequest } from "./dto/game-update.request"
import { title } from "process"

@ApiTags("Game")
@Controller("game")
export class GameController {
    constructor(
        private gameService: GameService,
    ){}

    @ApiOperation({ summary:"Create game"})
    @Post()
    async create(@Body() data: GameCreateBodyRequest) {
        return this.gameService.create(data)
    }

    @ApiOperation({ summary:"Find all games"})
    @Get()
    async findAll() {
        return this.gameService.findAll()
    }

    @ApiOperation({ summary:"Search games"})
    @Get("search/:title")
    async search(@Param("title") title: string) {
        return this.gameService.search(title)
    }

    @ApiOperation({ summary:"Sort by genre"})
    @Get("sort/:genre")
    async sortByGenre(@Param("genre") genre: string) {
        return this.gameService.sortByGenre(genre)
    }

    @ApiOperation({ summary:"Sort by rating Down"})
    @Get("ratingDown")
    async sortByRatingDown() {
        return this.gameService.sortByRatingDown()
    }

    @ApiOperation({ summary:"Sort by rating Up"})
    @Get("ratingUp")
    async sortByRatingUp() {
        return this.gameService.sortByRatingUp()
    }

    @ApiOperation({ summary:"Find one game"})
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.gameService.findOne(id)
    }

    @ApiOperation({ summary:"Update game"})
    @Put(":id")
    async update(
        @Param("id") id: string, 
        @Body() data: GameUpdateBodyRequest
    ) {
        return this.gameService.update(id, data)
    }

    @ApiOperation({ summary:"Delete game"})
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.gameService.delete(id)
    }    
}